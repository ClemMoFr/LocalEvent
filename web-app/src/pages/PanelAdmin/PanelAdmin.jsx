import React, { useEffect, useState } from "react";

import "./PanelAdmin.css";

import { Link } from "react-router-dom";
import CardEvent from "../../components/card-event/CardEvent";
import PopupAddEvent from "../../components/popup-add-event/PopupAddEvent";

const PanelAdmin = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [statePopupAddEvent, setStatePopupAddEvent] = useState(false);

  useEffect(() => {
    if (isMapLoaded) {
      setStatePopupAddEvent(true);
    }
  }, [isMapLoaded]);

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
    <div className="panelAdminMainContainer">
      <p className="panelAdminTitle">Gérer vos événements</p>
      <button
        className="panelAdminAddEventButton"
        onClick={() => setIsMapLoaded(true)}
      >
        Ajouter un événement
      </button>
      <div className="panelAdminCardEvent">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          events.map((event, index) => (
            <Link to={`/${event.eventTitle}`} key={index}>
              <CardEvent
                eventTitle={event.eventTitle}
                eventDate={event.eventDate}
                eventImage={event.eventImage}
              />
            </Link>
          ))
        )}
      </div>
      {isMapLoaded && <PopupAddEvent />}
    </div>
  );
};

export default PanelAdmin;
