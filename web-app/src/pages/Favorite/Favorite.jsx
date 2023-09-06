import React, { useEffect, useState } from "react";
import CardEvent from "../../components/card-event/CardEvent";
import "./Favorite.css";
import { Link } from "react-router-dom";

const Favorite = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:4000/event");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const fetchedEvent = await response.json();
        setEvents(fetchedEvent);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    })();
  }, []);

  // Vérifiez si events est null ou vide avant de le mapper
  const favoriteEvents = events.filter((event) => event.isFavorite === true);

  return (
    <div className="favoriteMainContainer">
      <p className="favoriteTitle">Vos événements favoris</p>
      <div className="favoriteCardMainContainer">
        {isLoading ? (
          <p>Loading...</p>
        ) : favoriteEvents.length === 0 ? (
          <p>Vous n'avez pas encore de favoris</p>
        ) : (
          favoriteEvents.map((event, index) => (
            <Link to={`/${event.eventTitle}`} key={index}>
              <CardEvent
                eventTitle={event.eventTitle}
                eventDate={event.eventDate}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
