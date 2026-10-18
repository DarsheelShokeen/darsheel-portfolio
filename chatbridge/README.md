# ChatBridge — Secure End-to-End Encrypted Messaging & Video Calling

[![Live Demo](https://img.shields.io/badge/Live_Demo-ChatBridge%20App-8b5cf6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://darsheelshokeen.xo.je/chatbridge/)
[![Security](https://img.shields.io/badge/Security-E2EE%20AES--GCM%20256-success?style=for-the-badge&logo=auth0&logoColor=white)](#)
[![Protocol](https://img.shields.io/badge/Protocol-WebRTC%20%7C%20WebSockets-blue?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **ChatBridge** is an open-source, self-hosted messaging and video calling web application engineered for maximum privacy and low-latency peer-to-peer communication. Featuring client-side cryptographic key generation, AES-GCM 256-bit end-to-end encryption (E2EE), WebRTC voice/video streams, and zero-knowledge message relays.

---

## ✨ Features

* **🔒 End-to-End Encryption (E2EE)**: Messages and files are encrypted client-side using the Web Crypto API (`AES-GCM 256-bit`) with ephemeral `ECDH` key exchange before transmission over the network.
* **🎥 Ultra Low-Latency Peer-to-Peer Calling**: High-definition video and crystal-clear audio calls powered by WebRTC mesh data channels with STUN/TURN fallback.
* **📁 P2P File & Media Sharing**: Direct peer-to-peer binary transfer with instant progress bars and client-side decryption.
* **⚡ Modern Discord/Slack-Inspired Interface**: Fluid channel navigation, active peer indicators, voice call overlays, responsive sidebar, and dark mode theme.
* **🛡️ Zero-Knowledge Relay**: The signaling server only brokers initial WebRTC session handshakes (SDP offers/answers and ICE candidates); it never has access to encryption keys or message plaintexts.

---

## 📋 Requirements to Run

| Component | Minimum Requirement | Recommended |
| :--- | :--- | :--- |
| **Client Browser** | Modern Browser (Chrome 90+, Firefox 88+, Safari 15+, Edge) | Latest Chromium / Firefox |
| **Permissions** | Camera & Microphone (for voice/video calling) | Dedicated webcam / headset |
| **Network** | Internet connection supporting WebRTC & WebSocket | Open UDP ports for STUN |
| **Server (Optional)** | Node.js 18+ (for running custom signaling server) | Node.js 20 LTS |

---

## 🛠️ Architecture & Tech Stack

```
   [ Client Browser A ]                         [ Client Browser B ]
            │                                             │
      (Local AES-GCM)                               (Local AES-GCM)
            │                                             │
            ├──────────── Direct WebRTC P2P ──────────────┤
            │         (Encrypted Media & Data)            │
            ▼                                             ▼
    ┌────────────────────────────────────────────────────────────┐
    │             Signaling Server (Node.js / WS)                │
    │        Brokers SDP Handshakes & ICE Candidates Only        │
    └────────────────────────────────────────────────────────────┘
```

* **Frontend**: Vanilla ES6+ Modern JavaScript, HTML5 Canvas, CSS3 Glassmorphism UI.
* **Real-Time Layer**: WebRTC (`RTCPeerConnection`, `RTCDataChannel`), WebSocket API.
* **Cryptography**: W3C Web Cryptography API (`crypto.subtle`), AES-GCM, ECDH.

---

## 🚀 Getting Started

### 1. Direct Web Preview
You can test the live application directly in your browser without any installation:
👉 **[Launch ChatBridge Live](https://darsheelshokeen.xo.je/chatbridge/)**

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/DarsheelShokeen/chatbridge.git
cd chatbridge

# Run with any static server
python -m http.server 3000
# or
npx serve .
```

Open `http://localhost:3000` in two separate browser windows or tabs to establish a peer connection and test real-time encrypted messaging.

---

## 👤 Author

**Darsheel Shokeen**  
*Developer • Creator • Builder*  
* Website: [darsheelshokeen.xo.je](https://darsheelshokeen.xo.je)  
* GitHub: [@DarsheelShokeen](https://github.com/DarsheelShokeen)  
* LinkedIn: [Darsheel Shokeen](https://www.linkedin.com/in/darsheel-shokeen-523833302)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
