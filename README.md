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

## 🗂️ System Architecture

```mermaid
graph TD
  A[User Form (Frontend)] -->|Submit| B[Express.js Backend]
  B --> C[Request Parsing & Validation]
  C --> D[Geo-IP Lookup & Device Parsing]
  D --> E[MongoDB - KeystrokeLog Collection]
  E --> F[Admin Panel / Future Analytics Layer]
