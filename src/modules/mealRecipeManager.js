import { userStorageKey } from "../components/auth/authSettings.js"
import { API } from "../Settings.js"

export const getMealAndRecipeByMealId = (id) => {
    return fetch(`${API.baseUrl}:8088/mealRecipes?mealId=${id}&_expand=meal&_expand=recipe`)
        .then(res => res.json())
}
export const getMealRecipeById = (id) => {
    return fetch(`${API.baseUrl}:8088/mealRecipes/${id}?_expand=meal`).then(res => res.json())
}

export const getMealsRecipeByUserId = (id) => {
    return fetch(`${API.baseUrl}:8088/meals?userId=${id}`)
        .then(res => res.json())
}

export const createMeal = (mealNameFromCode) => {
    let mealObj = {
        mealName: mealNameFromCode,
        userId: parseInt(sessionStorage.getItem(userStorageKey))
    }
    return fetch(`${API.baseUrl}:8088/meals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mealObj),
    }).then((res) => res.json())
}

export const createMealRecipe = (recipeIdFromCode, mealIdFromCode) => {
    console.log(mealIdFromCode)
    let recipeMeal = {
        recipeId: parseInt(recipeIdFromCode),
        mealId: mealIdFromCode,
        userId: parseInt(sessionStorage.getItem(userStorageKey))
    }
    return fetch(`${API.baseUrl}:8088/mealRecipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipeMeal),
    }).then((res) => res.json())
}

export const deleteMealRecipeByMealAndRecipeId = (mealId, deleteItem) => {
    console.log(deleteItem.id, "Recipe id in meal redcipe manager")
    return fetch(`${API.baseUrl}:8088/mealRecipes?mealId=${mealId}&recipeId=${deleteItem.id}`)
        .then(rec => rec.json())
        .then(parsed => {
            console.log(parsed[0].id, "Parsed afeter dlete")
            return fetch(`${API.baseUrl}:8088/mealRecipes/${parsed[0].id}`,{
                method:"DELETE"
            }).then(res=> res.json())
        })
}