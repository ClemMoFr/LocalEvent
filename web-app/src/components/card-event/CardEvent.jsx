import React from "react";
import { BsArrowRight } from "react-icons/bs";

import "./CardEvent.css";

const CardEvent = ({ eventTitle, eventDate, eventImage }) => {
  return (
    <div className="cardEventMainContainer">
      <div
        className="cardEventImage"
        style={{ backgroundImage: `url(${eventImage})` }}
      />
      <div className="cardEventInfo">
        <p>{eventTitle}</p>
        <p>{eventDate}</p>
      </div>
      <BsArrowRight className="arrow" />
    </div>
  );
};

export default CardEvent;
