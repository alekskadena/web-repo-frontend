import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/web-repo-backend/my_bookings.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setBookings(data.data);
          setError(null);
        } else {
          setError(data.message || "Failed to load bookings");
          setBookings([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching bookings: " + err.message);
        setLoading(false);
        setBookings([]);
      });
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (bookings.length === 0) return <p>You have no bookings.</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((b, index) => (
          <li key={index}>
            <strong>Flight:</strong> {b.from_location} → {b.to_location} <br />
            <strong>Date:</strong> {b.date} | <strong>Departure:</strong> {b.departure} | <strong>Status:</strong> {b.status} <br />
            <Link to={`/booking/${b.flight_id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBookings;

