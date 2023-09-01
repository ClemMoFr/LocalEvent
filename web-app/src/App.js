import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RoutesPaths from "./config/RoutesPaths";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [stateNavbar, setStateNavbar] = useState("home");
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
