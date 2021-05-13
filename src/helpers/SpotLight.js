import React, { useEffect, useState } from "react"
import { getSpotLightEventByEventId } from "../modules/eventsManager"
import { SpotLightRecipe } from "./SpotLightRecipe"
import "../components/Home.css"
export const SpotLight = ({ eventMeal }) => {
    const [spotLightMeal, setSpotLightMeal] = useState([])
    const getEarliest = (mealObj) => {
        let sorted = mealObj.sort(
            (currentEntry, nextEntry) =>
                Date.parse(parseInt(currentEntry.mealTime.replace(":", "0"))) - Date.parse(parseInt(nextEntry.mealTime.replace(":", "0")))

        )
        return sorted
    }
    useEffect(() => {
        getSpotLightEventByEventId(eventMeal)
            .then(responseFromApi => {
                setSpotLightMeal(getEarliest(responseFromApi))
            })
    }, [eventMeal])
    return (<>
        {spotLightMeal.map((item, i) => {
            return (
                <div key={item.id} className="spot_ligh_meal_name">
                    <div >
                        <h3 >{item.meal.mealName}</h3>
                        <h4 >{item.mealTime}</h4>
                    </div>
                    <SpotLightRecipe
                        
                        recipe={item}
                    />
                </div>
            )
        })}
    </>)

}