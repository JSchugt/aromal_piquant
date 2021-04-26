import React from "react"
import { Route } from 'react-router';
import './Aromal_Piquant.css';
import { NavBar } from './components/nav/NavBar'
import { ApplicationViews } from "./ApplicationViews";
import {Footer} from "./components/nav/footer"
export const AromalPiquant = () => {
  return <>
    <Route>
      <NavBar />
      <div>
        <ApplicationViews />
      </div>
      <div>
        <Footer />
      </div>
    </Route>
  </>
}
