const PORT = 3000;
// Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// Routes
const clientRoutes = require('./routes/clientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes');
// Other
const { badRequestMiddleware } = require('./middleware/badRequest');
const { dbConnect } = require('./config/database');
const setupSwagger = require('./config/swagger');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get('/', (req, res) => {
  // res.redirect('https://www.youtube.com/watch?v=Q7PXc5jJj08');
  res.send("opa")
});

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

setupSwagger(app);

// app.all('*', (req, res) => {
//     throw new Error("Bad request");
// });

// app.use(badRequestMiddleware);

async function initializeDatabase() {
  try {
    const connection = await dbConnect();
    // TODO: check if tables are found else create them
  } catch(err) {
    console.log('Error during database initialization', err)
  }
}

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
    console.log('Available routes: \n /api/auth \n /api/client \n /api/doctors \n /api/appointments \n /api/docs')
  });
})