import React from "react"

export const EventEditAdd = ({ handleOnChange, handleAdd, handleRemove, length, newEditMeal, userMeals, i }) => {


    return (<div>
        <h2>{newEditMeal.mealTime}</h2>
        <select onChange={(evt) => handleOnChange(evt, i)} id="mealId">
            <option id="mealId" value="0">Select A Meal</option>
            {userMeals.map((innerMeal) => {
                return (
                    <option key={innerMeal.id} id="mealId" value={innerMeal.id}>{innerMeal.mealName}</option>
                )
            })}
        </select>
        <input type="time" id="mealTime" defaultValue="00:01" onChange={(evt) => handleOnChange(evt, i)} />
        <div>
            {length !== 1 && <button
                className="removeEventMealButton"
                onClick={() => handleRemove(i)}>Remove</button>}
            {length - 1 === i ? <button onClick={handleAdd}>Add</button> : ""}
        </div>
    </div>)

}