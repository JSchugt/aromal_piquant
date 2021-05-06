import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getEventsByUserId } from "../../modules/eventsManager"
import { EventCard } from "./EventCard"
import "./events.css"
import { userStorageKey } from "../auth/authSettings"

export const EventPlanner = () => {
    const [events, setEvents] = useState([])
    const [historicEvents, setHistoricEvents] = useState([])
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
                    <h2>Current And Pending Events</h2>
                    {events.map(evt => {
                        return <div onClick={handleEventOnClick} className="eventDatePlanner"><h2 id={evt.id}>{evt.eventDate}</h2></div>
                    })}
                </div>
                <div>
                    <h2>Historic Events</h2>
                {historicEvents.map(evt3 => {
                        return <div onClick={handleEventOnClick} className="eventDatePlanner"><h2 id={evt3.id}>{evt3.eventDate}</h2></div>
                    })}
                </div>
            </div>
            <Link to={"/events/create"}>
                <button>Add Event</button>
            </Link>
        </>
    )
}


// <div id="eventPlanner">
//                 <div id="eventPlannerTitle">
//                     <h2 >Event Planner</h2>
//                 </div>
//                 <div id="eventsBody">
//                     <div id="eventsList">
//                         <EventCard />
//                         <EventCard />
//                         <EventCard />
//                         <EventCard />
//                         <EventCard />
//                         <EventCard />
//                         <EventCard />
//                     </div>
//                     <div id="historicEvents">
//                         <EventCard />

//                     </div>
//                 </div>

//             </div>