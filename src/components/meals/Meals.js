import React from "react"
import { MealCard } from "./MealCard"
import "./Meals.css"

// Create Static meal page until logic is futher filled out
export const Meals = () => {
    return (<>
        <div>
            <h2 id="mealListTitle">Meal List</h2>
        </div>
        <div id="mealPage">
            <div id="mealList">
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
                <MealCard />
            </div>
            <div>
                <fieldset>
                    <label>Meal Search</label>
                    <input type="text"></input>
                </fieldset>
            </div>
        </div>
        <button>Add A Meal</button>
    </>)
}