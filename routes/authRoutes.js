const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', [
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], signup);

router.post('/login', login);

module.exports = router;
