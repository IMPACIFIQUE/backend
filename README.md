# Stock Management System (Backend)

A REST API for a stock management system, built with Node.js, Express and MySQL. It handles user login, and lets managers and users work with daily stock records.

## Features

- Register and login with token authentication
- Logout that blocks the used token
- Manager routes for managing records
- User routes for daily records
- Seed script to add starting data

## Project Structure

    config/        database connection
    controller/    auth, manager and user logic
    middleware/    authentication check
    models/        User, DailyRecord, BlockedToken
    routes/        auth, manager and user routes
    seed.js        adds starting data
    server.js      app entry file

## Setup

1. Install dependencies:

        npm install

2. Create a `.env` file with your database details and secret key (for example host, user, password, database name and JWT secret).

3. Add starting data (optional):

        node seed.js

4. Start the server:

        node server.js

## Author

[IMPACIFIQUE](https://github.com/IMPACIFIQUE)
