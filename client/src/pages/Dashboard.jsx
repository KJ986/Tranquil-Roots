import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import WellnessTips from "../components/WellnessTips";


function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");

                    // Fetch logged-in user
                    const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`
,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

const userData = await userResponse.json();


if (!userResponse.ok) {
  throw new Error(
    userData.message || "Unable to load user."
  );
}

setUser(userData.user);

                

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );



                const data = await response.json();

                

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


const handleCancelBooking = async (bookingId, serviceName) => {
  const userConfirmed = window.confirm(
    `Are you sure you want to cancel your ${serviceName} appointment?`
  );

  if (!userConfirmed) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/${bookingsId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to cancel appointment."
      );
    }

    setBookings((previousBookings) =>
      previousBookings.filter(
        (booking) => booking._id !== bookingId
      )
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
};


 return (
    
  <main className="dashboard-page">
    <section className="dashboard-hero">
      <p className="dashboard-eyebrow">Your wellness dashboard</p>

      <h1>🍃 {getGreeting()}, {user?.firstName || "Guest"} </h1>

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

              <WellnessTips
              bookingId={booking._id}
              serviceName={booking.service.name}
              category={booking.service.category}
              notes={booking.notes}
              />

              <div className="booking-card__actions">
                <Link
                className="button button--secondary"
                to={`/bookings/${booking._id}/edit`}
                >
                    Edit Appointment
                </Link>


<button
  className="button button--danger"
  type="button"
  onClick={() =>
    handleCancelBooking(
      booking._id,
      booking.service.name
    )
  }
>
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