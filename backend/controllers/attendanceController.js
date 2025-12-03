const Attendance = require('../models/Attendance');

exports.addAttendance = async (req, res) => {
  try {
    const { date, inTime, outTime, leaveType, signature } = req.body;
    const userId = req.user?.id || 1; // Use logged-in user ID or default to 1
    
    console.log('Saving attendance:', { date, inTime, outTime, leaveType, signature, userId });
    const attendance = await Attendance.create({ date, inTime, outTime, leaveType, signature, userId });
    console.log('Attendance saved successfully:', attendance.id);
    res.status(201).json({ message: 'Attendance added successfully', attendance });
  } catch (error) {
    console.error('Error saving attendance:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const attendance = await Attendance.findAll({ where: { userId } });
    console.log(`Found ${attendance.length} attendance records for user ${userId}`);
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, inTime, outTime, leaveType, signature } = req.body;
    
    await Attendance.update(
      { date, inTime, outTime, leaveType, signature },
      { where: { id } }
    );
    
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await Attendance.destroy({ where: { id } });
    res.status(200).json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting attendance record with ID:', id);
    
    // First check if record exists
    const record = await Attendance.findByPk(id);
    console.log('Record found:', record);
    
    if (!record) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    const deleted = await Attendance.destroy({ where: { id: parseInt(id) } });
    console.log('Delete result:', deleted);
    
    if (deleted) {
      res.status(200).json({ message: 'Attendance record deleted successfully' });
    } else {
      res.status(404).json({ error: 'Failed to delete record' });
    }
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ error: error.message });
  }
};