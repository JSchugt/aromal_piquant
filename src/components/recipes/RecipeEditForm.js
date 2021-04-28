import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { getRecipeById } from "../../modules/recipeManager"
import { InstructionsLister } from "./Instructions"
import {IngredientsLister} from "./Ingredients"


export const RecipeEditForm = () => {
    const { recipeId } = useParams()
    const history = useHistory();
    const [recipe, setRecipe] = useState([])
    const [instructions, setInstructions] = useState([""])
    const [ingredients, setIngredients] = useState([""])

    useEffect(() => {
        getRecipeById(recipeId).then((recipeFromApi) => {
            setRecipe(recipeFromApi);
            setInstructions(recipeFromApi.instructions);
            setIngredients(recipeFromApi.ingredientsList);
        })
    }, [])

    return (<>
        <div>
            <h2>Recipe Name:{recipe.recipeName}</h2>
            <button>Save</button>
            <button>Delete</button>
            <button>Search</button>
            <div>
                <input type="text" defaultValue={recipe.recipeName}/>
            </div>
            <div id="recipe">
                <div>
                    ingredients: {ingredients.map((ingredient,index)=>{
                        return <IngredientsLister 
                        key={"ingredient__"+index}
                        Ingredients={ingredient}
                        index={index}
                        />
                    })}
                </div>
                {/* Lists all steps in order given for the recipe */}
                <div>
                    instructions: {instructions.map((insturction, index)=>{
                        return <InstructionsLister 
                            key={"instruction__"+index}
                            instruction={insturction}
                            index={index}
                            />
                    })}
                </div>
            </div>
            <input type="textarea" defaultValue={recipe.notes}/>
        </div>
    </>)
}