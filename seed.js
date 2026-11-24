require('dotenv').config();
const bcrypt = require('bcryptjs');
const connection = require('./config/db');
const User = require('./models/User');

(async () => {
  await connection();

  const username = process.env.MANAGER_USERNAME.toLowerCase();
  const exists = await User.findOne({ username });

  if (exists) {
    console.log('manager already exists');
  } else {
    await User.create({
      name: process.env.MANAGER_NAME,
      username,
      password: await bcrypt.hash(process.env.MANAGER_PASSWORD, 10),
      role: 'manager'
    });
    console.log('manager created');
  }
  process.exit(0);
})();