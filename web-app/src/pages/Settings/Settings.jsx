import React, { useState } from "react";

import "./Settings.css";

import { FaUser } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import PopupModifySettings from "../../components/popup-modify-settings/PopupModifySettings";

const Settings = () => {
  const [statePopupModifyProfil, setStatePopupModifyProfil] = useState(false);
  return (
    <div className="settingsMainContainer">
      <p className="settingsTitle">Gérer votre profil</p>
      <button
        className="settingsBtnGoEdit"
        onClick={() => setStatePopupModifyProfil(true)}
      >
        <FaUser />
        <p>Editer le profil</p>
        <BsArrowRight />
      </button>
      <p className="linkProVersion">
        Envie d’essayer la version pro ?{" "}
        <div className="linkProVersionUnderline" />
      </p>
      {statePopupModifyProfil && <PopupModifySettings />}
    </div>
  );
};

export default Settings;
