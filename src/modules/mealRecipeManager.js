import { API } from "../Settings.js"

export const getMealRecipeById = (id) => {
    return fetch(`${API.baseUrl}:8088/mealRecipes/${id}?_expand=meal`).then(res => res.json())
}

export const getMealsRecipeByUserId = (id) => {
    return fetch(`${API.baseUrl}:8088/mealRecipes?userId=${id}&_expand=meal&_expand=recipe`).then(res => res.json())
}