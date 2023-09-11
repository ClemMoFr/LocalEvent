import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiHelpCircle, BiSolidCameraPlus } from "react-icons/bi";

import imageCompression from "browser-image-compression";

import axios from "axios";

import "./PopupUpdateEvent.css";
import PopupExplicationLink from "../popup-explication-link/PopupExplicationLink";

const PopupUpdateEvent = ({
  id,
  eventTitleUpdated,
  eventDateUpdated,
  eventTicketingTitleUpdated,
  eventImageUpdated,
  eventDescriptionUpdated,
  eventAddressUpdated,
  eventLatUpdated,
  eventLonUpdated,
  eventTypeUpdated,
}) => {
  const [map, setMap] = useState(null);

  const [coordinates, setCoordinates] = useState("");

  console.log(coordinates);
  const [marker, setMarker] = useState(null);
  const markerIcon = L.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [25, 41],
  });

  useEffect(() => {
    const initialMap = L.map("map").setView([45.75, 4.85], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(initialMap);

    const initialCenter = initialMap.getCenter();

    setMap(initialMap);

    return () => {
      initialMap.remove();
    };
  }, []);

  const handleAddressChange = (event) => {
    setAddressUpdatedData(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-coordinates",
        {
          params: {
            address: addressUpdatedData,
          },
        }
      );

      if (response.data.lat && response.data.lon) {
        setCoordinates(
          `Latitude: ${response.data.lat}, Longitude: ${response.data.lon}`
        );
        setEventLatUpdatedData(response.data.lat);
        setEventLonUpdatedData(response.data.lon);

        if (map) {
          map.setView([response.data.lat, response.data.lon], 20, {
            animate: true,
          });
          const center = map.getCenter();

          if (marker) {
            marker.remove();
          }
          const newMarker = L.marker([response.data.lat, response.data.lon], {
            icon: markerIcon,
          }).addTo(map);

          setMarker(newMarker);
        }
      } else {
        setCoordinates("Adresse introuvable");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [eventImage, setEventImage] = useState(null);

  console.log("ceci est selectedImage" + "" + selectedImage);
  console.log("ceci est eventImage" + "" + eventImage);
  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5, // Définissez la taille maximale souhaitée en Mo
          maxWidthOrHeight: 150, // Définissez la largeur ou la hauteur maximale souhaitée
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();

        reader.onload = (e) => {
          setEventImageUpdatedData(e.target.result);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Erreur lors de la compression de l'image :", error);
      }
    }
  };

  const [updatedEvent, setUpdatedEvent] = useState("");

  const [eventTitleUpdatedData, setEventTitleUpdatedData] =
    useState(eventTitleUpdated);

  const [eventDateUpdatedData, setEventDateUpdatedData] =
    useState(eventDateUpdated);

  const [eventTicketingTitleUpdatedData, setEventTicketingTitleUpdatedData] =
    useState(eventTicketingTitleUpdated);

  const [eventImageUpdatedData, setEventImageUpdatedData] =
    useState(eventImageUpdated);

  const [eventDescriptionUpdatedData, setEventDescriptionUpdatedData] =
    useState(eventDescriptionUpdated);

  const [addressUpdatedData, setAddressUpdatedData] =
    useState(eventAddressUpdated);

  const [eventLatUpdatedData, setEventLatUpdatedData] =
    useState(eventLatUpdated);

  const [eventLonUpdatedData, setEventLonUpdatedData] =
    useState(eventLonUpdated);

  const [eventTypeUpdatedData, setEventTypeUpdatedData] =
    useState(eventTypeUpdated);

  const [isFavorite, setIsFavorite] = useState(false);

  const jwtToken = localStorage.getItem("jwtToken");

  async function updateEvent(id) {
    const response = await fetch(`http://localhost:4000/user/event/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        eventTitle: eventTitleUpdatedData,
        eventDate: eventDateUpdatedData,
        eventTicketingTitle: eventTicketingTitleUpdatedData,
        eventImage: eventImageUpdatedData,
        eventDescription: eventDescriptionUpdatedData,
        eventAddress: addressUpdatedData,
        eventType: eventTypeUpdatedData,
        eventLat: eventLatUpdatedData,
        eventLon: eventLonUpdatedData,
        isFavorite: isFavorite,
      }),
    });
    const updatedEventResponse = await response.json();
    setUpdatedEvent(updatedEventResponse);

    return updatedEvent;
  }

  const [popupDelete, setPopupDelete] = useState(false);

  function deleteEvent(id) {
    const response = fetch(`http://localhost:4000/user/event/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((result) => {
      result.json().then(response);
      reload();
    });
  }

  function popupDeleteOpen(e) {
    e.preventDefault();
    setPopupDelete(true);
  }

  function popupDeleteClose(e) {
    e.preventDefault();
    setPopupDelete(false);
  }

  function reload() {
    window.location.reload(true);
  }

  const [popupExplicationLink, setPopupExplicationLink] = useState(false);

  return (
    <form
      className={"popupUpdateEventMainContainer"}
      onSubmit={async (e) => {
        e.preventDefault();
        await updateEvent(id);
        reload();
      }}
    >
      <label className="popupUpdateEventTitle">
        <p>nom de l'événement</p>
        <input
          value={eventTitleUpdatedData}
          onChange={(e) => {
            setEventTitleUpdatedData(e.target.value);
          }}
        ></input>
      </label>
      <div className="popupUpdateEventTopBlock">
        <div className="left">
          <label>
            <p>date</p>
            <input
              value={eventDateUpdatedData}
              onChange={(e) => {
                setEventDateUpdatedData(e.target.value);
              }}
            ></input>
          </label>
          <label>
            <p>
              lien billeterie{" "}
              <span onClick={() => setPopupExplicationLink(true)}>
                <BiHelpCircle
                  style={{
                    color: "#72a6ff",
                    fontSize: "1.6rem",
                    fontWeight: "900",
                    cursor: "pointer",
                  }}
                />
              </span>
            </p>
            <input
              value={eventTicketingTitleUpdatedData}
              onChange={(e) => {
                setEventTicketingTitleUpdatedData(e.target.value);
              }}
              disabled
              style={{ backgroundColor: "#F0F0F0", color: "#A0A0A0" }}
            ></input>
          </label>
        </div>
        <div className="right">
          <p>image</p>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="customFileInputUpdate">
              <BiSolidCameraPlus className="iconCameraPlus" />
            </label>
            <img
              className="imagePreview"
              src={eventImageUpdatedData}
              alt="Prévisualisation"
            />
          </div>
        </div>
      </div>
      <label className="popupUpdateEventDescriptionBlock">
        <p>description</p>
        <textarea
          value={eventDescriptionUpdatedData}
          onChange={(e) => {
            setEventDescriptionUpdatedData(e.target.value);
          }}
        ></textarea>
      </label>
      <div className="popupUpdateEventBottomBlock">
        <label>
          <p>lieu de l’événement</p>
          <div className="popupUpdateEventBottomBlockInputAdressContainer">
            <input
              type="text"
              value={addressUpdatedData}
              onChange={handleAddressChange}
            />
            <p className="btnSearchAdress" onClick={handleSearch}>
              Ok
            </p>
          </div>
        </label>
        <label>
          <p>type</p>
          <select
            id="choix"
            value={eventTypeUpdatedData}
            onChange={(e) => {
              setEventTypeUpdatedData(e.target.value);
            }}
          >
            <option value="spectable">Spectacle</option>
            <option value="evenement-pro">Evénement professionnel</option>
            <option value="manifestation">Manifestation</option>
            <option value="foire">Foire</option>
            <option value="vide-grenier">Vide grenier</option>
            <option value="exposition">Exposition</option>
            <option value="conference">Conférence</option>
            <option value="tournoi-sportif">Tournoi sportif</option>
          </select>
        </label>
      </div>
      <div id="map" className="leaflet-map-popup-update-event"></div>
      <div className="popupUpdateEventButtonContainer">
        <button className="popupUpdateEventButtonModify" type="submit">
          Modifier
        </button>
        <button
          className="popupUpdateEventButtonDelete"
          onClick={(e) => popupDeleteOpen(e)}
        >
          Supprimer
        </button>
      </div>
      {popupDelete && (
        <div className="popupDelete">
          <div className="popupDeleteContainer">
            <p>Etes vous sûr de la suppression ?</p>
            <p>Vous êtes sur le point de supprimer </p>
            <p>{eventTitleUpdated} </p>
            <div className="popupDeleteButtonContainer">
              <button onClick={(e) => popupDeleteClose(e)}>Retour</button>
              <button onClick={() => deleteEvent(id)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
      {popupExplicationLink && (
        <PopupExplicationLink
          popupExplicationLinkFunction={() => setPopupExplicationLink(false)}
        />
      )}
    </form>
  );
};

export default PopupUpdateEvent;
