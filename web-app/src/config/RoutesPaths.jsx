import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Favorite from "../pages/Favorite/Favorite";
import AroundWorld from "../pages/AroundWorld/AroundWorld";
import CardEventDetails from "../components/card-event-details/CardEventDetails";

const RoutesPaths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/favoris" element={<Favorite />}></Route>
      <Route path="/autour-du-monde" element={<AroundWorld />}></Route>
      <Route path="/:movieTitle" element={<CardEventDetails />}></Route>
    </Routes>
  );
};

export default RoutesPaths;
