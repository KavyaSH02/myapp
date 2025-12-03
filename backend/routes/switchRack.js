const express = require('express');
const router = express.Router();
const { addSwitchRack, getSwitchRack, updateSwitchRack, deleteSwitchRack } = require('../controllers/switchRackController');

router.post('/switch-rack', addSwitchRack);
router.get('/switch-rack', getSwitchRack);
router.put('/switch-rack/:id', updateSwitchRack);
router.delete('/switch-rack/:id', deleteSwitchRack);

module.exports = router;