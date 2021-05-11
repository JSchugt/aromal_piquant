import React, { useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { getRecipesByUser } from "../../modules/recipeManager"
import { createMeal, createMealRecipe } from "../../modules/mealRecipeManager"
import { useHistory } from "react-router"
export const MealEntryForm = () => {
    const history = useHistory()
    const [recipeList, setRecipeList] = useState(["0"])
    // used to display recipes and search results
    const [recipes, setRecipes] = useState([])
    // establish base line elements in search
    // this way when a user types burgers then delete the "s"
    // the search will pick up the change
    const [mealName, setMealName] = useState([""])
    useEffect(() => {
        // getRecipesByUser(sessionStorage.getItem(userStorageKey))
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(response => {
            setRecipes(response)
        })
    }, [])


    const handleRemoveRecipeClick = index => {
        const temp = [...recipeList];
        temp.splice(index, 1);
        setRecipeList(temp);
    }
    const handleAddRecipeClick = (evt) => {
        setRecipeList([...recipeList, 0])

    }
    const handleInputChange = (evt, index) => {
        let temp = [...recipeList];
        temp[index] = evt.target.value;
        setRecipeList(temp)
    }
    const handleSaveNameChange = (evt) => {
        setMealName(evt.target.value)
    }
    const handleSaveMeal = () => {
        createMeal(mealName).then(responseFromApi => {
            recipeList.map(recipe => {

                if (recipe !== 0 && recipe !== "0" && recipe !== undefined) {
                    return createMealRecipe(recipe, responseFromApi.id)
                } else {
                    return false
                }
            }
            )
        }).then(() => { history.push("/meals") })

    }
    // Meal Create Page
    return (<>
        <h1 key={"create_meal_page_title"}>Create Meal Page</h1>
        <div key={"create_meal_header"}>
            <input key={"save_meal_meal_entry"} type="text" placeholder="Enter Meal Name " id="mealName"
                onChange={handleSaveNameChange} />
            <button key={"handle_save_meal_meal_enatry"} onClick={handleSaveMeal}>Save Meal</button>
        </div>
        <div key={"meal_listing_section"}>

        {recipeList.map((x, i) => {
            return (
                <>
                    <select key={"meal_drop_select"} onChange={evt => handleInputChange(evt, i)} placeholder="Select A Recipe">
                        <option key={"default_value_0"}defaultValue={0}>Select A recipe</option>
                        {recipes.map((recipe) => {
                            return <option key={"option_meal_entry"+recipe.id} id={recipe.id} value={recipe.id} >{recipe.recipeName}</option>
                        })}
                    </select>
                    <div className="btn-box" key={"meal_entry_add_remove_button"}>
                        {recipeList.length !== 1 && <button key={"remove_button_meal_entry"}
                            className="recipeRemoveButton"
                            onClick={() => handleRemoveRecipeClick(i)}>Remove</button>}
                        {recipeList.length - 1 === i && <button key={"handle_add_click_meal_entry"} onClick={handleAddRecipeClick}>Add</button>}
                    </div>
                </>
            )
        })}
        </div>

    </>)
}