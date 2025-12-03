const express = require('express');
const router = express.Router();
const { addWorkStation, getWorkStation, updateWorkStation, deleteWorkStation } = require('../controllers/workStationController');

router.post('/work-station', addWorkStation);
router.get('/work-station', getWorkStation);
router.put('/work-station/:id', updateWorkStation);
router.delete('/work-station/:id', deleteWorkStation);

module.exports = router;