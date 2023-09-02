import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./HomePage.css";
import CardEvent from "../../components/card-event/CardEvent";
import { events } from "../../config/constant";
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

  return (
    <div className="homePageMainContainer">
      <div id="map" className="leaflet-map"></div>
      <div className="homePageEventContainer">
        <p>Autour de moi</p>
        <div className="homePageCardEvent">
          {events.map((event, index) => (
            <Link to={`/${event.title}`} key={index}>
              <CardEvent eventTitle={event.title} eventDate={event.dates} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
