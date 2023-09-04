import React from "react";

import "./PopupModifySettings.css";

const PopupModifySettings = () => {
  return (
    <div className="popupModifySettingsMainContainer">
      <p className="settingsTitle">Gérer votre profil</p>
      <p className="settingsSubtitle">Edition du profil</p>
      <form>
        <label>
          <p>votre prénom</p>
          <input></input>
        </label>
        <label>
          <p>votre nom</p>
          <input></input>
        </label>
        <label>
          <p>votre adresse mail</p>
          <input></input>
        </label>
        <label>
          <p>votre mot de passe</p>
          <input></input>
        </label>
        <div className="modeContainer">
          <p>Mode :</p>
          <select id="mode">
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
