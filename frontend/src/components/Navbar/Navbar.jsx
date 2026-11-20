import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo";
import { SearchIcon, BagIcon, UserIcon, LogoutIcon } from "../Icons/Icons";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <header className="navbar">
      <Logo />
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#offers"
          onClick={() => setMenu("offers")}
          className={menu === "offers" ? "active" : ""}
        >
          offers
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <a href="#food-display" className="navbar-icon-btn" aria-label="Search dishes">
          <SearchIcon size={22} />
        </a>
        <div className="navbar-search-icon">
          <Link to="/cart" className="navbar-icon-btn" aria-label="Cart">
            <BagIcon size={22} />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <span className="navbar-icon-btn profile-btn">
              <UserIcon size={22} />
            </span>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <BagIcon size={18} />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <LogoutIcon size={18} />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
