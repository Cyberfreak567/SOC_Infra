const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

/**
 * Trust proxy (required for Cloudflare / reverse proxy)
 */
app.set('trust proxy', 1);

/**
 * CORS configuration
 * Since frontend and backend are served from the same domain
 * (via Nginx/Docker reverse proxy), this is safe and stable.
 */
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

/**
 * MongoDB connection
 */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected');

  // Insert sample data once
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
.catch(err => {
  console.error('MongoDB error:', err);
});

/**
 * Routes
 */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Server error' });
});

/**
 * IMPORTANT: listen on 0.0.0.0 for Docker
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
