import React from "react";
import "./Navbar.css";

import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { IoEarth } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({
  stateNavbar,
  handleNavHome,
  handleNavFavorite,
  handleNavSearch,
  handleNavPanel,
  handleNavSetting,
}) => {
  const jwtToken = localStorage.getItem("jwtToken");

  return (
    <div className="navbar">
      <div className="iconContainer">
        <Link to={"/"}>
          <div
            className={
              stateNavbar === "home"
                ? "navbarIconContainerOn"
                : "navbarIconContainerOff"
            }
            onClick={handleNavHome}
          >
            <AiFillHome className="navbarIcon" />
            <p
              className={
                stateNavbar === "home" ? "navbarIconOn" : "navbarIconOff"
              }
            >
              accueil
            </p>
          </div>
        </Link>

        {jwtToken && (
          <Link to={"/favoris"}>
            <div
              className={
                stateNavbar === "favorite"
                  ? "navbarIconContainerOn"
                  : "navbarIconContainerOff"
              }
              onClick={handleNavFavorite}
            >
              <AiFillHeart className="navbarIcon" />
              <p
                className={
                  stateNavbar === "favorite" ? "navbarIconOn" : "navbarIconOff"
                }
              >
                favoris
              </p>
            </div>
          </Link>
        )}

        <Link to={"/autour-du-monde"}>
          <div
            className={
              stateNavbar === "search"
                ? "navbarIconContainerOn"
                : "navbarIconContainerOff"
            }
            onClick={handleNavSearch}
          >
            <IoEarth className="navbarIcon" />
            <p
              className={
                stateNavbar === "search" ? "navbarIconOn" : "navbarIconOff"
              }
            >
              recherche
            </p>
          </div>
        </Link>

        <Link to={"/panel-admin"}>
          <div
            className={
              stateNavbar === "panel"
                ? "navbarIconContainerOn"
                : "navbarIconContainerOff"
            }
            onClick={handleNavPanel}
          >
            <VscSettings className="navbarIcon" />
            <p
              className={
                stateNavbar === "panel" ? "navbarIconOn" : "navbarIconOff"
              }
            >
              panel admin
            </p>
          </div>
        </Link>

        <Link to={"/paramètres"}>
          <div
            className={
              stateNavbar === "settings"
                ? "navbarIconContainerOn"
                : "navbarIconContainerOff"
            }
            onClick={handleNavSetting}
          >
            <FaUser className="navbarIcon" />
            <p
              className={
                stateNavbar === "settings" ? "navbarIconOn" : "navbarIconOff"
              }
            >
              paramètres
            </p>
          </div>
        </Link>
      </div>
      <p className="navbarLogo">LocalEvent.</p>
    </div>
  );
};

export default Navbar;
