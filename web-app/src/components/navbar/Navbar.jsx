import React from "react";
import "./Navbar.css";

import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { IoEarth } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

import { FaUser } from "react-icons/fa";

const Navbar = ({
  stateNavbar,
  handleNavHome,
  handleNavFavorite,
  handleNavSearch,
  handleNavPanel,
  handleNavSetting,
}) => {
  return (
    <div className="navbar">
      <div className="iconContainer">
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
            panneau admin
          </p>
        </div>
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
      </div>
      <p className="navbarLogo">LocalEvent.</p>
    </div>
  );
};

export default Navbar;
