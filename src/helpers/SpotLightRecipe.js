import React, { useEffect, useState } from "react"
import { getMealAndRecipeByMealId } from "../modules/mealRecipeManager"
import "../components/Home.css"
import { splitInstructionsIngrendiens, splitTime } from "./measurements"


export const SpotLightRecipe = ({ recipe }) => {
    const [recipeList, setRecipeList] = useState([])
    const [instructionList, setInstructionList] = useState([])
    const [prepTime, setPrepTime] = useState({})
    const [cookTime, setCookTime] = useState({})
    const [ingredientList, setIngredientList] = useState([""])
    const [notes, setNotes] = useState([""])
    useEffect(() => {
        getMealAndRecipeByMealId(recipe.id).then(responseFromApi => {
            responseFromApi.map(recipe => {
                setRecipeList(recipe.recipe)
                setIngredientList([...splitInstructionsIngrendiens(recipe.recipe.ingredientsList)].map(item => {
                    return item
                }))
                setInstructionList([...splitInstructionsIngrendiens(recipe.recipe.instructions)].map(item => {
                    return item
                }))
                setCookTime({
                    cookHours: splitTime(recipe.recipe.cookTime)[0],
                    cookMinutes: splitTime(recipe.recipe.cookTime)[1]
                })
                setPrepTime({
                    prepHours: splitTime(recipe.recipe.prepTime)[0],
                    prepMinutes: splitTime(recipe.recipe.prepTime)[1]
                })
                setNotes(recipe.recipe.notes)
            })
        })
    }, [])

    return (<>
        <h3>{recipeList.recipeName}</h3>
        <div className="spotlight-recipe-instruct-ingred">
            <div>
                {ingredientList.map((item, i) => {
                    if (item !== "") {
                        return <li key={`ingredient__${i}`} className="ingredient-Instruction-Spot-Light">{item}</li>
                    }
                })}
            </div>
            <div>
                {instructionList.map((item, i) => {
                    if (item !== "") {
                        return <li key={`instruction__${i}`} className="ingredient-Instruction-Spot-Light">{item}</li>
                    }
                })}
            </div>
        </div>
        <div className="prepCookTimes">Prep: {prepTime.prepHours} hours {prepTime.prepMinutes} minutes</div>
        <div className="prepCookTimes">Cook: {cookTime.cookHours} hours {cookTime.cookMinutes} minutes </div>
        <p className="spotLightNotes">{notes}</p>

    </>)
}