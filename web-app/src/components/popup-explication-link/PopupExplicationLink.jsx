import React from "react";

import "./PopupExplicationLink.css";

const PopupExplicationLink = ({ popupExplicationLinkFunction }) => {
  return (
    <div className="popupExplicationLinkMainContainer">
      <div className="popupExplicationLinkContainer">
        <p>Pourquoi la case "lien billeterie" est elle grisé ?</p>
        <p>
          LocalEvent est une application créée pour démontrer des compétences,
          et par conséquent, il est préférable qu'elle ne soit pas utilisée à
          des fins personnelles pour promouvoir d'autres sites, qui pourraient
          potentiellement être malveillants. <br /> Aussi, pour la
          démonstration, tous les événements créés seront redirigés vers
          Google.com.
        </p>
        <button onClick={popupExplicationLinkFunction}>J'ai compris !</button>
      </div>
    </div>
  );
};

export default PopupExplicationLink;
