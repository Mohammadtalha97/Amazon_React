import "./App.css";

import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";

import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import SignInScreen from "./Screens/SignInScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceholderScreen from "./Screens/PlaceholderScreen";
function App() {
  const usersignin = useSelector((state) => state.user);
  const { userInfo } = usersignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-contanier">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="">amazon</Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            {"  "}
            {"  "}
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar_close_button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants </a>
            </li>

            <li>
              <a href="index.html">Shirts </a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/placeorder" component={PlaceholderScreen} />
            <Route path="/" exact component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
