import React, { useEffect, useState } from "react";

import "./Settings.css";

import { FaUser } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import PopupModifySettings from "../../components/popup-modify-settings/PopupModifySettings";
import Signin from "../Signin/Signin";

const Settings = () => {
  const [statePopupModifyProfil, setStatePopupModifyProfil] = useState(false);
  const [stateWave, setStateWave] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
          setUserRole(userData.userRole);
        } else {
        }
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);
  function upgradeProVersion() {
    setStatePopupModifyProfil(true);
    setStateWave(true);
  }

  const jwtToken = localStorage.getItem("jwtToken");

  return (
    <div className="settingsMainContainer">
      {jwtToken ? (
        <>
          <p className="settingsTitle">Gérer votre profil</p>
          <button
            className="settingsBtnGoEdit"
            onClick={() => setStatePopupModifyProfil(true)}
          >
            <FaUser />
            <p>Editer le profil</p>
            <BsArrowRight />
          </button>
          {userRole === "utilisateur" ? (
            <div
              className="linkProVersion"
              onClick={() => upgradeProVersion(true)}
            >
              Envie d’essayer la version pro ?
              <div className="linkProVersionUnderline" />
            </div>
          ) : (
            ""
          )}

          {statePopupModifyProfil && (
            <PopupModifySettings stateWave={stateWave} />
          )}
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default Settings;
