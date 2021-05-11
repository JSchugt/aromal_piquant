import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {  getRecipesByUser } from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings"



export const RecipeSearch = () => {
    // used to display recipes and search results
    const [recipes, setRecipes] = useState([])
    // establish base line elements in search
    // this way when a user types burgers then delete the "s"
    // the search will pick up the change
    const [baseRecipe, setBaseRecipe] = useState([])
    useEffect(() => {
        getRecipesByUser(sessionStorage.getItem(userStorageKey))
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
            <h1>Recipe Search Page</h1>
            {/* <button>View Selected Recipe</button> */}
            {/* <button>Submit</button> */}
            <Link to="/recipes/create">
                <button>Add New Recipe</button>
            </Link>
            <div className="cookBookSearchDiv">
                <label>Search Your Cook Book</label>
                <div>
                    <input type="text" id="cookBookSearch" placeholder="Enter Recipe Name" onChange={handleSearch}></input>
                </div>
            </div>
            {/* <div>
                <label>Search The World</label>
                <input type="text" id="apiRecipeSearch" placeholder="under construction" />
            </div> */}
            <div>
                {recipes.map(recipe => {
                    return (<Link to={`/recipes/${recipe.id}`}  key={"recipe_search__link"+recipe.id}>
                        <div key={"recipe_search__"+recipe.id} className="recipeCard">
                            {recipe.recipeName}
                        </div>
                    </Link>)
                })}
            </div>
        </>
    )
}