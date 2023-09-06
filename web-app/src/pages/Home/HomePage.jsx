import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./HomePage.css";
import CardEvent from "../../components/card-event/CardEvent";

import { Link } from "react-router-dom";

const HomePage = () => {
  // Déclaration de la variable map en dehors des useEffect
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Créez la carte et définissez-la dans la variable map
    const newMap = L.map("map").setView([45.75, 4.83], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    // Mettez à jour la variable map avec la nouvelle carte
    setMap(newMap);

    return () => {
      // Supprimez la carte lorsque le composant est démonté
      newMap.remove();
    };
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

  return (
    <div className="homePageMainContainer">
      <div id="map" className="leaflet-map"></div>
      <div className="homePageEventContainer">
        <p>Autour de moi</p>
        <div className="homePageCardEvent">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            events.map((event, index) => (
              <Link to={`/${event.eventTitle}`} key={index}>
                <CardEvent
                  eventTitle={event.eventTitle}
                  eventDate={event.eventDate}
                />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
