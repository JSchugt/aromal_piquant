import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { RecipeCard } from "./RecipeCards"
import "./Recipes.css"
import { getRecipesByUser } from "../../modules/recipeManager"


export const Recipes = () => {
    // used to display recipes and search results
    const [recipes, setRecipes] = useState([])
    // establish base line elements in search
    // this way when a user types burgers then delete the "s"
    // the search will pick up the change
    const [baseRecipe, setBaseRecipe] = useState([])

    useEffect(() => {
        getRecipesByUser(1).then(response => { 
            setRecipes(response) 
            setBaseRecipe(response)})
    }, [])

    const handleSearch = (evt) => {
        evt.preventDefault()
        let userInput = evt.target.value
        let search = []
        if(userInput.length > 0){
            search = baseRecipe.filter(recipe =>{
                if( recipe.recipeName.toLowerCase().includes(userInput.toLowerCase(0))){
                    return recipe.recipeName
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
                <h2>Recipes</h2>
            </div>
            <div>
                <fieldset>
                    <label>Recipe Search</label>
                    <input type="text" onChange={handleSearch}></input>
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