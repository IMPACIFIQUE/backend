const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlockedToken = require('../models/BlockedToken');

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please log in first' });
    }

    const token = header.split(' ')[1];

    if (await BlockedToken.findOne({ token })) {
      return res.status(401).json({ message: 'You are logged out. Please log in again.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User no longer exists' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const onlyRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Not allowed' });
  }
  next();
};

module.exports = { protect, onlyRole };