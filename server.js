require('dotenv').config();
const express = require('express');
const app = express();

require('./config/db')();

app.use(express.json());

app.use('/auth', require('./routes/authRoutes'));
app.use('/manager', require('./routes/managerRoutes'));
app.use('/user', require('./routes/userRoutes'));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));