import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./HomePage.css";
import CardEvent from "../../components/card-event/CardEvent";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [map, setMap] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEventType, setSelectedEventType] = useState("Tous");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [markers, setMarkers] = useState([]); // État pour stocker les marqueurs sur la carte

  useEffect(() => {
    const newMap = L.map("map").setView([45.75, 4.83], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    setMap(newMap);

    newMap.removeControl(newMap.zoomControl);

    const zoomControl = L.control.zoom({ position: "bottomright" });
    zoomControl.addTo(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/event");
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const markerIcon = L.icon({
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      iconSize: [25, 41],
    });

    if (map && events) {
      markers.forEach((marker) => {
        map.removeLayer(marker);
      });

      const filteredMarkers = events
        .filter(
          (event) =>
            selectedEventType === "Tous" ||
            event.eventType === selectedEventType
        )
        .map((event) => {
          const marker = L.marker([event.eventLat, event.eventLon], {
            icon: markerIcon,
          })
            .bindPopup(
              `<div class="popup-content">
              <img class="popup-image" src="${event.eventImage}" alt="${
                event.eventTitle
              }" />
              <div class="popup-text">
                <b>${event.eventTitle}</b><br>${event.eventAddress}<br>
                <a href="/${encodeURIComponent(
                  event.eventTitle
                )}">Voir détails</a>
              </div>
            </div>`
            )
            .addTo(map);
          return marker;
        });

      setMarkers(filteredMarkers);
    }
  }, [map, events, selectedEventType]);

  const updateEventsToDisplay = () => {
    if (map) {
      const bounds = map.getBounds();
      const filtered = events.filter((event) => {
        const eventLatLng = L.latLng(event.eventLat, event.eventLon);
        return bounds.contains(eventLatLng);
      });
      setFilteredEvents(filtered);
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

  const filterEventsByType = (eventType) => {
    setSelectedEventType(eventType);
    if (eventType === "Tous") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.eventType === eventType);
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="homePageMainContainer">
      <div className="filterContainer">
        <p
          onClick={() => filterEventsByType("Tous")}
          className={selectedEventType === "Tous" ? "selected" : "notSelected"}
        >
          Tous
        </p>
        <p
          onClick={() => filterEventsByType("Spectacle")}
          className={
            selectedEventType === "Spectacle" ? "selected" : "notSelected"
          }
        >
          Spectacle
        </p>
        <p
          onClick={() => filterEventsByType("Evénement professionnel")}
          className={
            selectedEventType === "Evénement professionnel"
              ? "selected"
              : "notSelected"
          }
        >
          Evénement professionnel
        </p>
        <p
          onClick={() => filterEventsByType("Manifestation")}
          className={
            selectedEventType === "Manifestation" ? "selected" : "notSelected"
          }
        >
          Manifestation
        </p>
        <p
          onClick={() => filterEventsByType("Foire")}
          className={selectedEventType === "Foire" ? "selected" : "notSelected"}
        >
          Foire
        </p>
        <p
          onClick={() => filterEventsByType("Vide grenier")}
          className={
            selectedEventType === "Vide grenier" ? "selected" : "notSelected"
          }
        >
          Vide grenier
        </p>
        <p
          onClick={() => filterEventsByType("Exposition")}
          className={
            selectedEventType === "Exposition" ? "selected" : "notSelected"
          }
        >
          Exposition
        </p>
        <p
          onClick={() => filterEventsByType("Conférence")}
          className={
            selectedEventType === "Conférence" ? "selected" : "notSelected"
          }
        >
          Conférence
        </p>
        <p
          onClick={() => filterEventsByType("Tournoi sportif")}
          className={
            selectedEventType === "Tournoi sportif" ? "selected" : "notSelected"
          }
        >
          Tournoi sportif
        </p>
      </div>
      <div id="map" className="leaflet-map"></div>
      <div className="homePageEventContainer">
        <p>Autour de moi</p>
        <div className="homePageCardEvent">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Link to={`/${event.eventTitle}`} key={index}>
                <CardEvent
                  eventTitle={event.eventTitle}
                  eventDate={event.eventDate}
                  eventImage={event.eventImage}
                />
              </Link>
            ))
          ) : (
            <p>Aucun événement à afficher</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
