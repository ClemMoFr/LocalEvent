import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./AroundWorld.css";

const AroundWorld = () => {
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
    <div className="aroundWorldMainContainer">
      <p className="aroundWorldTitle">Des événements partout dans le monde</p>
      <div id="map" className="leaflet-map-around-world"></div>
    </div>
  );
};

export default AroundWorld;
