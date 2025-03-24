'use client'

import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


export default function LeafletMap ({ latitude, longitude }) {
  const [address, setAddress] = useState("");

  useState(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
        );
        const data = await response.json();
        setAddress(data.display_name || "Endereço não encontrado");
      } catch (error) {
        console.log(error);
        setAddress("Erro ao buscar endereço");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);
  
  return (
    <div>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
      <p className="mt-4">Endereço: {address}</p>
    </div>
  );
};