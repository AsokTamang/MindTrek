# 🧠 MindTrek

**MindTrek** is a fullstack mood tracking app that helps users log their daily moods and visualize their emotional trends over time. Built with **Next.js**, it combines secure authentication, mood tracking, notification alerts, and mental health resources in one sleek, user-friendly platform.

Live Demo 👉 [https://mind-trek-two.vercel.app](https://mind-trek-two.vercel.app)

---

## 🚀 Features

- 🔐 **Authentication** using [Auth.js](https://authjs.dev) with GitHub OAuth
- 🧠 **MongoDB integration** with Auth.js adapter to store user sessions and mood logs
- 📈 **Mood Graph** powered by LineChart.js (Recharts)
- 🔔 **Push Notifications** via Firebase Cloud Messaging (foreground + background)
- 🌙 **Dark Mode** toggle using next-themes
- 🧑‍⚕️ **Mental Health Professionals Data** scraped and displayed from publicly available sites
- 🧭 Simple and intuitive navbar for easy navigation and graph viewing

---

## 🛠 Tech Stack

| Tech             | Usage                                |
|------------------|---------------------------------------|
| **Next.js**      | Fullstack framework (App Router)      |
| **Auth.js**      | Authentication (GitHub OAuth)         |
| **MongoDB**      | Database for storing users & moods    |
| **Firebase FCM** | Push notifications                    |
| **Recharts**     | Mood scale graph (LineChart)          |
| **next-themes**  | Dark/light theme toggling             |
| **Cheerio + Axios** | Web scraping mental health resources |

---

## 📦 Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/AsokTamang/mindtrek.git
   cd mindtrek
2.Install dependencies:
  npm install
3.Set up your .env.local:
  MONGODB_URI=your_mongodb_uri
  NEXTAUTH_SECRET=your_secret
  NEXTAUTH_URL=http://localhost:3000
  GITHUB_ID=your_github_client_id
  GITHUB_SECRET=your_github_client_secret
  FIREBASE_API_KEY=...
  FIREBASE_AUTH_DOMAIN=...
  FIREBASE_PROJECT_ID=...
  FIREBASE_MESSAGING_SENDER_ID=...
  FIREBASE_APP_ID=...
4.Run the dev server:
  npm run dev


🧠 Mental Health Disclaimer
This app is for personal mood tracking and awareness only and is not a substitute for professional mental health care.

 Contact
Built by Asok Tamang
LinkedIn - https://www.linkedin.com/in/asok-tamang-3792a3290/
Github - https://github.com/AsokTamang
