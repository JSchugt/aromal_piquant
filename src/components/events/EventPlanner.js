import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { getEventsByUserId } from "../../modules/eventsManager"
import { EventCard } from "./EventCard"
import "./events.css"
import {userStorageKey} from "../auth/authSettings"

export const EventPlanner = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()
    useEffect(()=>{
        getEventsByUserId(sessionStorage.getItem(userStorageKey))
        .then(responseFromApi => {setEvents(responseFromApi)})
    },[])
    const handleEventOnClick =(evt)=>{
        evt.preventDefault()
        history.push(`/events/${evt.target.id}`)
    }
    return (
        <>
        {events.map(evt => {
            return <div  onClick={handleEventOnClick} className="eventDatePlanner"><h2 id={evt.id}>{evt.eventDate}</h2></div>
        })}
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