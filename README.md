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

MongoDB Atlas and Mongoose handle application data.

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

AI assisted with:


* Debugging frontend and backend errors
* Understanding React concepts
* Building and testing REST API functionality
* Reviewing Express routes and middleware
* Improving UI/UX
* Troubleshooting MongoDB and Mongoose issues
* Developing the AI-powered wellness feature
* Reviewing responsive design
* Testing workflows

---

## 🚀 Deployment

### Live Application

Tranquil Roots is available at:


```text
https://tranquil-roots.vercel.app

```

### Frontend
The React/Vite frontend is deployed using Vercel.

**Platform:** Vercel

**Production URL:**  
https://tranquil-roots.vercel.app

The production frontend communicates with the deployed REST API using the `VITE_API_URL` environment variable.

### Backend API

The Node.js and Express REST API is deployed using Render.

**Platform:** Render

**API URL:**  
https://tranquil-roots-api.onrender.com

The production backend connects to MongoDB Atlas and manages authentication, services, bookings, owner functionality, and AI integration.

### Database

MongoDB Atlas
**Platform:** MongoDB Atlas

MongoDB Atlas provides the production database for:

- Users
- Services
- Bookings

---



## 🔮 Possible Future Enhancements

Potential future improvements could include:

* Email appointment confirmations
* Appointment reminders
* Owner analytics and reporting
* Expanded AI wellness recommendations
* Service images managed directly from the Owner Dashboard
* Advanced appointment availability management

---

```
## 🔗 GitHub Repository

The complete source code for Tranquil Roots is available on GitHub:
https://github.com/KJ986/Tranquil-Roots


## 💻 Running the Project Locally

### Prerequisites

Before running Tranquil Roots locally, make sure you have:

- Node.js
- npm
- MongoDB Atlas access
- A Google Gemini API key

### Clone the Repository

```bash
git clone YOUR-GITHUB-REPOSITORY-URL
cd tranquil-roots
```

### Install Backend Dependencies

```bash
cd server
npm install
```

Create the required `server/.env` file, then start the backend:

```bash
npm run dev
```

The development API runs on:

```text
http://localhost:5000
```

### Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The Vite development server typically runs on:

```text
http://localhost:5173
```

The frontend communicates with the backend through the `VITE_API_URL` environment variable.