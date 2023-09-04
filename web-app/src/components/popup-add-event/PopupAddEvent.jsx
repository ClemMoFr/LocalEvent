import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BiSolidCameraPlus } from "react-icons/bi";

import axios from "axios";

import "./PopupAddEvent.css";

const PopupAddEvent = () => {
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState("");
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <form className={"popupAddEventMainContainerOn"}>
      <label className="popupAddEventTitle">
        <p>nom de l'événement</p>
        <input></input>
      </label>
      <div className="popupAddEventTopBlock">
        <div className="left">
          <label>
            <p>date</p>
            <input></input>
          </label>
          <label>
            <p>lien billeterie</p>
            <input></input>
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
            {selectedImage && (
              <img
                className="imagePreview"
                src={selectedImage}
                alt="Prévisualisation"
              />
            )}
          </div>
        </div>
      </div>
      <label className="popupAddEventDescriptionBlock">
        <p>description</p>
        <textarea></textarea>
      </label>
      <div className="popupAddEventBottomBlock">
        <label>
          <p>lieu de l’événement</p>
          <div className="popupAddEventBottomBlockInputAdressContainer">
            <input type="text" value={address} onChange={handleAddressChange} />
            <p className="btnSearchAdress" onClick={handleSearch}>
              Ok
            </p>
          </div>
        </label>
        <label>
          <p>type</p>
          <select id="choix">
            <option value="choix1">Choix 1</option>
            <option value="choix2">Choix 2</option>
            <option value="choix3">Choix 3</option>
            <option value="choix4">Choix 4</option>
          </select>
        </label>
      </div>
      <div id="map" className="leaflet-map-popup-add-event"></div>
      <button className="popupAddEventBtnAddEvent">Ajouter l'événement</button>
    </form>
  );
};

export default PopupAddEvent;
