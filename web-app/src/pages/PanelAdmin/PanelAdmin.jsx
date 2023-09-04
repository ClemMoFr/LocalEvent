import React, { useEffect, useState } from "react";

import "./PanelAdmin.css";

import { events } from "../../config/constant";
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
        {events.map((event, index) => (
          <Link to={`/${event.title}`} key={index}>
            <CardEvent
              eventTitle={event.title}
              eventDate={event.dates}
              eventImage={event.cover}
            />
          </Link>
        ))}
      </div>
      {isMapLoaded && <PopupAddEvent />}
    </div>
  );
};

export default PanelAdmin;
