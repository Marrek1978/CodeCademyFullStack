import React from "react";
import { Outlet, Link } from "react-router-dom";


const Header = () => {
  return (
    <>
      <header className="bg-[#342e32] flex justify-between items-center text-slate-100 font-bodo px-5">
        <div id="logo" className="flex items-center justify-start ">
          <div id="tag" className="h-12 w-8 bg-paleKey"></div>
          <div id="text " className="h-full pl-4 font-semibold 	">
            <Link to='/' >SKI SALE</Link>
            <p className="text-[10px] text-[#866150] uppercase">Where everything is always on Sale!</p>
          </div>
        </div>
        <nav>
          <div id="links">
            <ul className="flex gap-5  uppercase text-xs text-slate-400">
        
              <li><Link to='/skis' >Skis</Link></li>
              <li><Link to='/boots' >Boots</Link></li>
              <li><Link to='/poles' >Poles</Link></li>
              <li><Link to='/login' > Login</Link></li>
              <li><Link to='/register' >Register</Link></li>
              <li><Link to='/cart' > Cart</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
      
    </>
  );
};

export default Header;
