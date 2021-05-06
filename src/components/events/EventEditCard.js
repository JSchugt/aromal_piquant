import React from "react"
import "./events.css"

// ({meal, index, handleRemove, handleAdd, HandleOnChange})
export const EventEditCard = ({ meal, index,userMeals, handleRemoveMeal, handleOnChangeTime }) => {

    
    return (<>
    <div className="eventEditMeal">
        <div id="mealName"><h2>{meal.meal.mealName}</h2>
            <button onClick={(evt)=>handleRemoveMeal(index, meal, evt)}>Remove</button>
        </div>
        <input type="time" id="mealTime" onChange={(evt)=>handleOnChangeTime(meal.id,index,evt)}defaultValue={meal.mealTime} />

    </div></>)
}