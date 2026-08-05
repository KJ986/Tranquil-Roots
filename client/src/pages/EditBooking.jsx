import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditBooking() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);

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

        console.log(data);

        setBooking(data.booking);

      } catch (error) {
        console.error(error);
      }
    };

    fetchBooking();

  }, [bookingId]);

  if (!booking) {
    return <h2>Loading appointment...</h2>;
  }

  return (
    <main>
      <h1>Edit Appointment</h1>

      <h2>{booking.service.name}</h2>

      <p>
        Date:
        {" "}
        {new Date(
          booking.appointmentDate
        ).toLocaleDateString()}
      </p>

      <p>
        {booking.contact.firstName}{" "}
        {booking.contact.lastName}
      </p>

      <p>{booking.contact.email}</p>

      <p>{booking.contact.phone}</p>

      <p>{booking.notes}</p>
    </main>
  );
}

export default EditBooking;