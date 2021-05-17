import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { splitInstructionsIngrendiens, splitTime } from "../../helpers/measurements"
import { deleteRecipeById, getRecipeById, getRecipesByUser } from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings"
import {confirmAlert}  from "react-confirm-alert"

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
    }, [recipeId])
    const handleDeleteRecipe = () => {

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p>Confirm You Want To Delete This Recipe</p>
                        <p>This can't be undone</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                deleteRecipeById(recipeId).then(() => getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(() => history.push("/recipes")))

                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    }


    // start JSX section
    return (
        <div id="recide_card_display">
            <div>

                <div id="recipe_card_button_section">
                    <button onClick={handleDeleteRecipe}>Delete</button>
                    {/* <button>Select</button> */}

                    <Link to={`/recipes/${recipeId}/edit`} key={"recipe_card_to_edit"}>
                        <button>Edit</button>
                    </Link>
                    <Link to={"/recipes/create"} key={"recipe_card_to_create"}>
                        <button>New Recipe</button>
                    </Link>
                    <Link to={"/recipes/search"} key={"recipe_card_to_search"}>
                        <button>Search</button>
                    </Link>
                </div>
                <div>
                    {/* Begining of ingredients and redcipes */}
                    <h2 id='recipe_name_header'>{recipe.recipeName}</h2>
                    <div className="recipeTopDisplay">
                        <div className="recipeIngredientsDisplay" key={"recipe_ingredient_list__" + recipeId}>
                            <h3>Ingredients:</h3>
                            <ol className="recipeInternale">
                                {ingredients.map((item, index) => {
                                    if (item !== "") {
                                        return (
                                            <li key={"ingredients_recipe_card__" + index}>
                                                {item}
                                            </li>
                                        )
                                    } else {
                                        return true
                                    }
                                })}
                            </ol>
                        </div>
                        <div className="recipeInstructionsDisplay" key={"recipe_instruction_list__" + recipe}>
                            <h3>Instructions:</h3>
                            {<ol>
                                {instructions.map((item, index) => {
                                    if (item !== "") {
                                        return (
                                            <li className="recipeInternale" key={"instruction_recipe_card__" + index} >
                                                {item}
                                            </li>
                                        )
                                    } else {
                                        return true
                                    }
                                })
                                }</ol>}
                        </div>

                    </div>
                    {/* End of ingredients and instructions */}
                    <div className="recipeNotesSection">

                        <div className="recipeCardNotes" key={"recipe_notes__" + recipeId}>
                            <h3 >Notes:</h3>
                            <div>{recipe.notes}</div>
                        </div>
                        <div className="recipeCardTime" key={"recipe_card_time_seciton" + recipeId}>
                            <h3>Prep Time</h3>
                            <div key={"recipe_prep_time__" + recipeId} className="recipePrepCookTime">{prepTime.prepHours} Hours, {prepTime.prepMinutes} minutes</div>
                            <h3>Cook Time</h3>
                            <div key={"recipe_cook_time__" + recipeId} className="recipePrepCookTime">{cookTime.cookHours} Hours, {cookTime.cookMinutes} minutes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}