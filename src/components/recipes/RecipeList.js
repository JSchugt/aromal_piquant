import React from "react"
import { Link } from "react-router-dom"
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
                {/* Make Recipe selectable and based on recipe number */}
                <Link to={`/recipes/1/edit`}>
                    <div className="recipeCard">
                        <RecipeCard />
                    </div>
                </Link>
            </div>
            <Link to={`/recipes/1/edit`}>
                <button>Add A Recipe</button>
            </Link>
        </>
    )
}