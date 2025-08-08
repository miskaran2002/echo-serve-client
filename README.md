🚀 Echo-Serve Project
Echo-Serve is a full-stack service review platform that allows users to browse, add, and review various services. Authenticated users can securely manage their own services and reviews.

🔗 Live Project
👉 Live Site: https://echo-serve.web.app
(Update with actual deployed URL if different)

🖼️ Screenshot

(Add a real screenshot of your UI and rename it screenshot.png in the root folder)

🔧 Features
🔐 Authentication & Authorization

Firebase Authentication (Email/Password & Google Login)

JWT-based backend protection for secure API access

🧾 Service Management

Add new services

Browse all services

View individual service details

Filter featured services

Display total review count per service

🗣️ Review System

Submit reviews with rating, date, and user info

View all reviews of a service

Edit or delete user’s own reviews

👤 User Dashboard

My Services: Update/Delete own added services

My Reviews: Update/Delete submitted reviews

🌐 Responsive UI

Clean, mobile-friendly interface

Dark/light theme toggle using Context API

🛠️ Technologies Used
🔹 Frontend
React.js (Vite)

React Router DOM

Firebase Authentication

React Rating

Tailwind CSS + DaisyUI

Context API

🔹 Backend
Node.js

Express.js

MongoDB Atlas

Firebase Admin SDK (JWT verification)

📦 Dependencies
react-router-dom

firebase

react-rating

axios

jsonwebtoken

cors

dotenv

mongoose

express

🛠️ How to Run the Project Locally
🔹 Frontend Setup
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/echo-serve-client.git

# 2. Navigate to the project folder
cd echo-serve-client

# 3. Install dependencies
npm install

# 4. Create a .env file and add your environment variables
# Example:
# VITE_apiUrl=http://localhost:5000

# 5. Start the development server
npm run dev
🔹 Backend Setup
bash
Copy
Edit
# 1. Clone the repository
git clone https://github.com/your-username/echo-serve-server.git

# 2. Navigate to the backend folder
cd echo-serve-server

# 3. Install dependencies
npm install

# 4. Create a .env file and add your environment variables
# Example:
# PORT=5000
# MONGODB_URI=your-mongodb-connection-string
# FIREBASE_PROJECT_ID=your-firebase-project-id
# PRIVATE_KEY="your-firebase-admin-sdk-private-key"

# 5. Start the backend server
npm run start
📚 Additional Resources
🔗 Client Repo: GitHub - echo-serve-client

🔗 Server Repo: GitHub - echo-serve-server
(Replace with actual links)
