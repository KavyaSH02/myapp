const WorkStation = require('../models/WorkStation');

exports.addWorkStation = async (req, res) => {
  try {
    const { date, details, unit, received, issued, balance, sign } = req.body;
    const userId = req.user?.id || 1;
    
    console.log('Saving work station:', { date, details, unit, received, issued, balance, sign, userId });
    const workStation = await WorkStation.create({ date, details, unit, received, issued, balance, sign, userId });
    console.log('Work station saved successfully:', workStation.id);
    res.status(201).json({ message: 'Work station added successfully', workStation });
  } catch (error) {
    console.error('Error saving work station:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getWorkStation = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const workStation = await WorkStation.findAll({ where: { userId } });
    console.log(`Found ${workStation.length} work station records for user ${userId}`);
    res.status(200).json(workStation);
  } catch (error) {
    console.error('Error fetching work station:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateWorkStation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, details, unit, received, issued, balance, sign } = req.body;
    
    await WorkStation.update(
      { date, details, unit, received, issued, balance, sign },
      { where: { id } }
    );
    
    res.status(200).json({ message: 'Work station updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteWorkStation = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkStation.destroy({ where: { id } });
    res.status(200).json({ message: 'Work station deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};