import { useEffect, useState } from "react";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/bookings/owner/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load appointments."
          );
        }

        setBookings(data.bookings);
      } catch (error) {
        console.error("Owner dashboard error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

const upcomingBookings = bookings.filter(
  (booking) =>
    new Date(booking.appointmentDate) >= new Date()
);

const today = new Date().toDateString();

const todaysBookings = bookings.filter(
  (booking) =>
    new Date(booking.appointmentDate).toDateString() === today
);

  return (
  <main className="owner-page">
    <section className="owner-hero">
      <p className="owner-eyebrow">
        Tranquil Roots Management
      </p>

      <h1>Owner Dashboard 🌿</h1>

      <p className="owner-subtitle">
        Manage appointments, monitor your schedule, and keep an eye on your business activity.
      </p>
    </section>

    <section className="owner-summary">
      <article className="owner-summary-card">
        <span>Total Appointments</span>
        <strong>{bookings.length}</strong>
      </article>

      <article className="owner-summary-card">
        <span>Upcoming</span>
        <strong>{upcomingBookings.length}</strong>
      </article>

      <article className="owner-summary-card">
        <span>Today</span>
        <strong>{todaysBookings.length}</strong>
      </article>
    </section>

    <section className="owner-appointments">
      <div className="owner-section-heading">
        <div>
          <p className="owner-eyebrow">
            Appointment Management
          </p>

          <h2>All Appointments</h2>
        </div>

        <p>
          {bookings.length === 1
            ? "1 appointment total"
            : `${bookings.length} appointments total`}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="owner-empty">
          <h3>No appointments yet</h3>
          <p>
            Customer bookings will appear here once appointments are created.
          </p>
        </div>
      ) : (
        <div className="owner-booking-grid">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="owner-booking-card"
            >
              <div className="owner-booking-card__top">
                <div>
                  <p className="owner-booking-category">
                    {booking.service?.category}
                  </p>

                  <h3>{booking.service?.name}</h3>
                </div>

                <span
                  className={`status-badge status-badge--${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="owner-booking-details">
                <p>
                  <span>Customer</span>
                  <strong>
                    {booking.user?.firstName}{" "}
                    {booking.user?.lastName}
                  </strong>
                </p>

                <p>
                  <span>Email</span>
                  <strong>{booking.user?.email}</strong>
                </p>

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
                  <strong>
                    {booking.service?.duration} minutes
                  </strong>
                </p>
              </div>

              {booking.notes && (
                <div className="owner-booking-notes">
                  <h4>Customer Notes</h4>
                  <p>{booking.notes}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>

    </main>
  );
}

export default OwnerDashboard;