import React from "react"
import { Link } from "react-router-dom"

export const RecipeSearch = () => {

    return (
        <>
            <button>View Selected Recipe</button>
            <button>Submit</button>
            <Link to="/recipes/create">
                <button>Add New Recipe</button>
            </Link>
        </>
    )
}