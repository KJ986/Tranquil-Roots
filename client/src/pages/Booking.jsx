import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WellnessTips from "../components/WellnessTips";
import "../styles/Booking.css";

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bookingCreated, setBookingCreated] = useState(false);
const [createdBooking, setCreatedBooking] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services/${serviceId}`
        );

        const data = await response.json();

        

        setService(data.service[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service: serviceId,
            appointmentDate: formData.appointmentDate,
            notes: formData.notes,
            contact: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create appointment."
        );
      }

      setCreatedBooking(data.booking);
      setBookingCreated(true);

    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  if (!service) {
    return <h2>Loading booking information...</h2>;
  }

  if (bookingCreated) {
    return (
      <main className="booking-success">
        <h1>Booking Confirmed! 🌿</h1>

        <p>
          Your {service.name} appointment has been created successfully.
        </p>

       <WellnessTips
         bookingId={createdBooking?._id}
        serviceName={service.name}
        category={service.category}
        notes={formData.notes}
        />

        <button
          className="button button--primary"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          View My Appointments
        </button>
      </main>
    );
  }


const getLocalDateTimeMin = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};



 return (
  <main className="booking-page">
    <section className="booking-card">
      <div className="booking-card__header">
        <p className="booking-eyebrow">
          Reserve Your Wellness Experience
        </p>

        <h1>Book an Appointment</h1>

        <p className="booking-subtitle">
          Complete your appointment details below and begin your
          Tranquil Roots wellness journey.
        </p>
      </div>

      <div className="booking-service-summary">
        <div>
          <span>Selected Service</span>
          <h2>{service.name}</h2>
        </div>

        <div className="booking-service-meta">
          <p>
            <strong>Duration</strong>
            {service.duration} minutes
          </p>

          <p>
            <strong>Category</strong>
            {service.category}
          </p>
        </div>
      </div>

      <form
        className="booking-form"
        onSubmit={handleSubmit}
      >
        <div className="booking-form__grid">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">
            Appointment Date & Time
          </label>

          <input
            id="appointmentDate"
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            min={getLocalDateTimeMin()}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tell us anything you'd like us to know before your appointment..."
          />
        </div>

        {message && (
          <p className="booking-message">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="button button--primary booking-submit"
        >
          Book Appointment
        </button>
      </form>
    </section>
  </main>
);
}

export default Booking;