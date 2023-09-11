import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    return element;
  } else {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/connexion" />;
  }
};

export default ProtectedRoutes;
