import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Signin = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();

  function reload() {
    window.location.reload(true);
  }

  useEffect(() => {
    if (jwtToken) {
      navigate("/");
      sessionStorage.setItem("stateNavbar", "home");
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
        const token = data.token;
        setJwtToken(token);
        localStorage.setItem("jwtToken", token);
        setLoginError("");
      } else {
        const errorData = await response.json();
        setJwtToken("");
        setLoginError(errorData.error);
      }
    } catch (error) {
      setJwtToken("");
      setLoginError("Une erreur s'est produite lors de la connexion.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signInMainContainer">
      <div className="signInLogo">LocalEvent.</div>
      <form onSubmit={handleLoginSubmit}>
        <p className="title">Se connecter</p>
        <label>
          <p>Adresse email</p>
          <input
            type="email"
            id="email"
            value={userEmail}
            placeholder="Ex : dmartin@mail.com"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </label>
        <label style={{ position: "relative" }}>
          <p>Mot de passe</p>
          <input
            type={showPassword ? "text" : "password"}
            value={userPassword}
            placeholder="............"
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
        <p className="bottomSentence">
          Pas encore inscrit ?{" "}
          <Link to="/inscription">Créer votre compte !</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
