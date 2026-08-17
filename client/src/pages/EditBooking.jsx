import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Booking.css";

function EditBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    notes: "",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load appointment.");
        }

        setBooking(data.booking);
        

        setFormData({
          firstName: data.booking.contact.firstName,
          lastName: data.booking.contact.lastName,
          email: data.booking.contact.email,
          phone: data.booking.contact.phone,
          appointmentDate: data.booking.appointmentDate
            ? new Date(data.booking.appointmentDate)
                .toISOString()
                .slice(0, 16)
            : "",
          notes: data.booking.notes || "",
        });
      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    };

    fetchBooking();
  }, [bookingId]);

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
      setIsSaving(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
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
          data.message || "Unable to update appointment."
        );
      }

      setMessage("Appointment updated successfully!");
      //navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };


  const getLocalDateTimeMin = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

  if (!booking) {
    return <h2>{message || "Loading appointment..."}</h2>;
  }


return (
  <main className="booking-page">
    <section className="booking-card">
      <div className="booking-card__header">
        <p className="booking-eyebrow">
          Update Your Wellness Experience
        </p>

        <h1>Edit Appointment</h1>

        <p className="booking-subtitle">
          Make any changes you need, then save your updated appointment.
        </p>
      </div>

      <div className="booking-service-summary">
        <div>
          <span>Selected Service</span>
          <h2>{booking.service.name}</h2>
        </div>

        <div className="booking-service-meta">
          <p>
            <strong>Duration</strong>
            {booking.service.duration} minutes
          </p>

          <p>
            <strong>Category</strong>
            {booking.service.category}
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
            placeholder="Update anything you'd like us to know..."
          />
        </div>

        {message && (
          <p className="booking-message">
            {message}
          </p>
        )}

        <div className="service-details__actions">
          <button
            className="button button--primary"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </section>
  </main>
);

}

export default EditBooking;