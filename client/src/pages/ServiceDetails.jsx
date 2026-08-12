import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/ServiceDetails.css"

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/services/${id}`
        );

        const data = await response.json();

        

    setService(data.service[0]);

      } catch (error) {
        console.error(error);
      }
    };

    fetchService();

  }, [id]);

  if (!service) {
    return <h2>Loading...</h2>;
  }

 return (
  <main className="service-details-page">
    <section className="service-details-card">
      <div className="service-details__intro">
        <p className="service-details__eyebrow">
          {service.category}
        </p>

        <h1>{service.name}</h1>

        <p className="service-details__description">
          {service.description}
        </p>
      </div>

      <div className="service-details__meta">
        <div>
          <span>Duration</span>
          <strong>{service.duration} minutes</strong>
        </div>

        {service.price && (
          <div>
            <span>Price</span>
            <strong>${service.price}</strong>
          </div>
        )}

        <div>
          <span>Category</span>
          <strong>{service.category}</strong>
        </div>
      </div>

      <div className="service-details__actions">
        <Link
          className="button button--primary"
          to={`/book/${service._id}`}
        >
          Book Appointment
        </Link>

        <Link
          className="button button--secondary"
          to="/services"
        >
          Back to Services
        </Link>
      </div>
    </section>
  </main>
);
}

export default ServiceDetails;