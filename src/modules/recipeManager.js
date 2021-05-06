import { API } from "../Settings.js"
// Retrieve Recipe From API by id
export const getRecipeById = (id) => {
    return fetch(`${API.baseUrl}:8088/recipes/${id}`).then(res => res.json());
}

export const createNewRecipe = (recObj) =>{
    fetch (`${API.baseUrl}:8088/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recObj)
    }).then((res) => res.json())
};

export const getRecipesByUser = (id) => {
    return fetch(`${API.baseUrl}:8088/recipes?userId=${id}`).then(res => res.json())
}

export const deleteRecipeById = (id) => {
    return fetch(`${API.baseUrl}:8088/recipes/${id}`, {
        method: "DELETE"

    }).then(res => res.json())
}

export const updateRecipeById = (recipepObj) => {
    fetch(`${API.baseUrl}:8088/recipes/${recipepObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(recipepObj)
    }).then(res => res.json())

}