import { useEffect, useState } from "react";

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
    <div className="dashboard-page">
        
        <h1>My Appointments</h1>

        {bookings.map((booking) => (
            <div 
            key={booking._id}
            className="booking-card"
            >
                <h2>{booking.service.name}</h2>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                        booking.appointmentDate
                    ).toLocaleDateString()} 
                
                </p>

                <p>
                    <strong>Status</strong>{" "}
                    {booking.status}

                </p>

                <p>
                    <strong>Notes:</strong>{" "}
                    {booking.notes}
                </p>
            </div>

        ))}
         </div>
 );
}
export default Dashboard;