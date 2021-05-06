import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { deleteRecipeById, getRecipeById, getRecipesByUser } from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings"


export const RecipeCard = () => {
    const { recipeId } = useParams()
    const [recipe, setRecipe] = useState([])
    const [instructions, setInstructions] = useState([])
    const [ingredients, setIngredients] = useState([""])
    const [cookTime, setCookTime] = useState([{}])
    const [prepTime, setPrepTime] = useState([{}])
    const history = useHistory()
    useEffect(() => {
        getRecipeById(recipeId).then((recipeFromApi) => {
            setRecipe(recipeFromApi);
            setInstructions(recipeFromApi.instructions);
            setIngredients(recipeFromApi.ingredientsList);
            setCookTime(recipeFromApi.cookTime);
            setPrepTime(recipeFromApi.prepTime);
        })
    }, [])
    const handleDeleteRecipe = () => {
        deleteRecipeById(recipeId).then(() => getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(() => history.push("/recipes")))
    }
    return (
        <>
            <button onClick={handleDeleteRecipe}>Delete</button>
            <button>Select</button>
            <Link to={`/recipes/${recipeId}/edit`}>
                <button>Edit</button>
            </Link>
            <Link to={"/recipes/create"}>
                <button>New Recipe</button>
            </Link>
            <Link to={"/recipes/search"}>
                <button>Search</button>
            </Link>
            <div>
                <h2>{recipe.recipeName}</h2>
                {/* Begining of ingredients and redcipes */}
                <div className="recipeTopDisplay">

                    <div className="recipeInstructionsDisplay">
                        <h3>Instructions:</h3>
                        {
                            instructions.map((item, index) => {
                                return (
                                    <div className="recipeInternale">
                                        Step {(index + 1)}: {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="recipeIngredientsDisplay">
                        <h3>Ingredients:</h3>
                        {ingredients.map((item, index) => {
                            return (
                                <div className="recipeInternale">
                                    {(index + 1)}.  {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* End of ingredients and instructions */}
                <div className="recipeCardNotes">
                    <h3>Notes:</h3>
                    {recipe.notes}
                </div>
                <div className="recipeCardTime">
                    <h3>Prep Time</h3>
                    <div className="recipePrepCookTime">{prepTime.prepHours} Hours, {prepTime.prepMinutes} minutes</div>
                    <h3>Cook Time</h3>
                    <div className="recipePrepCookTime">{cookTime.cookHours} Hours, {cookTime.cookMinutes} minutes</div>
                </div>
            </div>
        </>
    )
}