const { dbConnect, sql } = require('../config/database');

exports.createAppointment = async (req, res) => {
  try {
    const { client_id, doctor_id, date, reason, fee } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('client_id', sql.Int, client_id)
      .input('doctor_id', sql.Int, doctor_id)
      .input('date', sql.DateTime, date)
      .input('reason', sql.VarChar(255), reason)
      .input('fee', sql.Float, fee)
      .query(`INSERT INTO Appointments (client_id, doctor_id, date, reason, fee)
              OUTPUT INSERTED.*
              VALUES (@client_id, @doctor_id, @date, @reason, @fee)`);
              
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit;
    const pool = await dbConnect();
    const result = await pool.request()
      .query(`SELECT * FROM Appointments ORDER BY appointment_id 
              OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
              SELECT COUNT(*) as total FROM Appointments;`);
    const appointments = result.recordsets[0];
    const total = result.recordsets[1][0].total;

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      data: appointments
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM Appointments WHERE appointment_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, doctor_id, date, reason, fee, status } = req.body;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('client_id', sql.Int, client_id)
      .input('doctor_id', sql.Int, doctor_id)
      .input('date', sql.DateTime, date)
      .input('reason', sql.VarChar(255), reason)
      .input('fee', sql.Float, fee)
      .input('status', sql.VarChar(50), status)
      .query(`UPDATE Appointments SET client_id = @client_id, doctor_id = @doctor_id, date = @date, reason = @reason, fee = @fee, status = @status
              OUTPUT INSERTED.*
              WHERE appointment_id = @id`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await dbConnect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM Appointments WHERE appointment_id = @id`);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// query in YYYY-MM-DD format TODO: fix the format later
exports.searchAppointments = async (req, res) => {
  console.log("date:",req.query.date)
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: 'date query parameter is required.' });
    }

    const pool = await dbConnect();
    const result = await pool.request()
      .input('date', sql.DateTime, date)
      .query(`SELECT * FROM Appointments WHERE CONVERT(VARCHAR(10), date, 120) = @date`);
    res.json(result.recordset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
