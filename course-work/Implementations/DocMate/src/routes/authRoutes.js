const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = 'tova_trqa_da_e_v_env'; //ako ostane vreme

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login to obtain a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       description: Login credentials.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login.
 *       401:
 *         description: Invalid credentials.
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Hardcoded for presentations sake
  if (username === 'marto' && password === 'e qk') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;