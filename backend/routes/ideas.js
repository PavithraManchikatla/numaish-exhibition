const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (err) {
    console.error('Error deleting idea:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new idea
router.post('/', async (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ message: 'Username and text are required' });
  }
  const idea = new Idea({ username, text });
  try {
    const newIdea = await idea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an idea by id
const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid idea ID' });
    }
    const idea = await Idea.findByIdAndDelete(id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json({ message: 'Idea deleted' });
  } catch (err) {
    console.error('Error deleting idea:', err);
    res.status(500).json({ message: err.message || 'Failed to delete idea' });
  }
});

module.exports = router;
