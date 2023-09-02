import React from "react";
import { BsArrowRight } from "react-icons/bs";

import "./CardEvent.css";

const CardEvent = ({ eventTitle, eventDate }) => {
  return (
    <div className="cardEventMainContainer">
      <div className="cardEventImage" />
      <div className="cardEventInfo">
        <p>{eventTitle}</p>
        <p>{eventDate}</p>
      </div>
      <BsArrowRight className="arrow" />
    </div>
  );
};

export default CardEvent;
