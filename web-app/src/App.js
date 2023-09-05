import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPaths from "./config/RoutesPaths";
import Navbar from "./components/navbar/Navbar";

function App() {
  // Vérifie si une valeur existe dans sessionStorage, sinon utilise "home" par défaut
  const initialStateNavbar = sessionStorage.getItem("stateNavbar") || "home";
  const [stateNavbar, setStateNavbar] = useState(initialStateNavbar);

  useEffect(() => {
    // Met à jour sessionStorage chaque fois que l'état change
    sessionStorage.setItem("stateNavbar", stateNavbar);
  }, [stateNavbar]);

  return (
    <BrowserRouter>
      <RoutesPaths />
      <Navbar
        stateNavbar={stateNavbar}
        handleNavHome={() => setStateNavbar("home")}
        handleNavFavorite={() => setStateNavbar("favorite")}
        handleNavSearch={() => setStateNavbar("search")}
        handleNavPanel={() => setStateNavbar("panel")}
        handleNavSetting={() => setStateNavbar("settings")}
      />
    </BrowserRouter>
  );
}

export default App;
