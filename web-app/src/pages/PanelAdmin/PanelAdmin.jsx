import React from "react";

import "./PanelAdmin.css";

import { events } from "../../config/constant";
import { Link } from "react-router-dom";
import CardEvent from "../../components/card-event/CardEvent";

const PanelAdmin = () => {
  return (
    <div className="panelAdminMainContainer">
      <p className="panelAdminTitle">Gérer vos événements</p>
      <button className="panelAdminAddEventButton">Ajouter un événement</button>
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
    </div>
  );
};

export default PanelAdmin;
