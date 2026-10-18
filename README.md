# Darsheel Shokeen — Developer Portfolio & Digital Showcase

[![Live Demo](https://img.shields.io/badge/Live_Demo-https%3A%2F%2Fdarsheelshokeen.xo.je-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://darsheelshokeen.xo.je)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20%26%20Maintained-purple?style=for-the-badge)](#)
[![Built With](https://img.shields.io/badge/Built_With-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20PHP-orange?style=for-the-badge)](#)

> Modern, minimal, and high-performance personal developer portfolio and web application hub showcasing live digital experiences, WebRTC communication tools, cloud SaaS management platforms, IoT telemetry dashboards, and Android Material 3 software.

---

## 🌟 Key Features

* **⚡ Ultra-Minimalist UI & Fluid Micro-Interactions**: Designed with a sleek aesthetic, smooth page transitions, interactive mouse-following glow cards, and particle physics canvas.
* **🌓 Seamless Dark / Light Mode**: Instant toggle with theme memory (`localStorage`) and dynamic particle contrast adjustment.
* **🌍 Real-Time Serverless Visitor Counter**: Custom PHP-driven atomic visitor tracking with 24-hour IP deduplication and animated counter rolling.
* **🕒 Live Asia/Kolkata Clock**: Real-time IST clock widget displaying current availability status.
* **🖼️ Rich Social Cards & Adaptive Favicon**: Custom-crafted Open Graph (1200×630) social share banner and SVG/ICO sun favicon that dynamically contrasts in light and dark browser tabs.
* **📱 Fully Responsive**: Fluid CSS Grid and Flexbox layouts optimized for mobile, tablet, and 4K desktop displays.

---

## 🚀 Featured Live Projects

| Project | Category | Tech Stack | Requirements |
| :--- | :--- | :--- | :--- |
| **[ChatBridge](chatbridge/)** | WebRTC & E2EE Messaging | WebSockets, WebRTC, Node.js | Modern Browser, Camera/Mic |
| **[EduCloud](educloud/)** | Multi-Role School Management SaaS | SPA, Real-Time DB, Vanilla ES6 | Any Web Browser, Zero Install |
| **[Smart Flood Alert](smart-flood/)** | IoT Telemetry & Early Warning | ESP32, FC-28 Sensor, FastAPI, Python | ESP32, FC-28, WhatsApp API |
| **[AlbumCanvas](album-canvas/)** | Dynamic Android Live Wallpaper | Kotlin, Jetpack Compose, Material 3 | Android 12+ (API 31+), MediaSession |

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, Semantic Elements, CSS3 (Custom Variables, Keyframe Animations, Glassmorphism), Vanilla Modern ES6+ JavaScript.
* **Interactive Canvas**: Custom particle physics network engine (`particles.js`).
* **Backend**: PHP 8+ for atomic worldwide visitor analytics (`counter.php`).
* **Deployment & Hosting**: Apache, `.htaccess` (HTTPS 301 redirection, GZIP compression, asset caching), automated FTP deployment pipeline (`deploy_ftp.py`).

---

## 📂 Project Structure

```bash
darsheel-portfolio/
├── index.html            # Main landing page (Hero, Socials, Counter, Clock)
├── projects.html         # Projects showcase with interactive cards & requirement badges
├── contact.html          # Contact hub with interactive cards
├── styles.css            # Unified design system & responsive styling
├── main.js               # Counters, theme toggling, transitions, interactive effects
├── particles.js          # Interactive particle physics canvas engine
├── counter.php           # Serverless worldwide visitor tracking backend
├── visits.json           # Visitor persistence data
├── og-preview.png        # 1200x630 Open Graph preview banner
├── favicon.svg           # Adaptive vector sun favicon
├── favicon.ico           # Multi-resolution fallback icon
├── .htaccess             # Apache configuration, HTTPS redirect, caching
│
├── chatbridge/           # ChatBridge project web application
├── educloud/             # EduCloud school management SaaS platform
├── smart-flood/          # Smart Flood Alert telemetry dashboard
└── album-canvas/         # AlbumCanvas Android app landing & interactive demo
```

---

## 💻 Local Development Setup

To run and preview the portfolio locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DarsheelShokeen/darsheel-portfolio.git
   cd darsheel-portfolio
   ```

2. **Serve with any local web server**:
   * *Using Python 3*:
     ```bash
     python -m http.server 8000
     ```
   * *Using Node.js `npx serve`*:
     ```bash
     npx serve .
     ```
   * *Using PHP (to test `counter.php`)*:
     ```bash
     php -S localhost:8000
     ```

3. Open **`http://localhost:8000`** in your browser.

---

## 👤 Author

**Darsheel Shokeen**  
*Developer • Creator • Builder*

* 🌐 **Live Website**: [darsheelshokeen.xo.je](https://darsheelshokeen.xo.je)
* 🐙 **GitHub**: [@DarsheelShokeen](https://github.com/DarsheelShokeen)
* 💼 **LinkedIn**: [Darsheel Shokeen](https://www.linkedin.com/in/darsheel-shokeen-523833302)
* ✉️ **Email**: [darsheelshokeen@gmail.com](mailto:darsheelshokeen@gmail.com)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
