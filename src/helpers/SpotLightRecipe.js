import Reac, { useEffect, useState } from "react"
import { userStorageKey } from "../components/auth/authSettings"
import { getMealAndRecipeByMealId } from "../modules/mealRecipeManager"


export const SpotLightRecipe = ({ recipe }) => {
    const [recipeList, setRecipeList] = useState([])
    const [instructionList, setInstructionList] = useState([])
    const [prepTime, setPrepTime] = useState({})
    const [cookTime, setCookTime] = useState({})
    const [ingredientList, setIngredientList] = useState([""])
    const [notes , setNotes] = useState([""])
    useEffect(() => {
        getMealAndRecipeByMealId(recipe.id).then(responseFromApi => {
            responseFromApi.map(recipe => {
                setRecipeList(recipe.recipe)
                setIngredientList(recipe.recipe.ingredientsList.map(item => {
                    return item
                }))
                setInstructionList(recipe.recipe.instructions.map( item =>{
                    return item
                }))
                setCookTime(recipe.recipe.cookTime)
                setPrepTime(recipe.recipe.prepTime)
                setNotes(recipe.recipe.notes)
        })
    })}, [])

    return (<>
        {/* {/.log(recipeList.recipe.recipeName, "RECIPE SPOT LIGHT")} */}
        <h2>Recipe Spot Light</h2>
        <h3>{recipeList.recipeName}</h3>
        {ingredientList.map(item => {
            return <div>{item}</div>
        })}
        {instructionList.map(item => {
            return <div>{item}</div>
        })}
        <div>{prepTime.prepHours}:{prepTime.prepMinutes}</div>
        <div>{cookTime.cookHours}:{cookTime.cookMinutes}</div>
        <p>{notes}</p>

    </>)
}