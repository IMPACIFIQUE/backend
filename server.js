const express = require('express');
const connectDB = require('./db');
const userModule = require('./userModule');

const app = express();
app.use(express.json());

connectDB();

app.get('/users', async (req, res) => {
  try {
    res.json(await userModule.getUsers());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  try {
    const id = await userModule.addUser(req.body.name, req.body.email);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));