import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./CardEventDetails.css";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useParams } from "react-router-dom";

const CardEventDetails = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Initialisez à false par défaut

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/event");
        const fetchedEvents = await response.json();
        setEvents(fetchedEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { eventTitle } = useParams();
  const event = events.find((event) => event.eventTitle === eventTitle);

  // Mettez à jour isFavorite lorsque event.isFavorite change
  useEffect(() => {
    if (event && event.isFavorite !== undefined) {
      setIsFavorite(event.isFavorite);
    }
  }, [event]);

  useEffect(() => {
    if (event) {
      const map = L.map("map").setView([event.eventLat, event.eventLon], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markerIcon = L.icon({
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        iconSize: [25, 41],
      });

      L.marker([event.eventLat, event.eventLon], { icon: markerIcon })
        .addTo(map)
        .bindPopup(`<b>${event.eventTitle}</b><br>${event.eventAddress}`)
        .openPopup();

      return () => {
        map.remove();
      };
    }
  }, [event]);

  const toggleFavorite = async () => {
    try {
      const updatedEvent = { ...event, isFavorite: !event.isFavorite };
      const response = await fetch(`http://localhost:4000/event/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Erreur lors de la mise à jour de l'événement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement :", error);
    }
  };

  return (
    <div className="cardEventDetailsMainContainer">
      {isLoading ? (
        <p>Loading...</p>
      ) : !event ? (
        <div>Aucun événement trouvé</div>
      ) : (
        <>
          <div className="cardEventDetailsTop">
            <div
              className="cardEventCover"
              style={{ backgroundImage: `url(${event.eventImage})` }}
            />
            <div className="cardEventInfos">
              <p className="cardEventTitle">{event.eventTitle}</p>
              <p className="cardEventDates">{event.eventDate}</p>
              <p className="cardEventAdress">{event.eventAddress}</p>
              <div className="cardEventButtonLinlAndHeartContainer">
                <a
                  href={event.eventTicketingTitle}
                  className="cardEventButtonLinkEvent"
                >
                  Lien de l'événement
                </a>

                {isFavorite ? (
                  <AiFillHeart
                    className="cardEventFavoriteFull"
                    onClick={toggleFavorite}
                  />
                ) : (
                  <AiOutlineHeart
                    className="cardEventFavoriteFull"
                    onClick={toggleFavorite}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="cardEventDetailsDescription">
            <p>Description</p>
            <p className="cardEventDetailsDescriptionTexte">
              {event.eventDescription}
            </p>
            <div className="cardEventDetailsGradientTexte" />
          </div>
          <div id="map" className="leaflet-map-card-details"></div>
        </>
      )}
    </div>
  );
};

export default CardEventDetails;
