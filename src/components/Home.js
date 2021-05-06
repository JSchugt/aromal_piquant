import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { SpotLight } from "../helpers/SpotLight"
import { getEventsByUserId, getSpotlighEventMealsByUserIs } from "../modules/eventsManager"
import { userStorageKey } from "./auth/authSettings"

export const DashBoard = () => {
    const [events, setEvents] = useState([])
    const [spotLight, setSpotLight] = useState([])
    const history = useHistory()
    const getSoonest = (eventsToBeSorted) => {
        const now = new Date()

        let sorted = eventsToBeSorted.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.eventDate) - Date.parse(nextEntry.eventDate)
        )
        let future = []
        let completed = []
        for (let i = 0; i < sorted.length; i++) {
            if (Date.parse(sorted[i].eventDate) > (Date.now() - 86400000).toFixed(0)) {
                future.push(sorted[i])
            } else {
                completed.push(sorted[i])
            }
        }
        setEvents([...future][0])
        // return [...sorted]
    }
    useEffect(() => {
        getEventsByUserId(sessionStorage.getItem(userStorageKey))
            .then(responseFromApi => { getSoonest(responseFromApi) })
    }, [])
    useEffect(() => {
        getSpotlighEventMealsByUserIs(sessionStorage.getItem(userStorageKey))
            .then(responseFromApi => {
                setSpotLight(responseFromApi)
            })
    })
    const handleEventOnClick = (evt) => {
        evt.preventDefault()
        history.push(`/events/${evt.target.id}`)
    }

    return (
        <>
            <div className="allEvents">
                <div>
                    <h2>Current And Pending Events</h2>
                    <div onClick={handleEventOnClick} className="eventDatePlanner">
                        <h2 id={events.id}>
                            {events.eventDate}
                        </h2>
                    </div>
                    <SpotLight
                        key={"spotLIght"}
                        eventMeal={1}
                    />
                </div>
            </div>
        </>
    )
}
