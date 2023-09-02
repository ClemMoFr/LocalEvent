import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import "./CardEventDetails.css";

import { events } from "../../config/constant";
import { useParams } from "react-router-dom";

const CardEventDetails = () => {
  const { movieTitle } = useParams(); // Récupérez l'événement correspondant à partir de l'URL
  const event = events.find((event) => event.title === movieTitle);

  const markerIcon = L.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41], // Taille de l'icône du marqueur par défaut
  });

  useEffect(() => {
    if (!event) {
      return; // Si aucun événement n'est trouvé, sortez de l'effet
    }

    // Créez la carte avec la vue centrée sur les coordonnées de l'événement et un zoom approprié
    const map = L.map("map").setView(event.coordonnées, 15);

    // Ajoutez une couche de tuiles OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Ajoutez un marqueur à la position de l'événement avec une popup
    L.marker(event.coordonnées, { icon: markerIcon })
      .addTo(map)
      .bindPopup(`<b>${event.title}</b><br>${event.adresse}`)
      .openPopup();

    // Assurez-vous de supprimer la carte lorsque le composant est démonté
    return () => {
      map.remove();
    };
  }, [event]); // Utilisez [event] comme dépendance pour que l'effet se déclenche lorsque event change

  if (!event) {
    return <div>Aucun événement</div>;
  }
  return (
    <div className="cardEventDetailsMainContainer">
      <div className="cardEventDetailsTop">
        <div
          className="cardEventCover"
          style={{ backgroundImage: `url(${event.cover})` }}
        />
        <div className="cardEventInfos">
          <p className="cardEventTitle">{event.title}</p>
          <p className="cardEventDates">{event.dates}</p>
          <p className="cardEventAdress">{event.adresse}</p>
          <button className="cardEventButtonLinkEvent">
            Lien de l’événement
          </button>
        </div>
      </div>
      <div className="cardEventDetailsDescription">
        <p>Description</p>
        <p className="cardEventDetailsDescriptionTexte">{event.description}</p>
        <div className="cardEventDetailsGradientTexte" />
      </div>
      <div id="map" className="leaflet-map-card-details"></div>
    </div>
  );
};

export default CardEventDetails;
