import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiSolidCameraPlus, BiHelpCircle } from "react-icons/bi";

import imageCompression from "browser-image-compression";

import axios from "axios";

import "./PopupAddEvent.css";
import PopupExplicationLink from "../popup-explication-link/PopupExplicationLink";

const PopupAddEvent = () => {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");
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
    setAddress(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-coordinates",
        {
          params: {
            address: address,
          },
        }
      );

      if (response.data.lat && response.data.lon) {
        setCoordinates(
          `Latitude: ${response.data.lat}, Longitude: ${response.data.lon}`
        );
        setEventLat(response.data.lat);
        setEventLon(response.data.lon);

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

  console.log(selectedImage);
  console.log(eventImage);
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
          setEventImage(e.target.result);
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Erreur lors de la compression de l'image :", error);
      }
    }
  };

  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTicketingTitle, setEventTicketingTitle] = useState(
    "https://www.google.com/"
  );

  const [eventDescription, setEventDescription] = useState("");
  const [eventLat, setEventLat] = useState("");
  const [eventLon, setEventLon] = useState("");
  const [eventType, setEventType] = useState("Spectacle");
  const [isFavorite, setIsFavorite] = useState(false);

  console.log("Titre de l'événement" + eventTitle);
  console.log("Date de l'événement" + eventDate);
  console.log("Lien de l'événement" + eventTicketingTitle);
  console.log("Image de l'événement" + eventImage);

  console.log("Ceci est le state de la latitute" + eventLat);
  console.log("Ceci est le state de la longitude" + eventLon);

  function reload() {
    window.location.reload(true);
  }

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");

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

  async function createEvent(
    eventTitle,
    eventDate,
    eventTicketingTitle,
    eventImage,
    eventDescription,
    eventAddress,
    eventType,
    eventLat,
    eventLon,
    isFavorite
  ) {
    try {
      const eventData = {
        eventTitle,
        eventDate,
        eventTicketingTitle,
        eventImage,
        eventDescription,
        eventAddress,
        eventType,
        eventLat,
        eventLon,
        isFavorite,
      };

      const response = await fetch(`http://localhost:4000/user/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ eventData }),
      });

      const newEvent = await response.json();
      if (!response.ok) {
        throw Error(await response.json());
      } else {
        reload();
      }
      return newEvent;
    } catch (error) {
      throw Error("Oups ! Un des champs est manquant ou mal renseigné");
    }
  }

  const [popupExplicationLink, setPopupExplicationLink] = useState(false);

  return (
    <form
      className={"popupAddEventMainContainer"}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await createEvent(
            eventTitle,
            eventDate,
            eventTicketingTitle,
            eventImage,
            eventDescription,
            address,
            eventType,
            eventLat,
            eventLon,
            isFavorite
          );
        } catch (error) {}
      }}
    >
      <label className="popupAddEventTitle">
        <p>nom de l'événement</p>
        <input
          value={eventTitle}
          onChange={(e) => {
            setEventTitle(e.target.value);
          }}
          placeholder="ex : Braderie rue Victor Hugo"
        ></input>
      </label>
      <div className="popupAddEventTopBlock">
        <div className="left">
          <label>
            <p>date</p>
            <input
              value={eventDate}
              onChange={(e) => {
                setEventDate(e.target.value);
              }}
              placeholder="Ex : Du 16 au 18 septembre 2023"
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
              value={eventTicketingTitle}
              onChange={(e) => {
                setEventTicketingTitle(e.target.value);
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
            <label htmlFor="fileInput" className="customFileInput">
              <BiSolidCameraPlus className="iconCameraPlus" />
            </label>
            {eventImage && (
              <img
                className="imagePreview"
                src={eventImage}
                alt="Prévisualisation"
              />
            )}{" "}
          </div>
        </div>
      </div>
      <label className="popupAddEventDescriptionBlock">
        <p>description</p>
        <textarea
          value={eventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
          placeholder="Ex : Description de votre événement"
        ></textarea>
      </label>
      <div className="popupAddEventBottomBlock">
        <label>
          <p>lieu de l’événement</p>
          <div className="popupAddEventBottomBlockInputAdressContainer">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Ex : 30 rue Victor Hugo, Lyon"
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
            value={eventType}
            onChange={(e) => {
              setEventType(e.target.value);
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
      <div id="map" className="leaflet-map-popup-add-event"></div>
      <button className="popupAddEventBtnAddEvent" type="submit">
        Ajouter l'événement
      </button>
      {popupExplicationLink && (
        <PopupExplicationLink
          popupExplicationLinkFunction={() => setPopupExplicationLink(false)}
        />
      )}
    </form>
  );
};

export default PopupAddEvent;
