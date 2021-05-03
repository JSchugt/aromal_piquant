import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { getMealRecipeByMealId, getMealsById } from "../../modules/mealManager"
import { getMealRecipeById } from "../../modules/mealRecipeManager"


export const MealDetails = () => {
    const { mealsId } = useParams()
    const history = useHistory()
    const [meals, setMeals] = useState([{}])
    const [mealName, setMealName] = useState([])
    const [recipe, setRecipe] = useState([])


    useEffect(() => {
        getMealRecipeByMealId(mealsId)
            .then((responseFromAPi) => {
                setMeals(responseFromAPi)
                setMealName(responseFromAPi[0].meal.mealName)
                setRecipe([...responseFromAPi.map((rec) => { 
                    return rec.recipe
                    })])
            })
    }, [])
    const handleRecipeClick = (evt) => {
        evt.preventDefault()
        history.push(`/recipes/${evt.target.id}`)
    }

    return (<>
        {/* <h1>{meals.meal.mealName}</h1>
         */}
        <h1>{mealName}</h1>
        {recipe.map( item => {
            return <p id={item.id} onClick={handleRecipeClick}>{item.recipeName}</p>
        })}

    </>)


}