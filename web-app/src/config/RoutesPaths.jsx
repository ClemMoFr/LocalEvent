import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Favorite from "../pages/Favorite/Favorite";

const RoutesPaths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/favoris" element={<Favorite />}></Route>
    </Routes>
  );
};

export default RoutesPaths;
