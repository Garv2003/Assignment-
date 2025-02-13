# React & Express Application

This repository contains a full-stack web application built using React for the frontend and Express.js for the backend.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js

## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- npm / yarn / pnpm

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Garv2003/Assignment-.git
   cd Assignment-
   ```

2. Install dependencies:
   ```sh
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

### Running the Application
#### Start the Backend Server
```sh
cd server
npm run dev  # Uses nodemon for hot-reloading
```

#### Start the Frontend
```sh
cd client
npm run dev  # Runs React in development mode
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3001` (or as configured).

## Environment Variables
Create a `.env` file in the `server` directory and configure the following:
```
CLIENT_URL=http://localhost:5173
```

For the frontend, create a `.env` file in `client`:
```
VITE_API_URL=http://localhost:3001
```

## API Routes
- `GET /api/random-values` - Returns random values for quantity, price, total, and profit

---

