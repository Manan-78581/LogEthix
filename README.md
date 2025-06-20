<p align="center">
  <img src="https://img.shields.io/badge/Project-LogEthix-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/Manan-78581/LogEthix?style=for-the-badge" />
</p>

<h1 align="center">🛡️ LogEthix</h1>

<p align="center">
  <b>Advanced Keylogger System with User Behavior Analytics</b><br/>
  A full-stack keylogging system that captures keystrokes, user metadata, and device info in real-time using Node.js and MongoDB.
</p>

---

## 🧩 Features

- 🔐 **Keystroke Logging** — Capture all key events with timestamp and keycode.
- 🌍 **IP & Location Tracking** — Detects public IP, city, and country.
- 💻 **Device Fingerprinting** — Logs browser and OS info.
- ⏱️ **Timestamped Records** — All logs are stored with ISO timestamp.
- 💾 **MongoDB Integration** — Persist logs with location/device/session data.
- 🗑️ **Data Cleanup Tools** — Optional TTL indexing & delete-by-date features.
- 🔐 **Secure Architecture** — Rate-limiting & validation included.

---

## 🧩 System Architecture

```mermaid
flowchart TD
  %% Frontend
  A1[User Form] --> A2[Keystroke Logger]
  A2 --> A3[Send via Fetch API]

  %% Backend
  A3 --> B1[Express.js Server]
  B1 --> B2[Keystroke Formatter]
  B2 --> B3[User-Agent Parser]
  B3 --> B4[GeoIP Lookup]
  B4 --> B5[Save to MongoDB]

  %% Database
  B5 --> C1[KeystrokeLog Collection]

  subgraph Database [MongoDB]
    I[KeystrokeLog Collection]
    H --> I
  end

