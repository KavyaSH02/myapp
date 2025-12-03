const SwitchRack = require('../models/SwitchRack');

exports.addSwitchRack = async (req, res) => {
  try {
    const { date, details, unit, received, issued, balance, sign } = req.body;
    const userId = req.user?.id || 1;
    
    console.log('Saving switch rack:', { date, details, unit, received, issued, balance, sign, userId });
    const switchRack = await SwitchRack.create({ date, details, unit, received, issued, balance, sign, userId });
    console.log('Switch rack saved successfully:', switchRack.id);
    res.status(201).json({ message: 'Switch rack added successfully', switchRack });
  } catch (error) {
    console.error('Error saving switch rack:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getSwitchRack = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    const switchRack = await SwitchRack.findAll({ where: { userId } });
    console.log(`Found ${switchRack.length} switch rack records for user ${userId}`);
    res.status(200).json(switchRack);
  } catch (error) {
    console.error('Error fetching switch rack:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateSwitchRack = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, details, unit, received, issued, balance, sign } = req.body;
    
    await SwitchRack.update(
      { date, details, unit, received, issued, balance, sign },
      { where: { id } }
    );
    
    res.status(200).json({ message: 'Switch rack updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSwitchRack = async (req, res) => {
  try {
    const { id } = req.params;
    await SwitchRack.destroy({ where: { id } });
    res.status(200).json({ message: 'Switch rack deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};