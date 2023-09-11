import React, { useState } from "react";
import "./Signup.css";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const userRole = "utilisateur";

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

  async function createUser(userName, userEmail, userPassword, userRole) {
    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName,
          userEmail,
          userPassword,
          userRole,
        }),
      });
      const newUser = await response.json();
      if (!response.ok) {
        throw Error(await response.json());
      } else {
        navigate("/connexion");
      }
      return newUser;
    } catch (error) {
      throw Error("Oups ! Un des champs est manquant ou mal renseigné");
    }
  }

  return (
    <div className="signUpMainContainer">
      <div className="signUpLogo">LocalEvent.</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createUser(userName, userMail, password, userRole);
          } catch (error) {}
        }}
      >
        <p className="title">S'inscrire</p>
        <label>
          <p>votre prénom</p>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          ></input>
        </label>
        <label>
          <p>votre adresse mail</p>
          <input
            value={userMail}
            type="email"
            size="30"
            required
            onChange={(e) => setUserMail(e.target.value)}
          ></input>
        </label>
        <label style={{ position: "relative" }}>
          <p>votre mot de passe</p>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            required
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
            required
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
        <button className="settingsButton" type="submit">
          S'enregistrer
        </button>
        <p className="bottomSentence">
          Déjà inscrit ? <Link to="/connexion">Connectez vous !</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
