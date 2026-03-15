const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Login Admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check credentials against .env
    if (username !== process.env.ADMIN_USER) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASS);

    if (isMatch) {
      // Sign JWT
      const payload = { user: { username } };
      
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } else {
      res.status(400).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
