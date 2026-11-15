# EduCloud — Multi-Role Cloud School Management Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-EduCloud%20SaaS-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white)](https://darsheelshokeen.xo.je/educloud/)
[![Architecture](https://img.shields.io/badge/Architecture-Modular%20ES6%20SPA-blue?style=for-the-badge)](#)
[![Roles Supported](https://img.shields.io/badge/Roles-Admin%20%7C%20Teacher%20%7C%20Student%20%7C%20Parent-success?style=for-the-badge)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **EduCloud** is a modern, lightweight, role-based educational SaaS management platform engineered for K-12 and university administration. Built as a modular single-page application (SPA), it provides dedicated operational environments for **Administrators**, **Teachers**, **Students**, and **Parents** with synchronized real-time attendance, homework workflows, and alert notifications.

---

## 👥 Role-Based Capabilities

### 🛡️ 1. Administrator Dashboard
* **School-Wide Analytics**: Real-time high-level attendance averages, active student/teacher headcounts, and class rosters.
* **Class & Section Breakdown**: Granular performance inspection for every grade and division.
* **User & Relationship Management**: Maps parent accounts to multiple student profiles.

### 👩‍🏫 2. Class Teacher Portal
* **Live Attendance Register**: 1-click marking of *Present*, *Absent*, or *Late* with instant short-attendance warning badges (<75%).
* **Homework Assignment Studio**: Create homework with due dates, rich subject instructions, and attachment links.
* **Timetable & Daily Periods**: Dynamic schedule overview with curriculum resource uploads.

### 🎒 3. Student Portal
* **Homework Tracker**: Clear tabbed distinction between **Pending** and **Submitted** assignments.
* **Homework Submission Engine**: Upload work via file attachments or rich text submissions with submission timestamps.
* **Attendance History**: Transparent view of subject-wise and overall attendance percentage.

### 👨‍👩‍👧 4. Parent Portal
* **Multi-Child Switcher**: Effortlessly toggle between siblings without logging out.
* **Academic Oversight**: Direct visibility into homework received, deadlines, and what the child has submitted.
* **Automated Attendance Notifications**: Instant alerts when a teacher marks attendance or when short-attendance threshold is breached.

---

## 📋 Requirements to Run

| Requirement | Specification |
| :--- | :--- |
| **Platform** | Any modern Web Browser (Desktop, Tablet, iOS Safari, Android Chrome) |
| **Installation** | **Zero installation required** — runs directly client-side via ES6 modules |
| **Storage** | Browser `localStorage` (automatically initialized with realistic demo data) |
| **Dependencies** | None (Vanilla JavaScript, zero heavy frameworks, sub-millisecond boot time) |

---

## 🛠️ Architecture & Directory Structure

```bash
educloud/
├── index.html            # SPA mount point & HTML shell
├── styles.css            # Enterprise SaaS styling & responsive design tokens
│
└── js/
    ├── app.js            # App router, lifecycle manager & mount controller
    ├── auth.js           # Authentication engine & role session management
    ├── store.js          # Centralized reactive data store & notification dispatcher
    │
    └── views/
        ├── Login.js      # Role-based login interface with quick demo switchers
        ├── Dashboard.js  # Main navigation shell & notification panel
        ├── AdminView.js  # School-wide administrative analytics & class rosters
        ├── TeacherView.js# Attendance register & homework assignment studio
        ├── StudentView.js# Homework pending/submitted tracker & submission dialog
        └── ParentView.js # Multi-child switcher & parental oversight dashboard
```

---

## 🚀 Getting Started

### 1. Live Deployment
Experience the live application immediately:
👉 **[Open EduCloud SaaS Demo](https://darsheelshokeen.xo.je/educloud/)**

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/DarsheelShokeen/educloud.git
cd educloud

# Run any local server (required for ES6 module imports)
python -m http.server 8080
# or
npx serve .
```

Open `http://localhost:8080` in your web browser.

---

## 👤 Author

**Darsheel Shokeen**  
*Developer • Creator • Builder*  
* Website: [darsheelshokeen.xo.je](https://darsheelshokeen.xo.je)  
* GitHub: [@DarsheelShokeen](https://github.com/DarsheelShokeen)  
* LinkedIn: [Darsheel Shokeen](https://www.linkedin.com/in/darsheel-shokeen-523833302)

---

## 📄 License

This software is released under the MIT License.
