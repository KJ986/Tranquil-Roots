import { useEffect, useState } from "react";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    category: "Head Spa",
    isActive: true,
  });

  const [serviceMessage, setServiceMessage] = useState("");
  const [isAddingService, setIsAddingService] = useState(false);

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

    const fetchServices = async () => {
      try {
      const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5000/api/services/owner/all",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load services."
          );
        }

        setServices(data.services);
      } catch (error) {
        console.error("Service loading error:", error);
      }
    };

    fetchAllBookings();
    fetchServices();
  }, []);

  const handleServiceChange = (event) => {
    const { name, value, type, checked } = event.target;

    setServiceForm((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddService = async (event) => {
    event.preventDefault();

    try {
      setIsAddingService(true);
      setServiceMessage("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: serviceForm.name,
            description: serviceForm.description,
            duration: Number(serviceForm.duration),
            price: Number(serviceForm.price),
            category: serviceForm.category,
            isActive: serviceForm.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create service."
        );
      }

      setServiceMessage("Service created successfully!");

      setServices((previousServices) => [
        data.service,
        ...previousServices,
      ]);

      setServiceForm({
        name: "",
        description: "",
        duration: "",
        price: "",
        category: "Head Spa",
        isActive: true,
      });
    } catch (error) {
      console.error("Add service error:", error);
      setServiceMessage(error.message);
    } finally {
      setIsAddingService(false);
    }
  };

  const upcomingBookings = bookings.filter(
    (booking) =>
      new Date(booking.appointmentDate) >= new Date()
  );

  const today = new Date().toDateString();

  const todaysBookings = bookings.filter(
    (booking) =>
      new Date(
        booking.appointmentDate
      ).toDateString() === today
  );

const handleToggleService = async (service) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/services/${service._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          isActive: !service.isActive,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Unable to update service."
      );
    }

    setServices((previousServices) =>
      previousServices.map((currentService) =>
        currentService._id === service._id
          ? data.service
          : currentService
      )
    );
  } catch (error) {
    console.error("Service update error:", error);
    alert(error.message);
  }
};


  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="owner-page">
      <section className="owner-hero">
        <p className="owner-eyebrow">
          Tranquil Roots Management
        </p>

        <h1>Owner Dashboard 🌿</h1>

        <p className="owner-subtitle">
          Manage appointments, monitor your schedule, and keep an eye
          on your business activity.
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
              Customer bookings will appear here once appointments are
              created.
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

      <section className="owner-service-management">
        <div className="owner-section-heading">
          <div>
            <p className="owner-eyebrow">
              Service Management
            </p>

            <h2>Current Services</h2>
          </div>

          <p>
            {services.length}{" "}
            {services.length === 1
              ? "service"
              : "services"}
          </p>
        </div>

        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          <div className="owner-service-grid">
            {services.map((service) => (
  <article
    key={service._id}
    className="owner-service-card"
  >
    <p className="owner-eyebrow">
      {service.category}
    </p>

    <h3>{service.name}</h3>

    {/* Shows whether customers can currently book this service */}
    <span
      className={
        service.isActive
          ? "owner-service-status owner-service-status--active"
          : "owner-service-status owner-service-status--inactive"
      }
    >
      {service.isActive ? "Active" : "Inactive"}
    </span>

    <p>{service.description}</p>

    <div className="owner-service-meta">
      <strong>
        {service.duration} min
      </strong>

      <span>•</span>

      <strong>
        ${service.price}
      </strong>
    </div>

    {/* Owner can activate or deactivate this specific service */}
    <button
      type="button"
      className="button button--secondary"
      onClick={() => handleToggleService(service)}
    >
      {service.isActive
        ? "Deactivate Service"
        : "Activate Service"}
    </button>
  </article>
))}
          </div>
        )}

        <div className="owner-section-heading">
          <div>
            <p className="owner-eyebrow">
              Add Service
            </p>

            <h2>Add a New Service</h2>
          </div>
        </div>

        <form
          className="owner-service-form"
          onSubmit={handleAddService}
        >
          <div className="owner-service-form__grid">
            <div className="form-group">
              <label htmlFor="name">
                Service Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={serviceForm.name}
                onChange={handleServiceChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={serviceForm.category}
                onChange={handleServiceChange}
              >
                <option value="Head Spa">
                  Head Spa
                </option>

                <option value="Treatment">
                  Treatment
                </option>

                <option value="Massage">
                  Massage
                </option>

                <option value="Wellness">
                  Wellness
                </option>

                <option value="Scalp Care">
                  Scalp Care
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">
                Duration (minutes)
              </label>

              <input
                id="duration"
                type="number"
                name="duration"
                min="1"
                value={serviceForm.duration}
                onChange={handleServiceChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">
                Price ($)
              </label>

              <input
                id="price"
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={serviceForm.price}
                onChange={handleServiceChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              value={serviceForm.description}
              onChange={handleServiceChange}
              required
            />
          </div>

          <label className="owner-service-active">
            <input
              type="checkbox"
              name="isActive"
              checked={serviceForm.isActive}
              onChange={handleServiceChange}
            />

            Make this service available to customers
          </label>

          {serviceMessage && (
            <p className="owner-service-message">
              {serviceMessage}
            </p>
          )}

          <button
            className="button button--primary"
            type="submit"
            disabled={isAddingService}
          >
            {isAddingService
              ? "Adding Service..."
              : "Add Service"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default OwnerDashboard;