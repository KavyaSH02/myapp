const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const switchRackRoutes = require('./routes/switchRack');
const workStationRoutes = require('./routes/workStation');

// Import models to ensure they're registered
require('./models/User');
require('./models/Attendance');
require('./models/SwitchRack');
require('./models/WorkStation');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', switchRackRoutes);
app.use('/api', workStationRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on:');
    console.log('- Local: http://localhost:5000');
    console.log('- Network: http://192.168.0.188:5000');
  });
}).catch(err => {
  console.error('Database sync error:', err);
});
