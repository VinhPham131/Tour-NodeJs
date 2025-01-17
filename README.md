# Tripter Tours&Travel Booking

![Home page screenshot](/Overview/homepage.png)

## Overview
Welcome to the **Tripster Tours&Travel Booking**. This is an e-commerce platform dedicated to providing an exclusive selection of travel experiences. Our mission is to deliver a seamless booking experience for those seeking luxury and adventure.

---

## Technologies
This project is built with a combination of modern backend and frontend technologies, ensuring scalability, performance, and a seamless user experience:
### Backend
- Node.js: Asynchronous event-driven JavaScript runtime for high-performance backend operations.
- Express.js: Lightweight web application framework for building RESTful APIs.
- Sequelize: ORM for structured database queries and model management with MySQL.
- MySQL: Relational database for reliable data storage.
- jsonwebtoken: Secure authentication and token-based sessions.
- bcrypt: Secure password hashing.
- dotenv: Manage environment variables.
- multer: File handling for tour image uploads.
- cors: Cross-origin resource sharing for frontend-backend integration.
- Express-session: For session management and role-based access control.
- Nodemailer: Send transactional emails like invoices, booking confirmations, and password resets.
- Nodemon: Development monitoring for efficient debugging.
### Frontend
- React.js: Component-based framework for building interactive UIs.
- Tailwind CSS: Utility-first CSS framework for rapid styling.
- React Router: For seamless navigation across pages.
- Axios: HTTP client for API communication.
- JWT Decode: Decodes and validates JSON Web Tokens.

---

## Detail of the project
- [ERD diagram](Overview/databaseimg/README.md)
- [ScreenShot](Overview/screenshot/README.md)

---

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js 18+](https://nodejs.org/en/download)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- [Git](https://git-scm.com/downloads)
- [npm](https://www.npmjs.com/get-npm)

---

## Project Structure

### Backend
- **/controllers**: Contains logic for handling requests and sending responses.
- **/routes**: Defines the API endpoints.
- **/models**: Sequelize models for database tables.
- **/middlewares**: Contains authentication and validation middleware.
- **/config**: Holds configuration for the database and environment variables.
- **/public/uploads**: Stores uploaded images for tours.
- **app.js**: The entry point of the application.
- **package.json**: Lists Node.js dependencies and scripts.

### Frontend
- **/src/components**: React components for building the user interface.
- **/src/pages**: Page-level components for routing.
- **/src/assets**: Images, fonts, and other static assets.
- **/src/styles**: Contains Tailwind CSS configuration and additional styles.
- **package.json**: Lists React dependencies and scripts.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/VinhPham131/Tour-NodeJs.git
```

### 2. Install Dependencies

#### Backend
Navigate to the backend directory and install the dependencies:
```bash
cd backend
npm install
```

#### Frontend
Navigate to the frontend directory and install the dependencies:
```bash
cd frontend
npm install
```

---

### 3. Database Setup

Ensure MySQL is running on your machine. The database configuration is managed in `backend/config/config.json`. Update the file with your database credentials if needed:

```json
{
  "development": {
    "username": "root",
    "password": "vinh1301",
    "database": "booking_tours",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "vinh1301",
    "database": "booking_tours",
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "vinh1301",
    "database": "booking_tours",
    "host": "localhost",
    "dialect": "mysql"
  }
}
```

---

### 4. Run Database Migrations and Seeders

Navigate to the backend directory and set up the database schema:
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

### 5. Start the Development Servers

#### Backend
Start the backend server:
```bash
npm run dev
```

#### Frontend
Navigate to the frontend directory and start the React development server:
```bash
npm start
```

---

## Reset Database

To reset the database, you can undo all migrations and re-run them:
```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

