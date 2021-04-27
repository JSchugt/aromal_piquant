import { API } from "../Settings.js"
// Retrieve Recipe From API by id
export const getRecipeById = (id) => {
    return fetch(`${API.baseUrl}:8088/recipes/${id}`).then(res => res.json());
}

