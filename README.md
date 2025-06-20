# LogEthix - Intelligent Keystroke Logging System

A simple, full-stack keylogger for ethical research and security demonstrations. This program captures keystrokes, along with IP, location, browser/device info, and timestamps, securely storing them in a MongoDB database.

---

## Features

- Logs keystrokes with timestamp
- Captures public IP address
- Detects geolocation (city, country)
- Logs device and browser info using User-Agent
- MongoDB backend with auto-expiry support
- Modular Express.js routes

---

## System Architecture

Client (HTML Form) -> script.js (captures keystrokes)
-> POST /log API -> Express.js Server
-> GeoIP + Device Info Parser -> Keystroke Formatter
-> MongoDB (keystroke_logs)

---

## Data Flow Overview

User -> Browser (Inputs data, records keypresses)
-> Browser (Sends POST request with keystrokes + metadata)
-> Express API (Saves formatted document to MongoDB)
-> Express API (Returns success message)

---

## Project Structure

logethix/
├── models/
│   └── KeystrokeLog.js
├── routes/
│   └── log.js
├── services/
│   └── keystrokeProcessor.js
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── logo/
│       └── LogEthix-logo.png
├── server.js
├── .env
└── README.md


---

## Setup Instructions

### 1. Clone the repo

```bash
git clone [https://github.com/yourusername/logethix.git](https://github.com/yourusername/logethix.git)
cd logethix/backend
2. Install dependencies
Bash

npm install
3. Create .env file
Create a .env file in the backend folder with the following content:

Ini, TOML

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/logethix
4. Start the server
Bash

node server.js
Frontend will be available at: http://localhost:3000

Sample MongoDB Document
JSON

{
  "username": "manan",
  "password": "kathuria",
  "keystrokes": "2025-06-20T13:38:25.767Z - m (Code: 77)\n2025-06-20T13:38:25.870Z - a (Code: 65)\n...",
  "ip": "103.29.245.1",
  "device": "Chrome 136.0.0 on Windows 10.0.0",
  "location": "Unknown City, IN",
  "timestamp": "2025-06-20T13:38:32.916Z"
}
Technology Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Device Info: useragent
GeoIP: geoip-lite
Planned Enhancements
Use external IP geolocation API (ip-api/ipstack)
Admin route: delete logs by date/username
Add session/token logging (for real auth flows)
Dashboard with log viewer (React/Vue)
TTL Index for auto-deletion after 30 days
Rate limiting to prevent abuse
Body validation using Zod or Joi
License
This project is licensed under the MIT License. See the LICENSE file for more info.

Credits
Built by Manan Kathuria with ❤️
Inspired by pranaykumar2/keylogger


---

**Remember these important points after you copy and paste the above:**

* **Replace `yourusername`** in the `git clone` command with your actual GitHub username.
* **The image paths (`docs/img/system-architecture.png`, etc.) are removed from this basic version.** If you still want a UI preview image for your logo, you'll need to manually add `![LogEthix Logo](public/logo/LogEthix-logo.png)` somewhere, as the original `pranaykumar2` repo doesn't use images in its README.
* This style is very bare-bones. If you later decide you want a more feature-rich and visually a
