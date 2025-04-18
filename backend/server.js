const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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
const uploadRoute = require('./routes/upload'); 

app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/upload', uploadRoute); // 👈 Add this line

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
