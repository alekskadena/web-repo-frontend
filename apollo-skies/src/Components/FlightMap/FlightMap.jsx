import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';

const FlightMap = ({ from, to }) => {
  const positions = [
    [from.lat, from.lng],
    [to.lat, to.lng],
  ];

  return (
    <MapContainer
      center={[ (from.lat + to.lat) / 2, (from.lng + to.lng) / 2 ]}
      zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[from.lat, from.lng]}>
        <Popup>Departure: {from.name}</Popup>
      </Marker>

      <Marker position={[to.lat, to.lng]}>
        <Popup>Arrival: {to.name}</Popup>
      </Marker>

      <Polyline positions={positions} color="blue" />
    </MapContainer>
  );
};

export default FlightMap;