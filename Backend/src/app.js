const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Trust proxy - required for rate limiting to work correctly on Render
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: false }));

// CORS - supports multiple origins via comma-separated FRONTEND_URL env var
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.FRONTEND_URL?.split(',').map(o => o.trim()) || [];

    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use('/api/', limiter);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from MongoDB Backend!' });
});

module.exports = app;