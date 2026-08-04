import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/services"
        );

        const data = await response.json();

        setServices(data.services);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <h1>Our Services</h1>

      {services.map((service) => (
        <div key={service._id} className="service-card">
          <h2>{service.name}</h2>

          <p>{service.description}</p>

          <p>
            <strong>Duration:</strong> {service.duration} minutes
          </p>

          <p>
            <strong>Category:</strong> {service.category}
          </p>

          <Link
            className="button button--primary"
            to={`/services/${service._id}`}
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Services;