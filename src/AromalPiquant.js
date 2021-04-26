import React from "react"
import { Route, Redirect } from 'react-router';
import './Aromal_Piquant.css';
import { NavBar } from './components/nav/NavBar'
import logo from "./logo.jpg"
import {Login} from "./components/auth/Login"
import {Register} from "./components/auth/Register"
export const AromalPiquant = () => {
  return <>
    <Route>
      <NavBar />
    </Route>
  </>
}
