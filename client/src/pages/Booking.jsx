import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Booking() {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/services/${serviceId}`
        );

        const data = await response.json();

        console.log(data);

        setService(data.service[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service) {
    return <h2>Loading booking information...</h2>;
  }

  return (
    <div className="booking-page">
      <h1>Book an Appointment</h1>

      <h2>{service.name}</h2>

      <p>
        <strong>Duration:</strong> {service.duration} minutes
      </p>

      <p>
        <strong>Category:</strong> {service.category}
      </p>
    </div>
  );
}

export default Booking;