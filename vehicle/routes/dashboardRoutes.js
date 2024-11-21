const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardControl');
router.get('/dashboard', dashboardController.getDashboard);
module.exports = router;
