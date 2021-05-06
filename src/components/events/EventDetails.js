import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { getEventMealByEventId } from "../../modules/eventsManager"
import { EventCard } from "./EventCard"


export const EventDetails = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEventMealByEventId(eventId).then(responseFromApi => {
            setEvent(responseFromApi)
        })
    }, [])
    const handleEventMealOnClick = id => {
        history.push(`/meals/${id}`)
    }
    return (<>
        <h1>Event Details</h1>
        <Link to={`/events/${eventId}/edit`}>
            <button>Edit Event</button>
        </Link>
        {event.map(meal => {
            return (<>
                <EventCard
                    key={"meal__" + meal.id}
                    meal={meal}
                    handleEventMealOnClick={handleEventMealOnClick}
                />
            </>)
        })}
    </>)
}