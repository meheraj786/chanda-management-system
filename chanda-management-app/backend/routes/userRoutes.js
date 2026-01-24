const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  getUserDonations,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getCurrentUser);
router.get('/donations', authMiddleware, getUserDonations);

module.exports = router;
