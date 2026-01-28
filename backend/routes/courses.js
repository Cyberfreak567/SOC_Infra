const express = require('express');
const Course = require('../models/Course');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all courses (protected)
router.get('/', auth, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a course (for admin, but simple, just protected)
router.post('/', auth, async (req, res) => {
  const { title, description, instructor } = req.body;
  try {
    const course = new Course({ title, description, instructor });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;