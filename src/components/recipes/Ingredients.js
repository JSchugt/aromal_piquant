import React from "react"

export const IngredientsLister = ({ Ingredients, index, handleOnChnage }) => {

    return (
        <>
            <form action="">
                <div id={"step__" + index}>
                <fieldset className="recipeEditFields">
                    <label form="instructions" className="instructions_steps">Item: {index+1}</label>
                    <input type="text" id={"ingredients__"+index} defaultValue={Ingredients} onChange={handleOnChnage}></input>
                </fieldset>
                </div>
            </form>
        </>
    )
}