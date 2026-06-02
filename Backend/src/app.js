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
const corsOptions = {
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
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes (Express 5 compatible)
app.options('/{*any}', cors(corsOptions));

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

const Post = require('./models/Post');

app.get('/sitemap.xml', async (req, res) => {
  try {
    const posts = await Post.find({}, 'slug updatedAt');
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    xml += '  <url>\n';
    xml += '    <loc>https://hexnotes.vercel.app/</loc>\n';
    xml += '  </url>\n';
    xml += '  <url>\n';
    xml += '    <loc>https://hexnotes.vercel.app/about</loc>\n';
    xml += '  </url>\n';
    
    posts.forEach(post => {
      if (post.slug) {
        xml += '  <url>\n';
        xml += `    <loc>https://hexnotes.vercel.app/blog/${post.slug}</loc>\n`;
        if (post.updatedAt) {
          xml += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
        }
        xml += '  </url>\n';
      }
    });
    
    xml += '</urlset>';
    
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
});


module.exports = app;
