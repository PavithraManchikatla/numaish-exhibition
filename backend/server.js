const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://numaish:numaish%401203@cluster0.jiqfhl7.mongodb.net/numaishApp?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Numaish Exhibition Backend API is running!');
});

// Routes
const authRoutes = require('./routes/auth');
const ideasRoutes = require('./routes/ideas');
const ticketsRoutes = require('./routes/tickets');
const uploadRoute = require('./routes/upload'); // Include the upload route for handling image uploads

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/upload', uploadRoute); // Handle file uploads via this route

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
