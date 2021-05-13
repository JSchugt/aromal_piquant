import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { getMealsRecipeByUserId } from "../../modules/mealRecipeManager"
import { userStorageKey } from "../auth/authSettings"
import "./Meals.css"

// Create Static meal page until logic is futher filled out
export const Meals = () => {
    const history = useHistory()
    const [userMeals, setUserMeals] = useState([])
    const [meals, setMeals] = useState([""])
    // const [mealsFromUser, setMealsFromUSer] = useState([])
    const consoliDateMeals = (tempMeals) => {
        // let temp = tempMeals.map( x => {return [x.mealName,(x.mealId)]})
        let temp = [...tempMeals]
        let out = []

        for (let i = 0; i < temp.length; i++) {
            if (!out.find(x => { return x.mealName === temp[i].mealName })) {
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
        let userInput = evt.target.value
        let search = []
        if (userInput.length > 0) {
            search = meals.filter(recipe => {
                if (recipe.mealName.toLowerCase().includes(userInput.toLowerCase(0))) {
                    return recipe.mealName
                } else {
                    return false
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
    const handleCreateMeal = (evt) => {
        evt.preventDefault()
        history.push("/meals/create")
    }
    return (<div id="mealHolder">
        <div className="meal_holder_list">

            <div id="mealPageName" key={"meal_page_title"}>
                <fieldset>
                    <div id="mealListTitle" key={"meal_list_section"}>Meal List</div>
                    <input key={"meal_search_bar"} className="mealSearchNameInput" type="text" onChange={handleSearch} placeholder="🔍"></input>
                </fieldset>
            </div>
            <div className="mealListDiv" key={"meal_list_section_div"}>
                {(userMeals !== null) ? userMeals.map((meal) => {
                    return (<div key={"meal_name_" + meal.id}>
                        <h2 required className="mealListMealName" key={"meal__" + meal.id} id={meal.id} onClick={handleMealOnClick}>{meal.mealName}</h2>
                    </div>)
                }) : ""}
                <button onClick={handleCreateMeal}>Add A Meal</button>
            </div>
        </div>
    </div>)
}