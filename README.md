# 🔗 MERN URL Shortener

A full-stack **URL Shortener** application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This app allows users to convert long URLs into short, shareable links.

---


## Demo

![Demo GIF](https://github.com/sleeptillash/MERN_urlshortner/blob/main/url-shortener-next/public/demovideo.gif)


---

##  Features

-  Generate short URLs
-  Redirect to the original URL
-  Track usage and clicks (optional feature)
-  Built with MERN stack
-  Simple, clean, and responsive UI using Next.js
-  Deployed on [Vercel](https://mernurlshortner.vercel.app)

---

##  Tech Stack

- **Frontend:** Next.js (React)
- **Backend:** Express.js + Node.js
- **Database:** MongoDB
- **Hosting:** Vercel (Frontend), Render (Backend)

---

## ⚙️ Setup Instructions

Follow the steps below to run this project locally.

### 1. Clone the repository

```bash
git clone https://github.com/sleeptillash/MERN_urlshortner.git
cd MERN_urlshortner
```

### 2. Setup Backend
```bash
cd url-shortener-backend
npm install
```

Create a .env file in url-shortener-backend/ with the following:
```bash
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

Run the backend:
```bash
npm start
```

Backend will run at http://localhost:5000

### 3. Setup Frontend
```bash
cd ../url-shortener-next
npm install
npm run dev

```
Frontend will run at http://localhost:3000


Live Demo

https://mernurlshortner.vercel.app


