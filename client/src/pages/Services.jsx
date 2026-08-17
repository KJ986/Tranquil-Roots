import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Services.css";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);

        const data = await response.json();

        setServices(data.services);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
  <main className="services-page">
    <section className="services-hero">
      <p className="services-eyebrow">
        Restore • Relax • Renew
      </p>

      <h1>Our Services</h1>

      <p className="services-subtitle">
        Explore restorative head spa and wellness experiences designed
        to help you slow down, reset, and feel renewed.
      </p>
    </section>

    {services.length === 0 ? (
      <div className="services-empty">
        <h2>No services available yet</h2>
        <p>Please check back soon for new wellness experiences.</p>
      </div>
    ) : (
      <section className="services-grid">
        {services.map((service) => (
          <article
            key={service._id}
            className="service-card"
          >
            <div className="service-card__content">
              <p className="service-card__category">
                {service.category}
              </p>

              <h2>{service.name}</h2>

              <p className="service-card__description">
                {service.description}
              </p>

              <div className="service-card__meta">
                <span>
                  <strong>Duration</strong>
                  {service.duration} min
                </span>

                {service.price && (
                  <span>
                    <strong>Price</strong>
                    ${service.price}
                  </span>
                )}
              </div>

              <Link
                className="button button--primary"
                to={`/services/${service._id}`}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </section>
    )}
  </main>
);
}

export default Services;