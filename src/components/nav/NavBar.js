import React from "react";
import "./NavBar.css";
import { Link, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import dog from "../../dog.svg";

export const NavBar = () => {
  return (
    <>
      <div className="navElement">

        <div id="headerTop">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" id="svg" version="1.1" width="90" height="90" viewBox="0 0 90 90">
              <g id="svgg">
                <polygon points="0,45 30.6,40.5 45,45 9,9 40.5,30.6 45,45 45,0 49.5,30.6 45,45  81,9  59.4,40.5 45,45 90,45 59.4,49.5 45,45  81,81 49.5,59.4  45,45 45,90 40.5,59.4 45,45  9,81 30.6,49.5 45,45 "   fill="#0000ff"  />
                <polygon points=" 30.6,49.5 0,45 45,45 30.6,40.5 9,9 45,45 40.5,30.6 45,0 45,45 81,9  49.5,30.6 45,45 59.4,40.5 90,45 45,45 59.4,49.5 81,81 45,45 49.5,59.4 45,90 45,45 9,81 40.5,59.4 45,45" fill="#000000" />
              </g>
            </svg>
          </div>
          <div>
            <div id="appName">Aromal Piquant</div>
          </div>
          <Route>
            <Link className="nav-link" onClick={() => { sessionStorage.clear() }} to="/login">Logout</Link>
          </Route>
        </div>
        <nav className="navbar">
          <div>
            <ul className="navList">
              <li className="nav-item">
                <Route>
                  <Link className="nav-link" to="/">Home</Link>
                </Route>
                <Route>
                  <Link className="nav-link" to="/events">Planner</Link>
                </Route>
                <Route>
                  <Link className="nav-link" to="/meals">Meals</Link>
                </Route>
                <Route>
                  <Link className="nav-link" to="/recipes">Recipes</Link>
                </Route>
                {/* <Route>
                <Link className="nav-link" to="/">Shopping</Link>
              </Route> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>)
}
