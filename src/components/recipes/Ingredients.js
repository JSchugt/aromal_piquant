import React from "react"
import base from "../images/cuttingBoard.png"

export const IngredientsLister = ({ Ingredients, index, handleOnChnage }) => {
    let imgLink = base;
    if(Ingredients !== ""){
        imgLink=`https://spoonacular.com/cdn/ingredients_100x100/${Ingredients}.jpg`
    }
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