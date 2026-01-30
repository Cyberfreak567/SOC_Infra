const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { username, name, email, password } = req.body;
  const finalUsername = username || name;

  try {
    // Basic validation
    if (!finalUsername || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Signup attempt:', { finalUsername, email });

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username: finalUsername,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('User created:', user.id);

    const payload = { user: { id: user.id } };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No record found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
