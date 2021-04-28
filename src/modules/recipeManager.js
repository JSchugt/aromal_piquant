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
        body: JSON.stringify(recObj),
    }).then((res) => res.json())
};