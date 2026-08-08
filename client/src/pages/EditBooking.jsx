import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

        const response = await fetch(
          `http://localhost:5000/api/bookings/${bookingId}`,
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

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
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


  if (!booking) {
    return <h2>{message || "Loading appointment..."}</h2>;
  }

  return (
    <main className="edit-booking-page">
      <h1>Edit Appointment</h1>
      <h2>{booking.service.name}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>

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
          <label htmlFor="lastName">Last Name</label>

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
          <label htmlFor="email">Email</label>

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
          <label htmlFor="phone">Phone</label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Date and Time</label>

          <input
            id="appointmentDate"
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>

          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {message && <p>{message}</p>}

        <button
          className="button button--primary"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
}

export default EditBooking;