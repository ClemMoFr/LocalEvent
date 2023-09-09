import React, { useState } from "react";
import "./Signin.css";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword === confirmPassword) {
      setError("");
    } else {
      setError("Les mots de passe ne correspondent pas.");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password === newConfirmPassword) {
      setError("");
    } else {
      setError("Les mots de passe ne correspondent pas.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signInMainContainer">
      <div className="signInLogo">LocalEvent.</div>
      <form>
        <label>
          <p>votre prénom</p>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </label>
        <label>
          <p>votre nom</p>
          <input
            value={userSurname}
            onChange={(e) => setUserSurname(e.target.value)}
          ></input>
        </label>
        <label>
          <p>votre adresse mail</p>
          <input
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
          ></input>
        </label>
        <label style={{ position: "relative" }}>
          <p>votre mot de passe</p>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
          ></input>
          <div className="containerEye" onClick={toggleShowPassword}>
            {showPassword ? (
              <BsFillEyeFill className="eyeOpen" />
            ) : (
              <BsFillEyeSlashFill className="eyeClose" />
            )}
          </div>
        </label>
        <label style={{ position: "relative" }}>
          <p>confirmation de mot de passe</p>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          ></input>
          {error && <p className="errorText">{error}</p>}
          <div className="containerEye" onClick={toggleShowConfirmPassword}>
            {showConfirmPassword ? (
              <BsFillEyeFill className="eyeOpen" />
            ) : (
              <BsFillEyeSlashFill className="eyeClose" />
            )}
          </div>
        </label>
        <button className="settingsButton">S'enregistrer</button>
      </form>
    </div>
  );
};

export default Signin;
