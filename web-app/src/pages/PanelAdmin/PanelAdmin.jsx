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

  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/event");
      const fetchedEvent = await response.json();
      setEvents(fetchedEvent);
      setIsLoading(false);
    })();
  }, []);

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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
