import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import "./AroundWorld.css";

const AroundWorld = () => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    if (!mapRef.current) {
      // Créez la carte uniquement si elle n'existe pas déjà.
      const map = L.map("map").setView([45.75, 4.85], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map; // Enregistrez la carte dans la référence.
    }
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleGoTo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-coordinates",
        {
          params: {
            address: address,
          },
        }
      );

      if (response.data.lat && response.data.lon) {
        const newCoordinates = [response.data.lat, response.data.lon];
        setCoordinates(newCoordinates);

        if (mapRef.current) {
          const [lat, lon] = newCoordinates.map((coord) =>
            parseFloat(coord.trim())
          ); // Assurez-vous de traiter correctement les coordonnées.

          if (!isNaN(lat) && !isNaN(lon)) {
            mapRef.current.setView([lat, lon], 16);
          } else {
            console.error("Coordonnées invalides.");
          }
        }
      } else {
        setCoordinates(null); // Réinitialiser les coordonnées en cas de réponse invalide.
        console.error("Adresse introuvable");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div className="aroundWorldMainContainer">
      <p className="aroundWorldTitle">Des événements partout dans le monde</p>
      <div id="map" className="leaflet-map-around-world"></div>
      <input type="text" value={address} onChange={handleAddressChange} />
      <button onClick={() => handleGoTo()}>Go To</button>
    </div>
  );
};

export default AroundWorld;
