import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { RecipeCard } from "./RecipeCards"
import "./Recipes.css"
import { getRecipesByUser } from "../../modules/recipeManager"


export const Recipes = () => {
    const [recipes, setRecipes] = useState([])


    useEffect(() => {
        getRecipesByUser(1).then(response => { setRecipes(response) })
    }, [])
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
                {recipes.map(recipe => {
                    return (<Link to={`/recipes/${recipe.id}`}>
                        <div className="recipeCard">
                            {recipe.recipeName}
                        </div>
                    </Link>)
                })}

            </div>
            <Link to={`/recipes/create`}>
                <button>Add A Recipe</button>
            </Link>
        </>
    )
}