const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
