import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Favorite from "../pages/Favorite/Favorite";
import AroundWorld from "../pages/AroundWorld/AroundWorld";
import CardEventDetails from "../components/card-event-details/CardEventDetails";
import PanelAdmin from "../pages/PanelAdmin/PanelAdmin";
import Settings from "../pages/Settings/Settings";
import Signin from "../pages/Signin/Signin";

const RoutesPaths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/favoris" element={<Favorite />}></Route>
      <Route path="/autour-du-monde" element={<AroundWorld />}></Route>
      <Route path="/:eventTitle" element={<CardEventDetails />}></Route>
      <Route path="/panel-admin" element={<PanelAdmin />}></Route>
      <Route path="/paramètres" element={<Settings />}></Route>
      <Route path="/inscription" element={<Signin />}></Route>
    </Routes>
  );
};

export default RoutesPaths;
