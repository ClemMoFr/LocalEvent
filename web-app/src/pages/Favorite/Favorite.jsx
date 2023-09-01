import React from "react";
import CardEvent from "../../components/card-event/CardEvent";

import "./Favorite.css";

const Favorite = () => {
  return (
    <div className="favoriteMainContainer">
      <p className="favoriteTitle">Vos événements favoris</p>
      <div className="favoriteCardMainContainer">
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
        <CardEvent />
      </div>
    </div>
  );
};

export default Favorite;
