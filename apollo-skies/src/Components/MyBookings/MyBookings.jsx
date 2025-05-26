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

  return (
    <div className="bookings-container">
      <style>{`
        .bookings-container {
          max-width: 800px;
          margin: 50px auto;
          padding: 30px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
        }

        .bookings-title {
          font-size: 28px;
          font-weight: 700;
          color: #10375c;
          text-align: center;
          margin-bottom: 30px;
        }

        .bookings-message {
          text-align: center;
          font-size: 18px;
          color: #555;
        }

        .bookings-error {
          color: red;
          font-size: 18px;
          text-align: center;
          margin-bottom: 20px;
        }

        .bookings-list {
          list-style: none;
          padding: 0;
        }

        .booking-item {
          background: #f9f9f9;
          border-left: 4px solid #48a5e1;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          transition: box-shadow 0.3s ease;
        }

        .booking-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .booking-info p {
          margin: 5px 0;
          color: #333;
          font-size: 16px;
        }

        .booking-link {
          display: inline-block;
          margin-top: 10px;
          background-color: #10375c;
          color: #fff;
          padding: 8px 16px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s ease;
        }

        .booking-link:hover {
          background-color: #48a5e1;
        }
      `}</style>

      <h2 className="bookings-title">My Bookings</h2>

      {loading && <p className="bookings-message">Loading bookings...</p>}
      {error && <p className="bookings-error">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="bookings-message">You have no bookings.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <ul className="bookings-list">
          {bookings.map((b, index) => (
            <li key={index} className="booking-item">
              <div className="booking-info">
                <p><strong>Flight:</strong> {b.from_location} → {b.to_location}</p>
                <p>
                  <strong>Date:</strong> {b.date} |{" "}
                  <strong>Departure:</strong> {b.departure} |{" "}
                  <strong>Status:</strong> {b.status}
                </p>
              </div>
              <Link className="booking-link" to={`/booking/${b.flight_id}`}>
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
