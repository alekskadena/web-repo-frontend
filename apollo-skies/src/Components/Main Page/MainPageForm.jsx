/*import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainPage.css';

const MainPageForm = () => {
  const [tripType, setTripType] = useState('oneway');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [availableDates, setAvailableDates] = useState([]);

  const fetchAvailableDates = async () => {
    if (departure && arrival) {
      const res = await fetch(`http://localhost/web-repo-backend/available_dates.php?from=${departure}&to=${arrival}`);
      const data = await res.json();
      setAvailableDates(data);
    }
  };

  useEffect(() => {
    fetchAvailableDates();
  }, [departure, arrival]);

  const isHighlighted = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.includes(dateStr);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && isHighlighted(date)) {
      return 'highlight-date';
    }
  };

  return (
    <div className="flight-form">
      <h2>Search for Flights</h2>

      <div className="form-row">
        <select onChange={(e) => setDeparture(e.target.value)} value={departure}>
          <option value="">Select Departure</option>
          <option value="Tirana">Tirana</option>
          <option value="Istanbul">Istanbul</option>
        </select>

        <select onChange={(e) => setArrival(e.target.value)} value={arrival}>
          <option value="">Select Arrival</option>
          <option value="Tirana">Tirana</option>
          <option value="Istanbul">Istanbul</option>
        </select>
      </div>

      <div className="form-row radio-buttons">
        <label>
          <input type="radio" value="oneway" checked={tripType === 'oneway'} onChange={() => setTripType('oneway')} />
          One Way
        </label>
        <label>
          <input type="radio" value="return" checked={tripType === 'return'} onChange={() => setTripType('return')} />
          Return
        </label>
      </div>

      <div className="form-row">
        <label>Departure Date:</label>
        <Calendar tileClassName={tileClassName} />
        {tripType === 'return' && (
          <>
            <label>Return Date:</label>
            <Calendar tileClassName={tileClassName} />
          </>
        )}
      </div>

      <div className="form-row">
        <label>Passengers:</label>
        <input type="number" min="1" defaultValue="1" />
      </div>

      <button className="search-button">Search Flights</button>
    </div>
  );
};

export default MainPageForm;

*/

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./MainPage.css";

const MainPageForm = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [locations, setLocations] = useState([]);
  const [tripType, setTripType] = useState("Return");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [flights, setFlights] = useState([]);

//marrim locations nga backend (dbapollo)
  useEffect(() => {
    fetch("http://localhost/web-repo-backend/locations.php")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Error fetching locations:", err));
  }, []);

  
  const handleSearch = () => {
    fetch("http://localhost/web-repo-backend/SearchFlights.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        departure,
        arrival,
        tripType,
        departureDate,
        returnDate,
        passengers,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log("Server response:", data);
        try {
          const jsonData = JSON.parse(data);
          console.log("Flight results:", jsonData);
          setFlights(jsonData);
        } catch (err) {
          console.error("Invalid JSON:", err);
        }
      })
      .catch((err) => console.error("Search error:", err));
  };

  return (
 
    <div className="main-container">
      <div className="search-box">
        <h2>Search for Flights</h2>
        <div className="inputs-row">
          <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
            <option value="">Departure</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>

          <select value={arrival} onChange={(e) => setArrival(e.target.value)}>
            <option value="">Arrival</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="trip-type">
          <input
            type="radio"
            id="one-way"
            value="One Way"
            checked={tripType === "One Way"}
            onChange={() => setTripType("One Way")}
          />
          <label htmlFor="one-way">One Way</label>

          <input
            type="radio"
            id="return"
            value="Return"
            checked={tripType === "Return"}
            onChange={() => setTripType("Return")}
          />
          <label htmlFor="return">Return</label>
        </div>

        <div className="date-fields">
          <label>
            Departure Date:
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </label>

          {tripType === "Return" && (
            <label>
              Return Date:
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </label>
          )}
        </div>

        <div className="passenger-field">
          <label>
            Passengers:
            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </label>
        </div>

        <button onClick={handleSearch}>Search Flights</button>

        {/* Rezultatet e fluturimeve */}
        {flights.length > 0 && (
          <div className="results">
            <h3>Available Flights:</h3>
            <ul>
              {flights.map((f, i) => (
                <li key={i}>
                  {f.from_location} → {f.to_location} on <b>{f.flight_date || "N/A"}</b> at {f.departure}
                  <br />
                  {/* Link për të kaluar te Booking.jsx */}
                  <a href={`/booking/${f.id}`} target="_blank" rel="noopener noreferrer">Book now!</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPageForm;

