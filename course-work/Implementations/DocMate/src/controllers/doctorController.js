const { dbConnect, sql } = require('../config/database');

exports.createDoctor = async (req, res) => {
  try {
    const { first_name, last_name, specialization, email, phone, years_of_exp } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('first_name', sql.VarChar(50), first_name)
      .input('last_name', sql.VarChar(50), last_name)
      .input('specialization', sql.VarChar(100), specialization)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(15), phone)
      .input('years_of_exp', sql.Int, years_of_exp)
      .query(`INSERT INTO Doctors (first_name, last_name, specialization, email, phone, years_of_exp) 
              OUTPUT INSERTED.* 
              VALUES (@first_name, @last_name, @specialization, @email, @phone, @years_of_exp)`);

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const pool = await dbConnect();
    const result = await pool.request()
      .query(`SELECT * FROM Doctors ORDER BY doctor_id 
              OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
              SELECT COUNT(*) as total FROM Doctors;`);
    const doctors = result.recordsets[0];
    const total = result.recordsets[1][0].total;

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: doctors
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM Doctors WHERE doctor_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, specialization, email, phone, years_of_exp, rating } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('first_name', sql.VarChar(50), first_name)
      .input('last_name', sql.VarChar(50), last_name)
      .input('specialization', sql.VarChar(100), specialization)
      .input('email', sql.VarChar(100), email)
      .input('phone', sql.VarChar(15), phone)
      .input('years_of_exp', sql.Int, years_of_exp)
      .input('rating', sql.Float, rating)
      .query(`UPDATE Doctors SET first_name = @first_name, last_name = @last_name, specialization = @specialization, email = @email, phone = @phone, years_of_exp = @years_of_exp, rating = @rating
              OUTPUT INSERTED.*
              WHERE doctor_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM Doctors WHERE doctor_id = @id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchDoctors = async (req, res) => {
  try {
    const { last_name } = req.query;
    if (!last_name) {
      return res.status(400).json({ message: 'last_name query parameter is required.' });
    }

    const pool = await dbConnect();
    const result = await pool.request()
      .input('last_name', sql.VarChar(50), last_name)
      .query(`SELECT * FROM Doctors WHERE last_name = @last_name`);
      
    res.json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
