const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
// When deployed behind nginx on a VPS, trust proxy so express can
// correctly detect client IP / protocol when behind a reverse proxy.
app.set('trust proxy', 1);

// Configure CORS. In production set FRONTEND_URL in backend .env
// to your frontend origin (e.g. https://relearn.org.in). When
// FRONTEND_URL is not set we allow common localhost dev origins.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5000'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    // In production you can optionally allow all origins by setting ALLOW_ALL_ORIGINS=true
    if (process.env.ALLOW_ALL_ORIGINS === 'true') return callback(null, true);
    return callback(new Error('CORS policy: origin not allowed'), false);
  },
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