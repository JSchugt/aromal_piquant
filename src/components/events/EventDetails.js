import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { delteEventById, getEventMealByEventId } from "../../modules/eventsManager"
import { EventCard } from "./EventCard"
import { confirmAlert } from "react-confirm-alert"
import "./events.css"

export const EventDetails = () => {
    const { eventId } = useParams()
    const [event, setEvent] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEventMealByEventId(eventId).then(responseFromApi => {
            setEvent(responseFromApi)
        })
    }, [eventId])
    const handleEventMealOnClick = id => {
        history.push(`/meals/${id}`)
    }

    const handleDeleteEvent = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p className="cUiP">Confirm You Want To Delete This Event</p>
                        <p className="cUiP">This can't be undone</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                delteEventById(eventId)
                                    .then(history.push("/events"))
                                onClose();
                            }}
                        >
                            Yes, Delete it!
                        </button>
                    </div>
                );
            }
        });
    }



    return (<>
        <h1>Event Details</h1>
        <Link to={`/events/${eventId}/edit`}>
            <button >Edit Event</button>
        </Link>
        <button onClick={() => { handleDeleteEvent() }}>Delete</button>
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