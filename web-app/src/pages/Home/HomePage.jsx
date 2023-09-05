import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./HomePage.css";
import CardEvent from "../../components/card-event/CardEvent";

import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    const map = L.map("map").setView([45.75, 4.85], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    return () => {
      map.remove();
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
              <Link to={`/${event.title}`} key={index}>
                <CardEvent
                  eventTitle={event.eventTitle}
                  eventDate={event.eventAdress}
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
