import React from "react"


export const InstructionsLister = ({ instruction, index }) => {

    return (
        <>
            <form action="">
                <div id={"step__" + index}>
                <fieldset className="recipeEditFields">
                    <label form="instructions" className="instructions_steps">Step {index+1}</label>
                    <input type="text" id={"instructiosn__"+index} defaultValue={instruction}></input>
                </fieldset>
                </div>
            </form>
        </>
    )
}