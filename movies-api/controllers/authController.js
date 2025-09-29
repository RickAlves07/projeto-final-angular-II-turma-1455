const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const config = require('../config');

const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const user = userModel.findByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid email or password' });

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const register = async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password) return res.status(400).json({ error: 'Username, email and password are required' });

  const user = userModel.findByEmail(email);
  if (user) return res.status(401).json({ error: 'Email ja cadastrado' });

  const hashedPassword = await bcrypt.hash(password, config.JWT_SALT);
  const id = crypto.randomUUID();
  const newUser = { id, username, email, password: hashedPassword };

  const created = userModel.create(newUser);
  res.status(201).json(created);
};

module.exports = { login, register };
