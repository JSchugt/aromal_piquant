import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getEventsByUserId } from "../../modules/eventsManager"
import "./events.css"
import { userStorageKey } from "../auth/authSettings"
import { monthToString } from "../../helpers/dateHelper"

export const EventPlanner = () => {
    const [events, setEvents] = useState([])
    const [historicEvents, setHistoricEvents] = useState([])
    const history = useHistory()
    const getSoonest = (eventsToBeSorted) => {
        // const now = new Date()

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
        setHistoricEvents([...completed])
        setEvents([...future])
        // return [...sorted]
    }
    useEffect(() => {
        getEventsByUserId(sessionStorage.getItem(userStorageKey))
            .then(responseFromApi => { getSoonest(responseFromApi) })
    }, [])
    const handleEventOnClick = (evt) => {
        evt.preventDefault()
        history.push(`/events/${evt.target.id}`)
    }
    return (
        <>
            <div className="allEvents">
                <div>
                    <h2 className="planColumn">Plans To Be</h2>
                    <Link to={"/events/create"}>
                        <button>Add Event</button>
                    </Link>
                    <div className="grid-container">
                    {events.map(evt => {
                        // Gets date for event converts it to MMM DD and returns tile for the grid
                        return <div key={evt.id} onClick={handleEventOnClick}  id={evt.id}>{monthToString(evt.eventDate.slice(5))}</div>
                    })}
                    </div>
                </div>
                <div>
                    <h2 className="planColumn">Historic Events</h2>
                    <div className="historic-grid-container">
                    {historicEvents.map(evt3 => {
                        return <div key={evt3.id} onClick={handleEventOnClick} id={evt3.id}>{evt3.eventDate}</div>
                    })}
                    </div>
                </div>
            </div>

        </>
    )
}