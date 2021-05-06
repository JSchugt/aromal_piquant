import React, { useEffect, useState } from "react"
import { getMealAndRecipeByMealId } from "../modules/mealRecipeManager"
import "../components/Home.css"


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
                setIngredientList(recipe.recipe.ingredientsList.map(item => {
                    return item
                }))
                setInstructionList(recipe.recipe.instructions.map(item => {
                    return item
                }))
                setCookTime(recipe.recipe.cookTime)
                setPrepTime(recipe.recipe.prepTime)
                setNotes(recipe.recipe.notes)
                return true
            })
        })
    }, [])

    return (<>
        <h3>{recipeList.recipeName}</h3>
        <div className="spotlight-recipe-instruct-ingred">
            <div>
            {ingredientList.map((item, i) => {
                return <div className="ingredient-Instruction-Spot-Light">Ingredient {(i + 1)}:{item}</div>
            })}
            </div>
            <div>
            {instructionList.map((item, i) => {
                return <div className="ingredient-Instruction-Spot-Light">Step {(i + 1)}:{item}</div>
            })}
            </div>
        </div>
        <div className="prepCookTimes">Prep: {prepTime.prepHours} hours {prepTime.prepMinutes} minutes</div>
        <div className="prepCookTimes">Cook: {cookTime.cookHours} hours {cookTime.cookMinutes} minutes </div>
        <p className="spotLightNotes">{notes}</p>

    </>)
}