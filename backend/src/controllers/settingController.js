const { Setting } = require('../models');

exports.getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    const settingsObj = {};
    settings.forEach(s => {
      if (s.value === 'true') settingsObj[s.key] = true;
      else if (s.value === 'false') settingsObj[s.key] = false;
      else settingsObj[s.key] = s.value;
    });
    
    // Default values if empty
    const defaults = {
      storeName: 'BrewPOS Downtown',
      taxRate: '10.0',
      currency: 'USD ($)',
      darkMode: true,
      autoPrint: false,
      customerDisplay: true
    };
    
    res.json({ ...defaults, ...settingsObj });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await Setting.upsert({ key, value: String(value) });
    }
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings' });
  }
};
