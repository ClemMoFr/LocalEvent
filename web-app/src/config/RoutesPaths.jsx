import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Favorite from "../pages/Favorite/Favorite";
import AroundWorld from "../pages/AroundWorld/AroundWorld";
import CardEventDetails from "../components/card-event-details/CardEventDetails";
import PanelAdmin from "../pages/PanelAdmin/PanelAdmin";
import Settings from "../pages/Settings/Settings";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import ProtectedRoutes from "../components/protected-routes/ProtectedRoutes";

const RoutesPaths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/favoris"
        element={<ProtectedRoutes element={<Favorite />} />}
      />
      <Route path="/autour-du-monde" element={<AroundWorld />}></Route>
      <Route path="/:eventTitle" element={<CardEventDetails />}></Route>
      <Route
        path="/panel-admin"
        element={<ProtectedRoutes element={<PanelAdmin />} />}
      />
      <Route path="/paramètres" element={<Settings />}></Route>
      <Route path="/inscription" element={<Signup />}></Route>
      <Route path="/connexion" element={<Signin />}></Route>
    </Routes>
  );
};

export default RoutesPaths;
