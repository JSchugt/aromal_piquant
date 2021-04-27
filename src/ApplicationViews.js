import { Route } from "react-router"
import { EventPlanner } from "./components/events/EventPlanner"
import { DashBoard } from "./components/Home"
import { Meals } from "./components/meals/Meals"
import { RecipeEntryForm } from "./components/recipes/RecipeEntryFrom"
import {RecipeEditForm} from "./components/recipes/RecipeEditForm"
import { Recipes } from "./components/recipes/RecipeList"
import { RecipeSearch } from "./components/recipes/RecipeSearch"


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
            {/* Recipe routing */}
            <Route exact path="/recipes">
                <Recipes />
            </Route>
            <Route exact path="/recipes/search">
                <RecipeSearch />
            </Route>
            <Route exact path="/recipes/create">
                <RecipeEntryForm />
            </Route>
            <Route exact path="/recipes/:recipeId(\d+)/edit">
                <RecipeEditForm />
            </Route>
        </>
    )
}