# 🧠 GitHub Profile Generator

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JavaScript-blue)
![API](https://img.shields.io/badge/API-GitHub%20REST%20v3-black)

---

## 📌 Overview

**GitHub Profile Generator** is a web-based tool that takes any GitHub username as input and instantly renders a polished, structured developer profile card. It pulls real-time data directly from the GitHub REST API — no backend, no database, just clean frontend execution.

---

## ✨ Features

- 🔍 Search any GitHub user by username
- 👤 Displays avatar, name, bio, and location
- 📊 Shows public repos, followers, and following count
- 🔗 Direct link to the user's GitHub profile
- ⚡ Real-time API fetch with loading state
- ❌ Handles invalid usernames with clean error UI
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling & Layout |
| JavaScript (Vanilla) | Logic & API Calls |
| GitHub REST API v3 | Live Data Source |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/github-profile-generator.git
```

### 2. Open the project

```bash
cd github-profile-generator
```

### 3. Run it

Just open `index.html` in your browser — no setup, no dependencies, no build tools needed.

```bash
open index.html
```

---

## 📁 Project Structure

```
github-profile-generator/
├── index.html        # Main HTML structure
├── style.css         # All styling
├── script.js         # API logic & DOM manipulation
└── readme.md         # You are here
```

---

## 🔌 API Reference

This project uses the **GitHub REST API v3**:

```
GET https://api.github.com/users/{username}
```

No API key required for basic usage. Rate limit: **60 requests/hour** for unauthenticated requests.

---

## 📸 Preview

> *(Add a screenshot of your project here)*

---

## 🧑‍💻 Author

**Backend Architect**
- GitHub: [@Harkiratcodess](https://github.com/Harkiratcodess)
- LinkedIn: [Harkirat singh](www.linkedin.com/in/harkirat-singh-79ab213b7)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> *"True performance is built from the invisible out."*