import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { RecipeCard } from "./RecipeCards"
import "./Recipes.css"
import { getRecipesByUser } from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings"

export const Recipes = () => {
    // used to display recipes and search results
    const [recipes, setRecipes] = useState([])
    // establish base line elements in search
    // this way when a user types burgers then delete the "s"
    // the search will pick up the change
    const [baseRecipe, setBaseRecipe] = useState([])

    useEffect(() => {
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(response => {
            setRecipes(response)
            setBaseRecipe(response)
        })
    }, [])

    const handleSearch = (evt) => {
        evt.preventDefault()
        let userInput = evt.target.value
        let search = []
        if (userInput.length > 0) {
            search = baseRecipe.filter(recipe => {
                if (recipe.recipeName.toLowerCase().includes(userInput.toLowerCase(0))) {
                    return recipe.recipeName
                } else {
                    return ""
                }
            })
            setRecipes(search)
        } else {
            setRecipes(baseRecipe)
        }
    }
    return (

        <>
            <div id="recipeTitle">
                <div id="pageName">Recipes</div>
                <div>
                    <fieldset>
                        <input type="text" onChange={handleSearch} placeholder="🔍"></input>
                    </fieldset>
                </div>
            </div>
            <div>
                {recipes.map(recipe => {
                    return (<Link to={`/recipes/${recipe.id}` } key={"recipe_list_link__"+recipe.id}>
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