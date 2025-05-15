/*
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


export default Booking;*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Booking() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost/web-repo-backend/check_login.php', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsLoggedIn(data.loggedIn);
        if (!data.loggedIn) {
          alert("Please log in to continue booking.");
          navigate('/login'); //nqs useri sesht i loguar e con n login
        }
      });

    //ktu marrim detajet nga fluturimi
    fetch(`http://localhost/web-repo-backend/get_flight_details.php?id=${id}`)
      .then(res => res.json())
      .then(data => setFlight(data))
      .catch(err => console.error('Error:', err));
  }, [id, navigate]);

  if (!flight) return <p>Loading flight details...</p>;

  return (
    <div>
      <h2>Booking for Flight #{flight.flight_code}</h2>
      <p>From: {flight.from_location}</p>
      <p>To: {flight.to_location}</p>
      <p>Date: {flight.date}</p>
      <p>Departure Time: {flight.departure}</p>
      <p>Arrival Time: {flight.arrival}</p>

      {isLoggedIn && (
        <div>
          <h3>Payment</h3>
          <button>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}

export default Booking;
