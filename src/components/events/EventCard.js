import React from "react"
import "./events.css"

export const EventCard = ({meal, handleEventMealOnClick}) => {

    return <>
    <div onClick={() => handleEventMealOnClick(meal.id)}>
        <h2>{meal.meal.mealName}</h2>
        <h4>{meal.mealTime}</h4>
        </div>
    </>
}