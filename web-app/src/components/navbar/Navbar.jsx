import React, { useEffect, useState } from "react";
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

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // Définir null comme valeur initiale

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token) {
          return;
        }

        const response = await fetch("http://localhost:4000/user/infos", {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsLoading(false);
          // Définir userRole ici après avoir reçu les données de l'utilisateur
          setUserRole(userData.userRole);
        } else {
        }
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  console.log(userRole);

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

        {jwtToken && userRole === "administrateur" && (
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
        )}

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
