const sql = require('mssql');

const sqlConfig = {
  user: 'DocMate',
  password: 'docmate123',
  database: 'DocMate',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true // needed for local
  }
}

// TODO: make some sort of static variable to hold the connection 
async function dbConnect() {
    try {
        const pool = await sql.connect(sqlConfig);
        console.log("Database connection successful.");
        return pool;
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}

module.exports = {dbConnect, sql};