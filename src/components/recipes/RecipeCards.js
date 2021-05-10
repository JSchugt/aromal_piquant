import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { splitInstructionsIngrendiens, splitTime } from "../../helpers/measurements"
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
            setInstructions(splitInstructionsIngrendiens(recipeFromApi.instructions));
            setIngredients(splitInstructionsIngrendiens(recipeFromApi.ingredientsList));
            setCookTime({
                cookHours: splitTime(recipeFromApi.cookTime)[0],
                cookMinutes: splitTime(recipeFromApi.cookTime)[1]
            });
            setPrepTime({
                prepHours: splitTime(recipeFromApi.prepTime)[0],
                prepMinutes: splitTime(recipeFromApi.prepTime)[1]
            });
        })
    }, [])
    const handleDeleteRecipe = () => {
        deleteRecipeById(recipeId).then(() => getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(() => history.push("/recipes")))
    }
    return (
        <>
            <button onClick={handleDeleteRecipe}>Delete</button>
            {/* <button>Select</button> */}
            <Link to={`/recipes/${recipeId}/edit`}>
                <button>Edit</button>
            </Link>
            <Link to={"/recipes/create"}>
                <button>New Recipe</button>
            </Link>
            <Link to={"/recipes/search"}>
                <button>Search</button>
                {/* 🔍 */}
            </Link>
            <div>
                <h2>{recipe.recipeName}</h2>
                {/* Begining of ingredients and redcipes */}
                <div className="recipeTopDisplay">
                
                    <div className="recipeInstructionsDisplay">
                        <h3>Instructions:</h3>
                        {<ol>
                            {instructions.map((item, index) => {
                                if (item !== "") {
                                    return (
                                        <li className="recipeInternale">
                                            {item}
                                        </li>
                                    )
                                }
                            })
                            }</ol>}
                    </div>
                    <div className="recipeIngredientsDisplay">
                        <h3>Ingredients:</h3>
                        <ol className="recipeInternale">
                            {ingredients.map((item, index) => {
                                if (item !== "") {
                                    return (
                                        <li >
                                            {item}
                                        </li>
                                    )
                                }
                            })}
                        </ol>
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