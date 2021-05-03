import React, { useEffect, useState } from "react"
import { userStorageKey } from "../auth/authSettings"
import { getRecipesByUser } from "../../modules/recipeManager"
import { createMeal, createMealRecipe } from "../../modules/mealRecipeManager"
export const MealEntryForm = () => {


    const handleAddRecipe = () => {

    }
    const [recipeList, setRecipeList] = useState([{}])
    // used to display recipes and search results
    const [recipes, setRecipes] = useState([])
    // establish base line elements in search
    // this way when a user types burgers then delete the "s"
    // the search will pick up the change
    const [baseRecipe, setBaseRecipe] = useState([])
    const [mealName, setMealName] = useState([""])
    useEffect(() => {
        // getRecipesByUser(sessionStorage.getItem(userStorageKey))
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(response => {
            setRecipes(response)
            setBaseRecipe(response)
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
        console.log(evt.target.id,"The id in handle change")
        temp[index] = evt.target.value;
        setRecipeList(temp)
    }
    const handleSaveNameChange = (evt) => {
        setMealName(evt.target.value)
    }
    const handleSaveMeal = () => {
        createMeal(mealName).then(responseFromApi => {
            console.log(recipeList, "Recipe list in entry form")
            recipeList.forEach(recipe => {
                console.log(recipe, "recipe in meal entry form")
                createMealRecipe(recipe, responseFromApi)
            })
        })

    }
    // Meal Create Page
    return (<>
        <h1>Create Meal Page</h1>
        <div>
            <input type="text" placeholder="Enter Meal Name " id="mealName"
                onChange={handleSaveNameChange} />
            <button onClick={handleSaveMeal}>Save Meal</button>
        </div>
        {console.log(recipeList, "in return before map")}
        {recipeList.map((x, i) => {
            return (
                <>
                    <select onChange={evt => handleInputChange(evt, i)} placeholder="Select A Recipe">
                        <option selecdted="true">Select A recipe</option>
                        {recipes.map((recipe) => {
                            return <option key={recipe.id} id={recipe.id} value={recipe.id} >{recipe.recipeName}</option>
                        })}
                    </select>
                    <div className="btn-box">
                        {recipeList.length !== 1 && <button
                            className="recipeRemoveButton"
                            onClick={() => handleRemoveRecipeClick(i)}>Remove</button>}
                        {recipeList.length - 1 === i && <button onClick={handleAddRecipeClick}>Add</button>}
                    </div>
                </>
            )
        })}

    </>)
}