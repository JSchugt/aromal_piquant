import { userStorageKey } from "../components/auth/authSettings.js"
import { API } from "../Settings.js"

export const getMealsById = (id) => {
    return fetch(`${API.baseUrl}:8088/meals/${id}`).then(res => res.json())
}

export const getMealRecipeByMealId = (id) => {
    return fetch(`${API.baseUrl}:8088/mealRecipes?mealId=${id}&_expand=recipe&_expand=meal`).then(res => res.json())
}

export const deleteMealById = (id) => {
    return fetch(`${API.baseUrl}:8088/meals/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}

export const updateMealById = (id, mealNameIn) =>{
    let sendObj = {
        userId: parseInt(sessionStorage.getItem(userStorageKey)),
        mealName:mealNameIn
    }
    return fetch(`${API.baseUrl}:8088/meals/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendObj)
    }).then((res) => res.json())
}