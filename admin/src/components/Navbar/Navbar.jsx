import React, { useContext } from "react";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import { UserIcon } from "../Icons/Icons";

const Navbar = () => {
  const navigate=useNavigate();
  const {token, admin, setAdmin, setToken } = useContext(StoreContext);
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully")
    navigate("/");
  }
  return (
    <div className="navbar">
      <Logo />
      <div className="navbar-right">
        {token && admin ? (
          <button className="login-conditon" onClick={logout}>Logout</button>
        ) : (
          <button className="login-conditon" onClick={()=>navigate("/")}>Login</button>
        )}
        <span className="profile"><UserIcon size={20} /></span>
      </div>
    </div>
  );
};

export default Navbar;
