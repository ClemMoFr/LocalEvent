import React from "react";
import { BsArrowRight } from "react-icons/bs";

import "./CardEvent.css";

const CardEvent = () => {
  return (
    <div className="cardEventMainContainer">
      <div className="cardEventImage" />
      <div className="cardEventInfo">
        <p>Les voix du printemps</p>
        <p>Du 15 au 17 juillet 2023</p>
      </div>
      <BsArrowRight className="arrow" />
    </div>
  );
};

export default CardEvent;
