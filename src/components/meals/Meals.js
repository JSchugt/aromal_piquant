import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getMealRecipeById, getMealsRecipeByUserId } from "../../modules/mealRecipeManager"
import { getRecipeById, getRecipesByUser } from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings"
import { MealCard } from "./MealCard"
import "./Meals.css"

// Create Static meal page until logic is futher filled out
export const Meals = () => {
    const history = useHistory()
    let i = 0
    const [userMeals, setUserMeals] = useState([])
    const [meals, setMeals] = useState([""])
    // const [mealsFromUser, setMealsFromUSer] = useState([])
    const consoliDateMeals = (tempMeals) => {
        // let temp = tempMeals.map( x => {return [x.meal.mealName,(x.mealId)]})
        let temp = [...tempMeals]
        let out = []

        for (let i = 0; i < temp.length; i++) {
            if (!out.find(x => { return x.meal.mealName === temp[i].meal.mealName })) {
                out.push(temp[i])
            }
        }
        return out
    }
    // get the users recipes
    useEffect(() => {
        getMealsRecipeByUserId(sessionStorage.getItem(userStorageKey))
            .then((responseFromAPi) => {
                setMeals(consoliDateMeals([...responseFromAPi]))
                setUserMeals(consoliDateMeals([...responseFromAPi]))
            })
    }, [])
    const handleSearch = (evt) => {
        evt.preventDefault()
        console.log(meals, "meals")
        console.log(userMeals, "userMeals")
        let userInput = evt.target.value
        console.log(userInput, "user input")
        let search = []
        if (userInput.length > 0) {
            search = meals.filter(recipe => {
                if (recipe.meal.mealName.toLowerCase().includes(userInput.toLowerCase(0))) {
                    return recipe.meal.mealName
                }
            })
            setUserMeals(search)
        } else {
            setUserMeals(meals)
        }
    }
    const handleMealOnClick = (evt) => {
        evt.preventDefault()
        history.push(`/meals/${evt.target.id}`)
    }
    return (<>
        <div>
            <h2 id="mealListTitle">Meal List</h2>
        </div>
        <div>
            <fieldset>
                <label>Meal Search</label>
                <input type="text" onChange={handleSearch}></input>
            </fieldset>

        </div>
        {userMeals.map((meal) => {
            return (<div>
                <h2 key={"meal__"+meal.meal.id} id={meal.meal.id} onClick={handleMealOnClick}>{meal.meal.mealName}</h2>
            </div>)
        })}
        <button>Add A Meal</button>

    </>)
}