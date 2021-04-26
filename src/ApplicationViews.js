import { Route } from "react-router"
import { EventPlanner } from "./components/events/EventPlanner"
import { DashBoard } from "./components/Home"
import { NavBar } from "./components/nav/NavBar"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <DashBoard />
            </Route>
            <Route exact path="/events">
                <EventPlanner />
            </Route>
        </>
    )
}