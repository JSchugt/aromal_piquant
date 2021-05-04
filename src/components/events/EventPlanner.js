import React from "react"
import { Link } from "react-router-dom"
import { EventCard } from "./EventCard"
import "./events.css"

export const EventPlanner = () => {


    return (
        <>
            <div id="eventPlanner">
                <div id="eventPlannerTitle">
                    <h2 >Event Planner</h2>
                </div>
                <div id="eventsBody">
                    <div id="eventsList">
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                    </div>
                    <div id="historicEvents">
                        <EventCard />

                    </div>
                </div>
                <Link to={"/events/create"}>
                    <button>Add Event</button>
                </Link>
            </div>
        </>
    )
}