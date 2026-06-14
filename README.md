# 🐘 Elephant Detection Web Dashboard

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A real-time web monitoring dashboard for the **Elephant Detection System** — designed to help forest officials and local communities track and respond to human-elephant conflict (HEC) in real time, directly from any web browser.

> **Companion Project:** This dashboard works alongside the [Elephant Detection Mobile App](https://github.com/atulsg88/Elephant_Detection_App), which handles on-ground AI-based detection via sensors and night-vision cameras.

---

## 📌 Project Overview

Human-elephant conflict (HEC) is a growing concern in states like Chhattisgarh, where elephants frequently enter human settlements, causing property damage and endangering lives. While the [Elephant Detection App](https://github.com/atulsg88/Elephant_Detection_App) handles real-time AI-powered detection on the ground, **this web dashboard** provides a centralized monitoring interface for:

- **Forest officials** to oversee multiple detection zones from a single screen
- **Village authorities** to receive and review alerts in real time
- **Administrators** to analyze historical detection data and plan mitigation strategies

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🗺️ **Interactive Detection Map** | Visualize elephant detection zones with real-time alert pins on an interactive map |
| 🔔 **Live Alert Feed** | Receive instant notifications when an elephant is detected, with timestamps and location details |
| 📊 **Detection Analytics** | View detection frequency charts, hourly/daily trends, and zone-wise statistics |
| 🩺 **Sensor Health Monitoring** | Monitor the operational status of deployed IoT sensors and cameras |
| 📜 **Detection History** | Browse and filter historical detection logs with detailed metadata |
| 🔄 **Real-time Sync** | Data synchronized in real time via Firebase, ensuring the dashboard always reflects the latest ground situation |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18+ with functional components & hooks |
| **Build Tool** | Vite (fast HMR & optimized production builds) |
| **Styling** | CSS3 with custom properties |
| **Database** | Firebase Firestore (real-time cloud database) |
| **Authentication** | Firebase Auth |
| **Hosting** | Vercel / Firebase Hosting |

---

## 📁 Project Structure

```
Elephant_Detection_Web/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, icons, and media
│   ├── components/          # Reusable React components
│   │   ├── Dashboard/       # Main dashboard view
│   │   ├── Map/             # Interactive map component
│   │   ├── Alerts/          # Alert feed & notifications
│   │   └── Analytics/       # Charts & statistics
│   ├── firebase/            # Firebase configuration & helpers
│   ├── hooks/               # Custom React hooks
│   ├── App.jsx              # Root application component
│   ├── App.css              # Global styles
│   └── main.jsx             # Application entry point
├── .gitignore
├── index.html               # HTML entry point
├── package.json
├── vite.config.js           # Vite configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+ installed
- A **Firebase project** with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/atulsg88/Elephant_Detection_Web.git
   cd Elephant_Detection_Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a `.env` file in the project root with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 🔗 Related Projects

| Project | Description | Link |
|---|---|---|
| **Elephant Detection App** | Mobile app with AI-powered elephant detection using sensors & night-vision cameras | [GitHub](https://github.com/atulsg88/Elephant_Detection_App) |

---

## 📸 Screenshots

> _Screenshots coming soon — the dashboard features an interactive map, real-time alert feed, and detection analytics._

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Atul Gingosav**
- GitHub: [@atulsg88](https://github.com/atulsg88)

---

> Built with ❤️ to protect both humans and elephants through technology.
