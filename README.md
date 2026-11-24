# Stock Management System (Backend)

A REST API for a stock management system, built with Node.js, Express and MongoDB. It handles user login, and lets managers and users work with daily stock records.

## Features

- Register and login with token authentication
- Logout that blocks the used token
- Manager routes for managing records
- User routes for daily records
- Seed script to add starting data

## Project Structure

    config/        MongoDB connection
    controller/    auth, manager and user logic
    middleware/    authentication check
    models/        User, DailyRecord, BlockedToken
    routes/        auth, manager and user routes
    seed.js        adds starting data
    server.js      app entry file

## Setup

1. Make sure MongoDB is installed and running (or use a MongoDB Atlas link).

2. Install dependencies:

        npm install

3. Create a `.env` file:

        MONGO_URI=mongodb://localhost:27017/stock_db
        JWT_SECRET=your_secret_key
        PORT=5000

4. Add starting data (optional):

        node seed.js

5. Start the server:

        node server.js

## Author

[IMPACIFIQUE](https://github.com/IMPACIFIQUE)
