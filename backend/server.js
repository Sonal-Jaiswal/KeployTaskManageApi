const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Use MongoDB Atlas connection string from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));

// CRUD endpoints
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.status(201).json(task);
});

app.put('/api/tasks/:id', async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, completed },
    { new: true }
  );
  res.json(task);
});

app.delete('/api/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ deleted: 1 });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 