import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

        console.log(data);

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
    <div className="service-details">

      <h1>{service.name}</h1>

      <p>{service.description}</p>

      <p>
        <strong>Duration:</strong> {service.duration} minutes
      </p>

      <p>
        <strong>Category:</strong> {service.category}
      </p>

    </div>
  );
}

export default ServiceDetails;