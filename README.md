cd # Relearn - MERN Stack Web Application

A simple MERN stack application with user authentication and course display for Relearn.

## Features
- User signup and login
- Protected courses page
- MongoDB Atlas integration

## Setup

### Backend
1. Navigate to `backend` directory
2. Install dependencies: `npm install`
3. Update `.env` with your MongoDB Atlas URI and JWT secret
4. Start server: `npm start` or `npm run dev`

### Frontend
1. Navigate to `frontend` directory
2. Install dependencies: `npm install`
3. Start app: `npm start`

## Usage
- Signup or login
- View courses after login
- Without login, trying to access courses redirects to login

## API Endpoints
- POST /api/auth/signup
- POST /api/auth/login
- GET /api/courses (protected)
- POST /api/courses (protected)