const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', message: 'Validation failed', data: errors.array() });
    }
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ status: 'error', message: 'Email already in use' });

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, password: hashed, role: role || 'user' });

    res.status(201).json({ status: 'success', message: 'User created', data: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ status: 'error', message: 'Invalid credentials' });

    const payload = { sub: user._id, role: user.role, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

    res.json({ status: 'success', message: 'Logged in', data: { token } });
  } catch (err) { next(err); }
};

module.exports = { signup, login };
