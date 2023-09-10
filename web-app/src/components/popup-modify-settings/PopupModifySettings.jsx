import React, { useEffect, useState } from "react";

import "./PopupModifySettings.css";
import { useNavigate } from "react-router-dom";

const PopupModifySettings = ({ stateWave }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [updatedUser, setUpdatedUser] = useState("");
  const [userNameUpdatedData, setUserNameUpdatedData] = useState(null);
  const [userEmailUpdatedData, setUserEmailUpdatedData] = useState(null);
  const [userPasswordUpdatedData, setUserPasswordUpdatedData] = useState(null);
  const [userRoleUpdatedData, setUserRoleUpdatedData] = useState(null);

  const jwtToken = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

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
          setUserNameUpdatedData(userData.userName);
          setUserEmailUpdatedData(userData.userEmail);
          setUserPasswordUpdatedData(userData.userPassword);
          setUserRoleUpdatedData(userData.userRole);
        } else {
        }
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  function reload() {
    window.location.reload(true);
  }

  async function updateUser() {
    try {
      const response = await fetch(`http://localhost:4000/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          userName: userNameUpdatedData,
          userEmail: userEmailUpdatedData,
          userPassword: userPasswordUpdatedData,
          userRole: userRoleUpdatedData,
        }),
      });

      if (response.ok) {
        const updatedEventResponse = await response.json();
        setUpdatedUser(updatedEventResponse);
        sessionStorage.setItem("stateNavbar", "home");
        navigate("/");
        reload();
      } else {
        // Gérez les erreurs ici si nécessaire
      }
    } catch (error) {
      // Gérez les erreurs ici
    }
  }

  return (
    <div className="popupModifySettingsMainContainer">
      <p className="settingsTitle">Gérer votre profil</p>
      <p className="settingsSubtitle">Edition du profil</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await updateUser();
        }}
      >
        <label>
          <p>votre prénom</p>
          <input
            value={userNameUpdatedData}
            onChange={(e) => {
              setUserNameUpdatedData(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <p>votre adresse mail</p>
          <input
            value={userEmailUpdatedData}
            onChange={(e) => {
              setUserEmailUpdatedData(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <p>votre mot de passe</p>
          <input
            value={userPasswordUpdatedData}
            onChange={(e) => {
              setUserPasswordUpdatedData(e.target.value);
            }}
          ></input>
        </label>
        <div className="modeContainer">
          <div
            class={
              stateWave === true ? "wave-pulse-active" : "wave-pulse-not-active"
            }
          ></div>
          <p>Mode :</p>
          <select
            id="mode"
            value={userRoleUpdatedData}
            onChange={(e) => {
              setUserRoleUpdatedData(e.target.value);
            }}
          >
            <option value="utilisateur">Utilisateur</option>
            <option value="administrateur">Administrateur</option>
          </select>
        </div>

        <button className="settingsButton">Modifier</button>
      </form>
    </div>
  );
};

export default PopupModifySettings;
