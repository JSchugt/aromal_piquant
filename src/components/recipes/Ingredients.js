import React from "react"

export const IngredientsInstructionLister = ({ insIng, length, handleOnChnage, handleAdd, handleRemove, index }) => {

    return (
        <div className="box"  >
            <input
                name="insIng"
                onChange={evt => handleOnChnage(evt, index)}
                defaultValue={insIng}
            />
            <div className="btn-box">
                {length !== 1 && <button
                    className="recipeRemoveButton"
                    onClick={() => handleRemove(index)}>Remove</button>}
                {length - 1 === index && <button onClick={handleAdd}>Add</button>}
            </div>
        </div>
    )
}