import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerDashboard from "./pages/OwnerDashboard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ServiceDetails from "./pages/ServiceDetails";
import EditBooking from "./pages/EditBooking";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/services" element={<Services />} />

          <Route
            path="/services/:id"
            element={<ServiceDetails />}
          />

          <Route
            path="/book/:serviceId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings/:bookingId/edit"
            element={
              <ProtectedRoute>
                <EditBooking />
              </ProtectedRoute>
            }
          />

          <Route
        path="/owner"
          element={
          <ProtectedRoute>
          <OwnerDashboard />
          </ProtectedRoute>
          }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;