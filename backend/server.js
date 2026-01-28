const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');
  // Add sample courses if none exist
  const Course = require('./models/Course');
  const count = await Course.countDocuments();
  if (count === 0) {
    await Course.insertMany([
      { title: 'React Basics', description: 'Learn React fundamentals', instructor: 'John Doe' },
      { title: 'Node.js Intro', description: 'Introduction to Node.js', instructor: 'Jane Smith' },
      { title: 'MongoDB Essentials', description: 'Master MongoDB', instructor: 'Bob Johnson' }
    ]);
    console.log('Sample courses added');
  }
})
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));