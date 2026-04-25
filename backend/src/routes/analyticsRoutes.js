const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { verifyToken, hasPermission } = require('../middleware/auth');

// Note: Ensure users requesting analytics have appropriate permissions, e.g., 'view_reports' or 'Admin' role.
router.get('/', verifyToken, hasPermission(['view_reports']), analyticsController.getAnalyticsSummary);

module.exports = router;
