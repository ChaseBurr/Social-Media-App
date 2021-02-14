import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { AuthContext } from "./../context/auth";

export default function MenuBar() {
     const { user, logout } = useContext(AuthContext);

     // grab url
     const pathname = window.location.pathname;

     // set path
     const path = pathname === "/" ? "home" : pathname.substr(1);

     const menuBar = user ? (
          <nav className="navbar">
               <Link to="/" className="logo">
                    SOCIAL MEDIA
               </Link>
               <div className="user-options">
                    <button
                         position="right"
                         onClick={logout}
                         as={Link}
                         to="/login"
                    >
                         <i className="fas fa-sign-out-alt"></i>
                    </button>
               </div>
          </nav>
     ) : (
          <nav className="navbar">
               <Link to="/" className="logo">
                    SOCIAL MEDIA
               </Link>
               <div className="user-options">
                    <Link to="/login" className="option-item">
                         LOGIN
                    </Link>
                    <Link to="/register" className="option-item">
                         REGISTER
                    </Link>
               </div>
          </nav>
     );

     return menuBar;
}
