import React, { useEffect, useState } from "react"
import { getMealAndRecipeByMealId } from "../modules/mealRecipeManager"
import "../components/Home.css"
import { splitInstructionsIngrendiens, splitTime, ingredientToString } from "./measurements"


export const SpotLightRecipe = ({ recipe }) => {
    const [recipeList, setRecipeList] = useState([])
    useEffect(() => {
        getMealAndRecipeByMealId(recipe.meal.id).then(responseFromApi => {
            setRecipeList(responseFromApi)
        })
    }, [])

    return (<>
        <div className="spotLightLister">
            {recipeList.map(rec => {
                return (<>
                    <div className="spotLighDisplay">

                        <h3>Recipe: {rec.recipe.recipeName}</h3>
                        <div className="spotlight-recipe-instruct-ingred">
                            <div>

                                <h4>Ingredients</h4>
                                <ol>
                                    {splitInstructionsIngrendiens(rec.recipe.ingredientsList).map((item, i) => {
                                        if (item !== "") {
                                            return <li key={`ingredient__${i}`} className="ingredient-Instruction-Spot-Light">{item}</li>
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
                </>)
            })}
        </div>
    </>)
}