# Doctor Appointment Booking App

A full-stack doctor appointment booking application built using **React**, **Node.js**, **Express**, and **MongoDB**. This application includes a user-friendly frontend, a robust backend, an admin panel, and payment gateway integration.

---

## Features

### User Features
- Browse available doctors and their schedules.
- Book appointments with selected doctors.
- Make secure payments via an integrated payment gateway.
- View and manage booked appointments.

### Admin Features
- Manage doctors (add, edit, or delete doctor profiles).
- View and manage all appointments.
- Monitor platform statistics and user activity.

### Additional Features
- Responsive design for mobile and desktop.
- Secure authentication and authorization (JWT).
- Error handling and validation.

---

## Tech Stack

### Frontend
- **React.js** with Tailwind CSS for styling.
- State management using Context API or Redux.

### Backend
- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** for database management.

### Admin Panel
- Built with React.js, with routes protected for admin-only access.

### Payment Gateway
- Integrated with **Razorpay** or **Stripe** for secure transactions.

### Authentication
- User authentication with **JWT** (JSON Web Tokens).
- Password hashing using **bcrypt**.

---

## Setup and Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB installed or access to a MongoDB Atlas cluster.

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/doctor-appointment-app.git
   cd doctor-appointment-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client
   npm install
   cd ../admin
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   ```

4. **Run the application**
   - Start the backend:
     ```bash
     npm start
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```
   - Start the admin panel:
     ```bash
     cd admin
     npm start
     ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3001`

---
