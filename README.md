# Darsheel Shokeen — Personal Brand & Digital Identity

[![Live Demo](https://img.shields.io/badge/Live_Demo-https%3A%2F%2Fdarsheelshokeen.xo.je-8B5CF6?style=for-the-badge&logo=googlechrome&logoColor=white)](https://darsheelshokeen.xo.je)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20%26%20Production--Ready-10B981?style=for-the-badge)](#)
[![Design](https://img.shields.io/badge/Design-Swiss%20Editorial-white?style=for-the-badge)](#)

> **Design Direction:** Premium Dark Editorial × Swiss Minimalism × Modern Technology.  
> Personal brand website and digital identity of **Darsheel Shokeen** — Product Engineer & Builder based in Delhi, India.

---

## 🌟 Architectural & Visual Highlights

* **Swiss Editorial Typographic System:** Disciplined type hierarchy featuring `Inter` for interface clarity and `Newsreader` italic serif accents for literary distinction.
* **Palette Tokens:** Background tones `#09090B`, `#101014`, elevated surfaces `#17171D`, text `#F4F4F5`, and subtle violet accents (`#8B5CF6`, `#A78BFA`).
* **Sticky Navigation & Active ScrollSpy:** Backdrop-blur (`blur(20px)`), automatic section tracking, and accessible mobile drawer menu.
* **Interactive Flagship Case Studies:** In-depth architectural case studies with problem framing, system diagrams, and live interactive sandboxes.
* **Real-Time Visitor Telemetry:** Privacy-first SHA-256 daily hashed visit tracking (`counter.php`) with atomic updates.
* **Live Asia/Kolkata Clock:** Real-time Indian Standard Time (IST) availability tracker.
* **Validated Contact Pipeline:** Native client-side validation with anti-spam honeypot protection and secure PHP submission logging.
* **SEO & Accessibility:** Full OpenGraph, Twitter Cards, Schema.org Person JSON-LD, XML Sitemap, and WCAG AA contrast compliance.

---

## 🚀 Flagship Work

| Project | Category | Tech Stack | Status | Case Study |
| :--- | :--- | :--- | :--- | :--- |
| **[AlbumCanvas](album-canvas.html)** | Android System Architecture | Kotlin, Jetpack Compose, Material 3, Palette API | Live & Open Source | [Read Case Study →](album-canvas.html) |
| **[Smart Flood Alert](smart-flood.html)** | IoT Telemetry & Alerting | ESP32 (C++), FC-28 Sensor, FastAPI, WhatsApp API | Deployed & Live | [Read Case Study →](smart-flood.html) |
| **[LessonPlan Maker](lessonplan-maker.html)** | Educational Platform | JavaScript (ES6+), NCERT Taxonomy, 5E Inquiry | Fully Deployed & Operational | [Read Case Study →](lessonplan-maker.html) |
| **[Financial Research Platform](financial-research.html)** | Quantitative Valuation | Python, DCF Modeling, Financial Statement Parsing | Active Prototyping | [Read Case Study →](financial-research.html) |

---

## 📂 Project Structure

```bash
darsheel-portfolio/
├── index.html               # Master editorial homepage
├── projects.html            # Portfolio archive & project index
├── contact.html             # Dedicated contact hub
├── album-canvas.html        # AlbumCanvas dedicated case study
├── smart-flood.html         # Smart Flood Alert dedicated case study
├── lessonplan-maker.html    # LessonPlan Maker dedicated case study
├── financial-research.html  # Financial Research case study & interactive DCF sandbox
├── journal.html             # Journal reading room with technical essays
├── styles.css               # Unified Swiss editorial design system
├── main.js                  # Sticky nav, scrollspy, clock, counter, contact form
├── counter.php              # Privacy-first visitor tracking backend (SHA-256)
├── contact.php              # Secure contact form handler with honeypot
├── sitemap.xml              # XML Sitemap for search indexing
├── robots.txt               # Search engine directives
├── .htaccess                # HTTPS 301 redirection, GZIP compression, asset caching
│
├── album-canvas/            # Interactive AlbumCanvas web playground
├── smart-flood/             # Operational Smart Flood Alert IoT dashboard
├── lessonplan-maker/        # Interactive NCERT LessonPlan Generator workbench
└── educloud/                # EduCloud school management multi-role prototype
```

---

## 🛠️ Deployment

Deployments to production Apache hosting are automated via secure deployment script using environment variables:

```bash
# Pass credentials via environment variables (never commit credentials into repository)
export FTP_USER="your_ftp_username"
export FTP_PASS="your_ftp_password"
python deploy_ftp.py
```

> **Security Notice:** Never commit actual FTP, database, or API credentials into tracked repository files or commit logs. Production deployments utilize secure environment variable injection.

---

## 📄 License

Open-sourced under the [MIT License](LICENSE). Copyright © 2026 Darsheel Shokeen.
