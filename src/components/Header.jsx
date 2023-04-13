import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import AuthContext from "./authContext/AuthContext";
// import { Navigate } from "react-router-dom";
// import {LogoutButton} from './LogoutButton';

import LogoutButton from "./buttons/LogoutButton";
const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);

  //is authed for links
  return (
    <>
      <header className="bg-backgroundClr flex justify-between items-center text-slate-100 font-bodo px-5">
        <div id="logo" className="flex items-center justify-start ">
          <div id="tag" className="h-12 w-8 bg-paleKey"></div>
          <div id="text-logo " className="h-full pl-4 font-semibold 	">
            <Link to="/">SKI SALE</Link>
            <p className="text-[10px] text-paleKey uppercase font-poppins">
              Where everything is always on Sale!
            </p>
          </div>
        </div>
        <nav>
          <div id="links">
            <ul
              className="flex gap-5 items-center 
              font-poppins uppercase text-xs text-slate-400
              "
            >
              <li>
                <Link to="/shopall">Shop All</Link>
              </li>
           
              {!isLoggedIn && (
                <li>
                  <Link to="/login"> Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to={`/customer/${userID}`} > Cart/Profile</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <LogoutButton> Logout</LogoutButton>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
