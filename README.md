 # 🌿 Tranquil Roots

## AI-Powered Head Spa & Wellness Booking Platform

Tranquil Roots is a full-stack appointment and service booking application designed for a modern head spa and wellness business.

The application allows customers to explore wellness services, create an account, book and manage appointments, and receive AI-powered wellness preparation tips related to their selected service.

Tranquil Roots also includes a protected Owner Dashboard that allows the business owner to manage appointments and services.

This project was created as a full-stack software engineering capstone project using React, Node.js, Express, MongoDB, and an integrated AI feature.

---

## ✨ Key Features

### Customer Features

* User registration
* Secure user login
* JWT-based authentication
* Protected customer routes
* Browse available wellness services
* View individual service details
* Book appointments
* Select appointment date and time
* Add customer notes and contact information
* View upcoming appointments
* Update existing bookings
* Cancel bookings
* View appointment status
* Receive AI-powered wellness preparation tips
* Responsive design for desktop, tablet, and mobile devices

### Owner Features

Tranquil Roots includes role-based authorization for the business owner.

The protected Owner Dashboard allows the owner to:

* View all customer appointments
* View customer and service information
* Monitor total, upcoming, and today's appointments
* Change appointment statuses
* Mark appointments as Pending, Confirmed, Completed, or Cancelled
* View all services, including inactive services
* Add new services
* Edit existing services
* Update service names, descriptions, categories, durations, and prices
* Activate services
* Deactivate services without deleting historical data

Owner-only backend routes are protected using authentication and authorization middleware.

---

## 🤖 AI-Powered Wellness Guide

Tranquil Roots includes an AI-powered wellness feature integrated directly into the booking experience.

After booking an appointment, customers can receive personalized wellness preparation tips based on information such as:

* Selected service
* Service category
* Customer booking notes

The application uses Google Gemini API to generate wellness-focused preparation guidance.

The AI feature is designed to provide general wellness guidance and does not provide medical diagnoses or medical treatment instructions of any sort!

### AI Error Handling

The application also handles situations where the external AI service is unavailable or its API quota has been reached.

Instead of breaking the booking experience, Tranquil Roots displays safe fallback wellness tips so the customer can continue using the application normally.

Generated wellness tips can also be stored with booking information so previously generated content does not need to be unnecessarily regenerated.

---

## 🛠️ Technology Stack

### Frontend

* React.js
* React Router
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* REST API architecture
* JSON Web Tokens (JWT)
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose

### Artificial Intelligence

* Google Gemini API
* `@google/genai`

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Postman
* Chrome DevTools
* npm
* Nodemon

---

## 🏗️ Application Architecture

Tranquil Roots follows a three-tier application architecture.

### Presentation Layer

The React frontend handles:

* User interface
* Navigation
* Forms
* Service presentation
* Booking interactions
* Customer Dashboard
* Owner Dashboard
* AI wellness tip presentation

### Application Layer

The Node.js and Express backend handles:

* REST API routes
* Authentication
* Authorization
* Business logic
* Validation
* Error handling
* Booking management
* Service management
* AI API communication

### Data Layer

MongoDB Atlas and Mongoose handle persistent application data.

Primary application entities include:

* Users
* Services
* Bookings

Relationships between users, bookings, and services allow appointments to reference both the customer and the selected service.

---

## 🔐 Authentication and Authorization

Tranquil Roots uses JWT-based authentication.

After successful login, authenticated users receive a JSON Web Token that is used when accessing protected API routes.

The application supports two user roles:

* `customer`
* `owner`

Customers can manage their own bookings.

Owners have additional authorization that provides access to administrative service and appointment management functionality.

Protected backend middleware prevents customers from accessing owner-only API routes.

---

## 📅 Booking Management

Customers can create appointments by selecting an available service and providing booking information.

Bookings contain information such as:

* Customer
* Selected service
* Appointment date and time
* Contact information
* Customer notes
* Appointment status

Customers can view and manage their own bookings from their Dashboard.

Owners can view all bookings from the Owner Dashboard and update appointment statuses.

---

## 🌿 Service Management

Active services are displayed to customers through the public Services area.

The Owner Dashboard provides additional service management capabilities.

Owners can:

* Create services
* Edit services
* Update pricing
* Update duration
* Change categories
* Update descriptions
* Activate services
* Deactivate services

Deactivation is used instead of permanently deleting services when appropriate so historical booking relationships can remain intact.

---

## 📁 Project Structure

```text
tranquil-roots/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

The backend requires environment variables to connect to external services.

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Do **not** commit the `.env` file or real API keys to GitHub.

Make sure `.env` is included in `.gitignore`.

---

## 💻 Local Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd tranquil-roots
```

---

## Backend Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the required `.env` file and add the necessary environment variables.

Start the development server:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal and move into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

## 🧪 Testing

The application was tested throughout development using:

* Postman for REST API testing
* Browser-based end-to-end testing
* Chrome DevTools
* Responsive device testing
* Authentication and authorization testing
* Customer and owner role testing
* AI API error and quota testing

### Customer Workflow Testing

The customer workflow was tested through:

```
Register
→ Login
→ Browse Services
→ View Service Details
→ Book Appointment
→ Receive Wellness Guidance
→ View Dashboard
→ Update Booking
→ Cancel Booking
→ Logout
```

### Owner Workflow Testing

The owner workflow was tested through:

```text
Owner Login
→ Owner Dashboard
→ View Customer Appointments
→ Update Appointment Status
→ Add Service
→ Edit Service
→ Deactivate Service
→ Reactivate Service
→ Verify Customer-Facing Changes
```

Authorization was also tested to ensure regular customers cannot access owner-only functionality.

---

## 📱 Responsive Design

Tranquil Roots was designed to work across desktop, tablet, and mobile screen sizes.

Responsive testing included widths such as:

* 375px
* 430px
* 768px
* Desktop layouts

Navigation, service cards, booking forms, dashboards, and owner-management controls adapt to smaller screen sizes.

---

## 🧠 Use of AI During Development

AI tools were used as development assistants throughout the software development lifecycle.

AI assisted with areas including:


* Debugging frontend and backend errors
* Understanding React concepts
* Building and testing REST API functionality
* Reviewing Express routes and middleware
* Improving UI/UX
* Troubleshooting MongoDB and Mongoose issues
* Developing the AI-powered wellness feature
* Reviewing responsive design
* Testing workflows


All generated or suggested code was reviewed, tested, debugged, and integrated into the final application as part of the development process.

---

## 🚀 Deployment

### Live Application

Deployment link:

```text
TO BE ADDED AFTER DEPLOYMENT
```

### Frontend

Deployment platform:

```text
TO BE ADDED
```

### Backend API

Deployment platform:

```text
TO BE ADDED
```

### Database

MongoDB Atlas

---

## 🔗 GitHub Repository

Repository:

```text
GITHUB REPOSITORY
```

---

## 🔮 Possible Future Enhancements

Potential future improvements could include:

* Email appointment confirmations
* Appointment reminders
* Owner analytics and reporting
* Calendar integration
* Expanded AI wellness recommendations
* Service images managed directly from the Owner Dashboard
* Advanced appointment availability management

---

## 👩🏽‍💻 Project Purpose

Tranquil Roots was developed as a capstone and portfolio project demonstrating full-stack software engineering skills.

The project demonstrates experience with:

* Frontend development
* Backend development
* REST API design
* Database modeling
* Authentication
* Authorization
* CRUD operations
* Responsive web design
* AI API integration
* Error handling
* Testing and debugging
* Git and GitHub
* Full-stack application architecture

---

## 🌿 Tranquil Roots

**Head Spa & Wellness**

A modern wellness booking experience combining thoughtful design, full-stack engineering, and AI-powered customer guidance.
