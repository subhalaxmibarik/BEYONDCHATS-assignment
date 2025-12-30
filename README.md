# BeyondChats Full Stack Assignment

## Project Overview
This project implements a MERN stack solution for BeyondChats blog articles. It includes:

1. **Phase 1:** Scrape articles from BeyondChats, store in MongoDB, and expose CRUD APIs.  
2. **Phase 2:** Automate article update by fetching top reference articles and generating updated content (LLM-ready).  
3. **Phase 3:** React frontend to display original and updated articles with references.

---

## Folder Structure
backend/
├── index.js
├── .env
├── models/Article.js
├── routes/articleRoutes.js
├── scripts/updateArticles.js
frontend/
├── package.json
├── src/
│ ├── App.js
│ ├── ArticleList.js
│ └── ...


## Local Setup Instructions

### Backend
1. Go to `backend` folder:
cd backend

markdown
Copy code
2. Install dependencies:
npm install

markdown
Copy code
3. Add `.env` file:
MONGO_URL=mongodb+srv://debadattabarik1767_db_user:t58tVhpsEo1YX2iE@cluster0.uputvzg.mongodb.net/beyondChats
PORT=5000

4. Start backend server:
npm start

### Frontend
1. Go to `frontend` folder:
cd frontend

2. Install dependencies:
npm install


3. Start frontend:
npm start


- Open browser: `http://localhost:3000`

---

## Data Flow / Architecture Diagram

[Frontend React] ---> [Backend Express API] ---> [MongoDB]
| |
| |
Fetches articles CRUD operations
|
Displays original & updated content


- Phase 2 Script (`backend/scripts/updateArticles.js`) interacts with the backend API to update articles automatically.  
- References are saved for each updated article.

---

## Features

- CRUD operations on articles (POST, GET, PUT, DELETE)  
- Scraped articles from BeyondChats  
- Automated update simulation (LLM-ready)  
- Frontend displays:
  - Original Content
  - Updated Content
  - References
- Fully responsive design

---

## Live Demo
**Backend Live API:**
https://beyondchats-assignment-a6gp.onrender.com/api/articles
- **Frontend Live Link:** `<Insert your deployed frontend link here>`  
---

## Code Quality

- ES6+ syntax used  
- Clear folder structure  
- Reusable React components  
- Well-commented backend scripts
