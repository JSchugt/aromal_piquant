import React, { useEffect, useState } from "react"
import { getMealAndRecipeByMealId } from "../modules/mealRecipeManager"
import "../components/Home.css"
import { splitInstructionsIngrendiens, splitTime } from "./measurements"


export const SpotLightRecipe = ({ recipe }) => {
    const [recipeList, setRecipeList] = useState([])
    useEffect(() => {
        getMealAndRecipeByMealId(recipe.meal.id).then(responseFromApi => {
            setRecipeList(responseFromApi)
        })
    }, [recipe.meal.id])

    return (<>
        <div className="spotLightLister">
            {recipeList.map(rec => {
                return (
                    <div key={rec.id} className="spotLighDisplay">

                        <div className="spot_ligh_recipe_name_above">Recipe: {rec.recipe.recipeName}</div>
                        <div className="spotlight-recipe-instruct-ingred">
                            <div>

                                <h4>Ingredients</h4>
                                <ol>
                                    {splitInstructionsIngrendiens(rec.recipe.ingredientsList).map((item, i) => {
                                        if (item !== "") {
                                            return <li key={`ingredient__${i}`} className="ingredient-Instruction-Spot-Light">{item}</li>
                                        } else {
                                            return ""
                                        }
                                    }
                                    )}
                                </ol>
                            </div>
                            <div>
                                <h4>Instructions</h4>
                                <ol>
                                    {splitInstructionsIngrendiens(rec.recipe.instructions).map((item, i) => {
                                        if (item !== "") {
                                            return <li key={`instruction__${i}`} className="ingredient-Instruction-Spot-Light">{item}</li>
                                        } else {
                                            return ""
                                        }
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="SpotLightTimes">
                            <div className="prepCookTimes">Prep: {splitTime(rec.recipe.prepTime)[0]} hours {splitTime(rec.recipe.prepTime)[1]} min</div>
                            <div className="prepCookTimes">Cook: {splitTime(rec.recipe.cookTime)[0]} hours {splitTime(rec.recipe.cookTime)[1]} min</div>
                        </div>
                        <div className="spotLightNotes">
                            <h3>Notes</h3>
                            <div >{rec.recipe.notes}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}