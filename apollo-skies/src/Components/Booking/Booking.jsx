import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Shto këtë

const Booking = () => {
  const { id } = useParams(); // Merr ID nga URL
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/web-repo-backend/booking.php?flight_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Booking details:", data);
        setBookingDetails(data);
      })
      .catch((err) => console.error("Error fetching booking details:", err));
  }, [id]);

  return (
    <div>
      <h2>Booking Details</h2>
      {bookingDetails.length > 0 ? (
        <div>
          <h3>Flight Information:</h3>
          <ul>
            {bookingDetails.map((booking) => (
              <li key={booking.id}>
                <p>Flight Code: {booking.flight_code}</p>
                <p>From: {booking.from_location}</p>
                <p>To: {booking.to_location}</p>
                <p>Departure: {booking.departure}</p>
                <p>Arrival: {booking.arrival}</p>
                <p>User: {booking.user_name}</p>
                <p>Booking Date: {booking.booking_date}</p>
                <p>Status: {booking.status}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No booking found for this flight.</p>
      )}
    </div>
  );
};

export default Booking;
