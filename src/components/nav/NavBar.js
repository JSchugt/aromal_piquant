import React from "react";
import "./NavBar.css";
import { Link, Route, Router, useHistory } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../logo.jpg";

export const NavBar = (props) => {
  return (
    <>
      <div id="headerTop">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div>
          <h1 id="appName">Aromal Piquant</h1>
        </div>
      </div>
      <nav className="navbar">
        <div>
          <ul className="navList">
            <li className="nav-item">
              <Route>
                <Link className="nav-link" to="/">Home</Link>
              </Route>
              <Route>
                <Link className="nav-link" to="/meals">Meals</Link>
              </Route>
              <Route>
                <Link className="nav-link" to="/events">Planner</Link>
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
