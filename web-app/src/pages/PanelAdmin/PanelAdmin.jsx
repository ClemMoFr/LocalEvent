import React, { useEffect, useState } from "react";

import "./PanelAdmin.css";

import CardEvent from "../../components/card-event/CardEvent";
import PopupAddEvent from "../../components/popup-add-event/PopupAddEvent";
import PopupUpdateEvent from "../../components/popup-update-event/PopupUpdateEvent";

const PanelAdmin = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapLoadedUpdate, setIsMapLoadedUpdate] = useState(false);
  const [statePopupAddEvent, setStatePopupAddEvent] = useState(false);
  const [statePopupUpdateEvent, setStatePopupUpdateEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (isMapLoaded) {
      setStatePopupAddEvent(true);
    }
  }, [isMapLoaded]);

  useEffect(() => {
    if (isMapLoadedUpdate) {
      setStatePopupUpdateEvent(true);
    }
  }, [isMapLoadedUpdate]);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  console.log(events);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          return;
        }

        const response = await fetch("http://localhost:4000/user/infos", {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setUserId(userData.id);
        } else {
        }
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchEventUser = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          return;
        }

        const response = await fetch(
          `http://localhost:4000/user/${userId}/event`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData);
          setIsLoading(false);
        } else {
          console.error("Erreur lors de la récupération des événements");
        }
      } catch (error) {
        console.error("Erreur lors de la requête vers l'API", error);
      }
    };

    fetchEventUser();
  }, [userId]);

  return (
    <div className="panelAdminMainContainer">
      <p className="panelAdminTitle">Gérer vos événements</p>
      <button
        className="panelAdminAddEventButton"
        onClick={() => setIsMapLoaded(true)}
      >
        Ajouter un événement
      </button>
      <p>Vos événements</p>
      <div className="panelAdminCardEvent">
        {isLoading ? (
          <p>Loading...</p>
        ) : events && events.length > 0 ? (
          events.map((event, index) => (
            <div
              onClick={() => {
                setSelectedEvent(event);
                setIsMapLoadedUpdate(true);
              }}
            >
              <CardEvent
                eventTitle={event.eventTitle}
                eventDate={event.eventDate}
                eventImage={event.eventImage}
              />
            </div>
          ))
        ) : (
          <p className="noEventMessage">
            Vous n'avez pas encore créé d'événements !
          </p>
        )}
      </div>
      {isMapLoaded && <PopupAddEvent />}
      {isMapLoadedUpdate && (
        <PopupUpdateEvent
          id={selectedEvent.id}
          eventTitleUpdated={selectedEvent.eventTitle}
          eventDateUpdated={selectedEvent.eventDate}
          eventTicketingTitleUpdated={selectedEvent.eventTicketingTitle}
          eventImageUpdated={selectedEvent.eventImage}
          eventDescriptionUpdated={selectedEvent.eventDescription}
          eventAddressUpdated={selectedEvent.eventAddress}
          eventLatUpdated={selectedEvent.eventLat}
          eventLonUpdated={selectedEvent.eventLon}
          eventTypeUpdated={selectedEvent.eventType}
        />
      )}
    </div>
  );
};

export default PanelAdmin;
