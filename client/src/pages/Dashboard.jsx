import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                console.log("Saved token:", token);

                const response = await fetch(
                    "http://localhost:5000/api/bookings",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("Bookings response:", data);

                if (!response.ok) {
                    throw new Error(data.message || "Unable to retrieve appointments.");
                }

                setBookings(data.bookings);
            } catch (error) {
                console.error("Dashboard error:", error);
            }
        };

        fetchBookings();
 }, []);

 return (
    
  <main className="dashboard-page">
    <section className="dashboard-hero">
      <p className="dashboard-eyebrow">Your wellness dashboard</p>

      <h1>🍃 Good Afternoon, KJ</h1>

      <p className="dashboard-subtitle">
        Here's your upcoming wellness journey.
      </p>
    </section>

    <section className="dashboard-summary">
      <article className="summary-card">
        <span className="summary-label">Upcoming appointments</span>
        <strong>{bookings.length}</strong>
      </article>

      <article className="summary-card">
        <span className="summary-label">Next appointment</span>

        <strong>
          {bookings.length > 0
            ? new Date(bookings[0].appointmentDate).toLocaleDateString()
            : "None scheduled"}
        </strong>
      </article>

      <article className="summary-card">
        <span className="summary-label">Current status</span>

        <strong className="summary-status">
          {bookings.length > 0 ? bookings[0].status : "No appointment"}
        </strong>
      </article>
    </section>

    <section className="appointments-section">
      <div className="appointments-heading">
        <div>
          <p className="dashboard-eyebrow">Your schedule</p>
          <h2>My Appointments</h2>
        </div>

        <p>
          {bookings.length === 1
            ? "You have 1 upcoming appointment."
            : `You have ${bookings.length} upcoming appointments.`}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-appointments">
          <h3>No appointments yet</h3>
          <p>
            Explore our services and reserve a relaxing experience when
            you're ready.
          </p>
        </div>
      ) : (
        <div className="booking-grid">
          {bookings.map((booking) => (
            <article key={booking._id} className="booking-card">
              <div className="booking-card__top">
                <div>
                  <p className="booking-card__category">
                    {booking.service.category}
                  </p>

                  <h3>{booking.service.name}</h3>
                </div>

                <span
                  className={`status-badge status-badge--${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-card__details">
                <p>
                  <span>Date</span>
                  <strong>
                    {new Date(
                      booking.appointmentDate
                    ).toLocaleDateString()}
                  </strong>
                </p>

                <p>
                  <span>Time</span>
                  <strong>
                    {new Date(
                      booking.appointmentDate
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </strong>
                </p>

                <p>
                  <span>Duration</span>
                  <strong>{booking.service.duration} minutes</strong>
                </p>
              </div>

              <div className="booking-card__contact">
                <h4>Appointment contact</h4>

                <p>
                  {booking.contact.firstName} {booking.contact.lastName}
                </p>

                <p>{booking.contact.email}</p>
                <p>{booking.contact.phone}</p>
              </div>

              {booking.notes && (
                <div className="booking-card__notes">
                  <h4>Notes</h4>
                  <p>{booking.notes}</p>
                </div>
              )}

              <div className="booking-card__actions">
                <button className="button button--secondary" type="button">
                  Edit Appointment
                </button>

                <button className="button button--danger" type="button">
                  Cancel Appointment
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  </main>
);
}
       

export default Dashboard;