# 📰 Blogify - A Full Stack Blog Platform

A full-featured blog platform built using **Next.js**, **Express.js**, and **MongoDB**. Users can read, write, and comment on blog posts, while admins can manage users, content, and site settings.

---

## 🚀 Features

### 👤 User Features
- Register and Login (with email verification)
- Secure JWT-based authentication
- Create, edit, and delete own blog posts
- Like & Dislike blog posts
- Comment on posts
- User dashboard with profile and post management

### 🛡️ Admin Features
- User management (approve, suspend, delete)
- Post and comment moderation
- Admin profile panel

### 🌐 General Features
- Rich text editor support
- Lazy loading for better performance
- Responsive design (mobile-first)
- SEO-friendly structure
- Secure password hashing
- CSRF, XSS, SQL Injection protection

---

## 🧰 Tech Stack

| Part        | Technology         |
|-------------|--------------------|
| Frontend    | React.js / Next.js |
| Backend     | Express.js (REST API) |
| Database    | MongoDB + Mongoose |
| Auth        | JWT                |
| Hosting     | Vercel / Netlify (frontend), Render / Railway (backend) |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/blogify.git
cd blogify

# Install dependencies for both frontend and backend
npm install
```

---

## 🛠️ Development

```bash
# Start the frontend (Next.js)
npm run dev

# Start the backend (Express)
cd server
npm run dev
```

---

## 📂 Folder Structure

```
/blogify
├── /app (Next.js frontend)
├── /server (Express backend)
│   ├── /models
│   ├── /routes
│   └── /controllers
```

---

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

