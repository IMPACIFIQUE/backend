const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongoDB connection successfully');
  } catch (error) {
    console.error('connection failed!', error.message);
  }
};

module.exports = connection;