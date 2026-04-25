const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, hasPermission } = require('../middleware/auth');

// Public routes
router.post('/login', authController.login);

// Protected routes
// Only Admins can register new users (manage_users)
router.post('/register', verifyToken, hasPermission(['manage_users']), authController.register);

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

router.head('/users', verifyToken, hasPermission(['manage_users']), authController.getUsers); // Preflight/mock
router.get('/users', verifyToken, hasPermission(['manage_users']), authController.getUsers);
router.put('/users/:id', verifyToken, hasPermission(['manage_users']), authController.updateUser);
router.delete('/users/:id', verifyToken, hasPermission(['manage_users']), authController.deleteUser);

module.exports = router;
