import React from "react";
import "./NavBar.css";
import { Link, Route, Router, useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../logo.jpg";

export const NavBar = (props) => {
  return (
    <>
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
    <nav className="navbar">
      <div>
        <ul className="navList">
          <li className="nav-item">
            <Route>
              <Link className="nav-link" to="/">Home</Link>
            </Route>
            <Route>
              <Link className="nav-link" to="/">Meals</Link>
            </Route>
            <Route>
              <Link className="nav-link" to="/">Planner</Link>
            </Route>
            <Route>
              <Link className="nav-link" to="/">Recipes</Link>
            </Route>
            <Route>
              <Link className="nav-link" to="/">Shopping</Link>
            </Route>
            <Route>
              <Link className="nav-link" to="/">Logout</Link>
            </Route>
          </li>
        </ul>
      </div>
    </nav>
  </>)
}
