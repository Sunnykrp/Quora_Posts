const express = require('express');

const {signup,login,logout,getCurrentUser} = require('../controllers/authController.js');

const router = express.Router();
router.post('/signup',signup);
router.post('/login',login);
router.get('/me', getCurrentUser);
router.post('/logout',logout);

module.exports = router;