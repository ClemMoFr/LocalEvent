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
        // reload();
      }
      return newUser;
    } catch (error) {
      throw Error("Oups ! Un des champs est manquant ou mal renseigné");
    }
  }

  return (
    <div className="signInMainContainer">
      <div className="signInLogo">LocalEvent.</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await createUser(userName, userMail, password, userRole);
            alert(
              `l'utilisateur à été créer avec ${userName},${userMail},${password},${userRole} `
            );
          } catch (error) {}
        }}
      >
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
        <button className="settingsButton" type="submit">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Signin;
