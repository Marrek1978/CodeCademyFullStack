import { useState } from "react";
import "./App.css";

import { AuthProvider } from "./components/authContext/AuthContext";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
// import Skis from "./components/products/skis/Skis.jsx";
import ShopAll from "./components/products/ShopAll.jsx";
// import Boots from "./components/products/boots/Boots.jsx";
// import Poles from "./components/products/poles/Poles.jsx";
import Login from "./components/customer/Login.jsx";
import Register from "./components/customer/Register.jsx";
import Cart from "./components/cart/Cart.jsx";
import CustomerProfile from "./components/customer/CustomerProfile";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/products/Product_single";

function App() {
  return (
    
    <div className="lg:h-[1000px] min-h-screen" >
      <Router>
        <AuthProvider>
          <Header />
          <div className="lg:min-h-[75%] pb-12 bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shopall" element={<ShopAll />} />
              <Route path="/products/:productId" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/customer/:customerId"
                element={<CustomerProfile />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth/github" />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
