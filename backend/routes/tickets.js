const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create a new ticket
router.post('/', async (req, res) => {
  try {
    const { fullName, email, numTickets } = req.body;
    if (!fullName || !email || !numTickets) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const ticket = new Ticket({ fullName, email, numTickets });
    await ticket.save();
    res.status(201).json({ message: 'Ticket registered successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
