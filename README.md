# Echo-Serve Project

Echo-Serve is a full-stack service review platform that allows users to browse, add, and review various services. Authenticated users can manage their own services and reviews securely.

---

## 🔧 Features

- 🔐 **Authentication & Authorization**
  - Firebase Authentication (Email/Password & Google Login)
  - JWT-based backend route protection

- 🧾 **Services**
  - Add new services
  - View all available services
  - View single service details
  - Filter featured services
  - See total review count per service

- 🗣️ **Reviews**
  - Submit reviews (with rating, date, and user info)
  - View all reviews of a service
  - Logged-in users can update/delete their own reviews

- 👤 **User Dashboard**
  - My Services: Update/Delete services added by user
  - My Reviews: Update/Delete reviews submitted by user

- 🌐 **Responsive UI**
  - Clean, mobile-friendly design
  - Dark/light theme toggle using Context API

---

## ⚙️ Technologies Used

- Frontend:
  - React.js (Vite)
  - React Router DOM
  - Firebase Auth
  - React Rating
  - Tailwind CSS + DaisyUI
  - Context API

- Backend:
  - Node.js
  - Express.js
  - MongoDB (Atlas)
  - Firebase Admin SDK (JWT verification)

---

## 📁 Project Structure
