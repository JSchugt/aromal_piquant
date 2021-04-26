import { Route } from "react-router"
import { NavBar } from "./components/nav/NavBar"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <NavBar />
            </Route>
        </>
    )
}