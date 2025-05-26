import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Booking.css';

function Booking() {
  const { flightId } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!flightId) {
      setError("No flight ID provided.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost/web-repo-backend/get_flights_details.php?id=${flightId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        return res.json();
      })
      .then(flightData => {
        if (flightData.error) throw new Error(flightData.error);
        setFlight(flightData);

        return fetch(`http://localhost/web-repo-backend/get_flight_map.php?flight_id=${flightId}`, {
          credentials: 'include',
        });
      })
      .then(res => {
        if (!res.ok) throw new Error(`Map fetch failed with status ${res.status}`);
        return res.json();
      })
      .then(mapInfo => {
        if (mapInfo.error) throw new Error(mapInfo.error);
        setMapData(mapInfo);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [flightId]);

  const handlePayment = () => {
    navigate('/payment', { state: { flight } });
  };

  if (loading) return <p className="booking-loading">Loading flight details...</p>;
  if (error) return <p className="booking-error">Error: {error}</p>;
  if (!flight) return <p className="booking-empty">No flight data found.</p>;

  return (
    <div className="booking-container">
      <h2 className="booking-title">Booking for Flight #{flight.flight_code}</h2>
      <div className="booking-details">
        <p><strong>From:</strong> {flight.from_location}</p>
        <p><strong>To:</strong> {flight.to_location}</p>
        <p><strong>Date:</strong> {flight.date}</p>
        <p><strong>Departure Time:</strong> {flight.departure}</p>
        <p><strong>Arrival Time:</strong> {flight.arrival}</p>
      </div>

      <button className="booking-button" onClick={handlePayment}>
        Proceed to Payment
      </button>

      {mapData && (
        <div className="booking-map">
          <MapContainer
            center={[parseFloat(mapData.from_lat), parseFloat(mapData.from_lng)]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[mapData.from_lat, mapData.from_lng]}>
              <Popup>From: {flight.from_location}</Popup>
            </Marker>
            <Marker position={[mapData.to_lat, mapData.to_lng]}>
              <Popup>To: {flight.to_location}</Popup>
            </Marker>
            <Polyline
              positions={[[mapData.from_lat, mapData.from_lng], [mapData.to_lat, mapData.to_lng]]}
              color="blue"
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default Booking;
