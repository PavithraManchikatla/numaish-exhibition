const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  numTickets: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
