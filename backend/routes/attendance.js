const express = require('express');
const router = express.Router();
const { addAttendance, getAttendance, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');
const Attendance = require('../models/Attendance');

router.post('/attendance', addAttendance);
router.get('/attendance', getAttendance);
router.put('/attendance/:id', updateAttendance);
router.delete('/attendance/:id', deleteAttendance);

// Test route to see all attendance data
router.get('/attendance/all', async (req, res) => {
  try {
    const allAttendance = await Attendance.findAll();
    res.json({ count: allAttendance.length, data: allAttendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;