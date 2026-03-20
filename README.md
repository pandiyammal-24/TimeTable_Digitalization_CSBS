Timetable Digitalization System (CSBS Department)

A full-stack MERN application developed to digitalize the academic timetable of the CSBS department.
The system allows students to view their timetable based on Year and Section, fetched dynamically from MongoDB through a backend API.

🚀 Project Objective

To replace manual and static timetable management with a centralized digital system that:

Stores timetables in a database

Displays them dynamically to students

Supports future scalability for faculty and admin roles

🧩 Key Features
👨‍🎓 Student Dashboard

Select Year and Section

Automatically fetch timetable from database

Displays timetable in tabular format (Day × Time Slot)

Shows "No timetable available" if data does not exist

🗄 Backend Timetable Management

Timetable stored in MongoDB (Compass – local)

CSV timetable imported and converted to JSON

REST API fetches timetable using year & section filters

🔐 Authentication (Basic – Extendable)

User context handling in frontend

Ready for JWT-based authentication in future

🛠 Tech Stack (MERN)
Frontend

React 18

Vite

React Router

Plain CSS

Fetch API for backend communication

Backend

Node.js

Express.js

MongoDB (Compass – Local)

Mongoose

📂 Project Structure
TimeTable_Digitalization_CSBS/
│
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── timetableController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Timetable.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── timetableRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend (src/) /
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StudentProfileSetup.jsx
│   │   └── TimetableTable.jsx
│   ├── pages/
│   │   └── StudentDashboard.jsx
│   ├── AuthContext.jsx
│   ├── api.js
│   ├── styles/
│   │   └── global.css
│   ├── assets/
│   │   └── bg.jpeg
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
└── SETUP.md

🧪 Timetable Data Format (MongoDB)

Each timetable entry stored as:

{
  "year": 3,
  "section": "A",
  "day": "Monday",
  "period": 1,
  "time": "9.00-9.50",
  "sub_code": "21CB630",
  "faculty": "JFL",
  "venue": "ITT2"
}

🔗 API Endpoints
cd srcGet Timetable
GET /api/timetable?year=3&section=A

Response

Returns timetable array if data exists

Returns message if timetable not found

⚙️ Environment Variables

Create a .env file inside backend/ (DO NOT push this file):

A safe reference file is provided as:

backend/.env.example

▶️ How to Run the Project
Backend
cd backend
npm install
npm start

Backend runs on:
http://localhost:5000

Frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173




Role-based access control

Online timetable upload (CSV import via UI)
