import React from "react"
import { Route, Redirect } from 'react-router';
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from './components/nav/NavBar'
import {Login} from './components/auth/Login'
import {Register} from './components/auth/Register'
import {Footer} from "./components/nav/Footer"
import {userStorageKey} from "./components/auth/authSettings"
import './Aromal_Piquant.css';
export const AromalPiquant = () => {
  return <>
    <Route
      render={() => {
        if (sessionStorage.getItem(userStorageKey)) {
          return (
            <>
              <NavBar />
              <div className="applicationView">
              <ApplicationViews />
              </div>
              <div>
              <Footer />
              </div>
            </>
          )
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>  </>
}
