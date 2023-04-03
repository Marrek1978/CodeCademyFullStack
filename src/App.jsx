import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Skis from "./components/Skis.jsx";
import Boots from "./components/Boots.jsx";
import Poles from "./components/Poles.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Cart from "./components/Cart.jsx";
import CustomerProfile from "./components/CustomerProfile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from './components/Product';

function App() {
  const [count, setCount] = useState(0);

  //build out the funcitonality to get the products on teh home page
  //build the footer
  //<Footer />
  //registration
  //auth
  //login

  return (
    <div className="App sm:">
      <div className="bg-slate-300">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skis" element={<Skis />} />
            <Route path="/boots" element={<Boots />} />
            <Route path="/poles" element={<Poles />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer/:customerId" element={<CustomerProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth/github"  />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
