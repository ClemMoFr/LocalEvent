import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Pour gérer les redirections
import "./Signin.css";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Signin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jwtToken, setJwtToken] = useState(""); // État pour stocker le jeton JWT
  const navigate = useNavigate(); // Pour gérer les redirections

  function reload() {
    window.location.reload(true);
  }

  useEffect(() => {
    // Redirigez l'utilisateur vers une page après une connexion réussie
    if (jwtToken) {
      navigate("/"); // Vous devez avoir une route "/profile" définie dans votre application
      reload();
    }
  }, [jwtToken, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Récupérez le token depuis la réponse
        setJwtToken(token); // Mettez à jour le state avec le token
        localStorage.setItem("jwtToken", token); // Stockez le token dans le localStorage
        setLoginError("");
      } else {
        const errorData = await response.json();
        setJwtToken(""); // Réinitialisez le jeton en cas d'erreur
        setLoginError(errorData.error);
      }
    } catch (error) {
      setJwtToken(""); // Réinitialisez le jeton en cas d'erreur
      setLoginError("Une erreur s'est produite lors de la connexion.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signInMainContainer">
      <div className="signInLogo">LocalEvent.</div>
      <p className="subtitle">
        Connectez-vous pour profitez pleinement de l'application !
      </p>
      <form onSubmit={handleLoginSubmit}>
        <label>
          <p>Adresse email</p>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ position: "relative" }}>
          <p>Mot de passe</p>
          <input
            type={showPassword ? "text" : "password"}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
          <div className="containerEye" onClick={toggleShowPassword}>
            {showPassword ? (
              <BsFillEyeFill className="eyeOpen" />
            ) : (
              <BsFillEyeSlashFill className="eyeClose" />
            )}
          </div>
        </label>
        {loginError && <p className="errorText">{loginError}</p>}
        <button className="settingsButton" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Signin;
