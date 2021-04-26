import { Route } from "react-router"
import { EventPlanner } from "./components/events/EventPlanner"
import { DashBoard } from "./components/Home"
import { Meals } from "./components/meals/Meals"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <DashBoard />
            </Route>
            <Route exact path="/events">
                <EventPlanner />
            </Route>
            <Route exact path="/meals">
                <Meals />
            </Route>
            <Route exact path="/recipes">

            </Route>
        </>
    )
}