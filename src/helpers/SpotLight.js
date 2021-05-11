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
        return mealObj
    }
    useEffect(() => {
        getSpotLightEventByEventId(eventMeal)
            .then(responseFromApi => {
                setSpotLightMeal(getEarliest(responseFromApi))
            })
    }, [])
    return (<>
            {spotLightMeal.map((item, i) => {
                return (<>
                    <div key={"spotligh__" + i}>
                        <h3 key={"spotLightH3__" + i}>{item.meal.mealName}</h3>
                        <h4 key={"spotLightH4__" + i}>{item.mealTime}</h4>
                    </div>
                    <SpotLightRecipe
                        key={"key_spot_item" + item.id}
                        recipe={item}
                    />
                </>)
            })}
    </>)

}