const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { User } = require('../models');

// In-memory OTP store
const otpStore = {};

// ========== UTILITY ==========
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// ========== USER ROUTES ==========

// Create new user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Specific routes FIRST

// Get user by email
router.get('/by-email', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ exists: false, message: 'User not found' });

    res.json({ exists: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user by phone
router.get('/by-phone', async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ message: 'Phone is required' });

    const user = await User.findOne({ where: { phone } });
    if (!user) return res.status(404).json({ exists: false, message: 'User not found' });

    res.json({ exists: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user by userid
router.get('/by-userid/:userid', async (req, res) => {
  try {
    const user = await User.findOne({ where: { userid: req.params.userid } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Generic routes AFTER specific ones

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user statements
router.get('/:userId/statements', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.statements);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add statement
router.post('/add-statement/:userId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { statement } = req.body;
    if (!statement) return res.status(400).json({ message: 'Statement required' });

    user.statements = [...user.statements, statement];
    await user.save();
    res.json(user.statements);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ========== OTP EMAIL ==========

router.post('/send-otp/email', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  const otp = generateOTP();
  otpStore[email] = { otp, createdAt: Date.now() };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maswath55@gmail.com',
      pass: 'eerd edcn kdqg vaqc', // ⚠️ move to env var
    },
  });

  const mailOptions = {
    from: '"BrickSync" <bricksynce@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is <b>${otp}</b></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to email (${email}): ${otp}`);
    res.status(200).json({ message: 'OTP sent via email' });
  } catch (err) {
    console.error('❌ Error sending OTP email:', err);
    res.status(500).json({ message: 'Failed to send OTP via email' });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: 'Email and OTP required.' });

  const stored = otpStore[email];
  if (!stored) return res.status(400).json({ message: 'OTP not found. Request a new one.' });

  if (Date.now() - stored.createdAt > 5 * 60 * 1000) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP expired.' });
  }

  if (parseInt(otp) === stored.otp) {
    delete otpStore[email];
    return res.status(200).json({ message: 'OTP verified successfully.' });
  }

  return res.status(400).json({ message: 'Incorrect OTP.' });
});

module.exports = router;
