# 🌦️ Weather App Backend

## 📌 Overview
This is a **Weather App Backend** built using **Node.js, Express, and MongoDB**. It allows users to:

✅ **Sign up & Log in** (with JWT authentication)  
✅ **Fetch weather data** for a city using a third-party API  
✅ **Store search history** in a MongoDB database  
✅ **Retrieve user search history**  
✅ **Delete specific search history entries**  
✅ **Manage users** (Get all users & delete a specific user by ID)

---

## 🚀 Tech Stack
- **Node.js** (Backend framework)
- **Express.js** (Routing & Middleware)
- **MongoDB** (Database)
- **Mongoose** (MongoDB ODM)
- **jsonwebtoken (JWT)** (Authentication & Security)
- **bcryptjs** (Password Hashing)
- **dotenv** (Environment Variables)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Loiszillions/Weather-App-Backend.git
cd weather-app-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a **.env** file in the project root and add:
```plaintext
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
WEATHER_API_KEY=your_openweather_api_key
```

### 4️⃣ Start the Server
```bash
npm start
```
The server will run on **http://localhost:3000**

---

## 📌 API Endpoints

### 📝 **Authentication Routes**

#### 🔹 **User Signup**
**POST /api/signup**
- Registers a new user
- Returns a **JWT Token**

📌 **Request Body (JSON)**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```
📌 **Response**
```json
{
  "message": "New User added successfully",
  "id": "user_id",
  "token": "your_jwt_token"
}
```

#### 🔹 **User Login**
**POST /api/login**
- Authenticates a user and returns a JWT Token

📌 **Request Body (JSON)**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
📌 **Response**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

### 🌍 **Weather Routes**

#### 🔹 **Get Weather Data**
**GET /api/weather?city=cityname**
- Fetches real-time weather data for the specified city

📌 **Headers:**
```plaintext
Authorization: Bearer your_jwt_token
```
📌 **Response Example:**
```json
{
  "city": "London",
  "temperature": "15°C",
  "description": "Cloudy",
  "humidity": "80%",
  "windSpeed": "10 km/h"
}
```

---

### 🕵️ **History Routes**

#### 🔹 **Get Search History**
**GET /api/history**
- Retrieves the search history of the logged-in user

📌 **Headers:**
```plaintext
Authorization: Bearer your_jwt_token
```
📌 **Response Example:**
```json
[
  { "id": "1", "city": "London", "searchDate": "2024-02-06" },
  { "id": "2", "city": "New York", "searchDate": "2024-02-05" }
]
```

#### 🔹 **Delete Specific Search History**
**DELETE /api/history/:id**
- Deletes a specific search history entry by ID

📌 **Headers:**
```plaintext
Authorization: Bearer your_jwt_token
```
📌 **Response Example:**
```json
{ "message": "Search history deleted successfully" }
```

---

### 👥 **User Management Routes**

#### 🔹 **Get All Users**
**GET /api/users**
- Fetches all registered users (Admin access required)

📌 **Response Example:**
```json
[
  { "id": "1", "username": "johndoe", "email": "john@example.com" },
  { "id": "2", "username": "janedoe", "email": "jane@example.com" }
]
```

#### 🔹 **Delete User by ID**
**DELETE /api/users/:id**
- Deletes a specific user by ID (Admin access required)

📌 **Response Example:**
```json
{ "message": "User deleted successfully" }
```

---

## 🔎 Testing the API
Use **Postman** or **Thunder Client** to test API requests.

1️⃣ Sign up to create an account and **copy the token** from the response.
2️⃣ Use the token in the **Authorization header** (`Bearer YOUR_TOKEN`).
3️⃣ Test different endpoints.

---

## 🛠 Future Improvements
✅ User role management (Admin, User)  
✅ Rate limiting for API requests  
✅ Improved error handling & logging

---

## 🎯 Author
GitHub: [Loiszillions](https://github.com/Loiszillions)

---
