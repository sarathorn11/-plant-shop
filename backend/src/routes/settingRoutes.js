const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { verifyToken, hasPermission } = require('../middleware/auth');

router.get('/', verifyToken, settingController.getSettings);
router.put('/', verifyToken, hasPermission('manage_users'), settingController.updateSettings);

module.exports = router;
