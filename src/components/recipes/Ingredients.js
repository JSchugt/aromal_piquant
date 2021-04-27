import React from "react"


export const IngredientsLister = ({ Ingredients, index }) => {

    return (
        <>
            <form action="">
                <div id={"step__" + index}>
                <fieldset className="recipeEditFields">
                    <label form="instructions" className="instructions_steps">Item: {index+1}</label>
                    <img src="https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg" alt="bread" />
                    <input type="text" id={"instructiosn__"+index} defaultValue={Ingredients}></input>
                </fieldset>
                </div>
            </form>
        </>
    )
}