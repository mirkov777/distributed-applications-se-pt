const { dbConnect, sql } = require('../config/database');

exports.createClient = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, age } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('first_name', sql.VarChar(50), first_name)
      .input('last_name', sql.VarChar(50), last_name)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(15), phone)
      .input('age', sql.Int, age)
      .query(`INSERT INTO Clients (first_name, last_name, email, phone, age) 
              OUTPUT INSERTED.* 
              VALUES (@first_name, @last_name, @email, @phone, @age)`);
              
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const pool = await dbConnect();
    const result = await pool.request()
      .query(`SELECT * FROM Clients ORDER BY client_id 
              OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
              SELECT COUNT(*) as total FROM Clients;`);
    const clients = result.recordsets[0];
    const total = result.recordsets[1][0].total;

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: clients
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM Clients WHERE client_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TODO: make fields independent
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, age, is_active } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('first_name', sql.VarChar(50), first_name)
      .input('last_name', sql.VarChar(50), last_name)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(15), phone)
      .input('age', sql.Int, age)
      .input('is_active', sql.Bit, is_active)
      .query(`UPDATE Clients SET first_name = @first_name, last_name = @last_name, email = @email, phone = @phone, age = @age, is_active = @is_active
              OUTPUT INSERTED.*
              WHERE client_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM Clients WHERE client_id = @id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchClients = async (req, res) => {
  try {
    const { first_name } = req.query;

    if (!first_name) {
      return res.status(400).json({ message: 'first_name query parameter is required.' });
    }

    const pool = await dbConnect();
    const result = await pool.request()
      .input('first_name', sql.VarChar(50), fname)
      .query(`SELECT * FROM Clients WHERE first_name = @first_name`);

    res.json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};