import React, { useEffect, useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

import "./AroundWorld.css";

import CardEvent from "../../components/card-event/CardEvent";
import { Link } from "react-router-dom";

const AroundWorld = () => {
  const mapRef = useRef(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Créez la carte uniquement si elle n'existe pas déjà.
      const map = L.map("map").setView([45.75, 4.85], 16);
      setMap(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      mapRef.current = map; // Enregistrez la carte dans la référence.
    }
  }, []);

  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/event");
      const fetchedEvent = await response.json();
      setEvents(fetchedEvent);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const markerIcon = L.icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconSize: [25, 41],
    });
    // Ajoutez les marqueurs à la carte en utilisant la variable map
    if (map && events) {
      events.forEach((event, index) => {
        L.marker([event.eventLat, event.eventLon], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<b>${event.eventTitle}</b><br>${event.eventAddress}`)
          .openPopup();
      });
    }
  }, [map, events]);

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
          );
          if (!isNaN(lat) && !isNaN(lon)) {
            mapRef.current.setView([lat, lon], 16);
          } else {
            console.error("Coordonnées invalides.");
          }
        }
      } else {
        setCoordinates(null);
        console.error("Adresse introuvable");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const [eventsToDisplay, setEventsToDisplay] = useState(null);

  const updateEventsToDisplay = () => {
    if (map && events) {
      const bounds = map.getBounds();
      const filteredEvents = events.filter((event) => {
        const eventLatLng = L.latLng(event.eventLat, event.eventLon);
        return bounds.contains(eventLatLng);
      });
      setEventsToDisplay(filteredEvents);
    }
  };

  useEffect(() => {
    if (map) {
      map.on("moveend", updateEventsToDisplay);
    }
  }, [map, events]);

  useEffect(() => {
    updateEventsToDisplay();
  }, [map, events]);

  return (
    <div className="aroundWorldMainContainer">
      <p className="aroundWorldTitle">Des événements partout dans le monde</p>
      <div id="map" className="leaflet-map-around-world"></div>
      <input type="text" value={address} onChange={handleAddressChange} />
      <button onClick={() => handleGoTo()}>Rechercher</button>
      <p className="aroundWorldTitle">Autour de moi</p>
      <div className="aroundWorldCardContainer">
        {eventsToDisplay ? (
          eventsToDisplay.map((event, index) => (
            <Link to={`/${event.eventTitle}`} key={index}>
              <CardEvent
                eventTitle={event.eventTitle}
                eventDate={event.eventDate}
              />
            </Link>
          ))
        ) : (
          <p>No events to display</p>
        )}
      </div>
    </div>
  );
};

export default AroundWorld;
