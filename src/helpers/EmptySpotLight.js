import React from "react"
import { useHistory } from "react-router"
import "../components/Home.css"

export const EmptySpotLight = () => {
    const history = useHistory()
    return (
        <div>
            <h2>Let's Plan Your Path Ahead</h2>

            <div onClick={()=>history.push("/recipes")} className="empty_spot_light_splash"> Add Recipes</div>

            <div onClick={()=>history.push("/meals")} className="empty_spot_light_splash"> Create A meal</div>
            <div onClick={()=>history.push("events")} className="empty_spot_light_splash">Plan an event</div>
        </div>
    )
}