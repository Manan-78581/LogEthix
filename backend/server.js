require('dotenv').config(); // Load .env variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const requestIp = require('request-ip'); // ✅ Added for IP tracking
const logRoute = require('./routes/log');

const app = express();
const PORT = process.env.PORT || 3000;

// === Debug: Check if MONGO_URI is set ===
console.log('🔧 MONGO_URI from .env:', process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not defined in .env file. Exiting...');
  process.exit(1);
}

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit the app on connection failure
  });

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(requestIp.mw()); // ✅ Enables req.clientIp for IP tracking

// === Serve static files from 'public' folder ===
app.use(express.static(path.join(__dirname, 'public')));

// === API Route ===
app.use('/log', logRoute);

// === Root Route ===
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`✅ LogEthix server is running on http://localhost:${PORT}`);
});
