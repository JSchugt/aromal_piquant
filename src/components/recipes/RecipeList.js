import React from "react"
import { RecipeCard } from "./RecipeCards"
import "./Recipes.css"


export const Recipes = () => {
    return (
        <>
            <div id="recipeTitle">
                <h2>Recipes</h2>
            </div>
            <div>
                <fieldset>
                    <label>Recipe Search</label>
                    <input type="text"></input>
                </fieldset>
            </div>
            <div>
                <div className="recipeCard">
                    <RecipeCard />
                </div>
                <div className="recipeCard">
                    <RecipeCard />
                </div>
                <div className="recipeCard">
                    <RecipeCard />
                </div>
                <div className="recipeCard">
                    <RecipeCard />
                </div>
            </div>
            <button>Add A Recipe</button>
        </>
    )
}