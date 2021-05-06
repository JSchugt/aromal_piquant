import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { editEventMealTime, eventEditDateUpdate, eventEditNoEventMeals, eventEditRemoveMeal, getEventMealByEventId, getMealsByUserId, updateEventEventMeals } from "../../modules/eventsManager"
import { confirmAlert } from "react-confirm-alert"
import { EventEditCard } from "./EventEditCard"
import { userStorageKey } from "../auth/authSettings"
import { EventEditAdd } from "./EventEditAdd"

export const EventEdit = () => {
    const history = useHistory()
    const { eventId } = useParams()
    const [event, setEvent] = useState([])
    const [eventObj, setEventObj] = useState([{}])
    const [userMeals, setUserMeals] = useState([])
    const [newEditMeals, setNewEditMeals] = useState([])
    useEffect(() => {
        getEventMealByEventId(eventId).then(responseFromApi => {
            if (responseFromApi.length > 0) {
                setEvent(responseFromApi)
                setEventObj({ eventDate: responseFromApi[0].event.eventDate })
            } else {
                eventEditNoEventMeals(eventId)
                    .then(resFromAPI => {
                        setEventObj({ eventDate: resFromAPI.eventDate })
                    })
            }
        })

    }, [])
    useEffect(() => {
        getMealsByUserId(sessionStorage.getItem(userStorageKey)).then(
            responseFromApi => {
                setUserMeals(responseFromApi)
            }
        )
    }, [])

    useEffect(() => {
        setNewEditMeals([{
            mealId: 0,
            mealTime: "00:00",
            eventId: eventId
        }])
    }, [])


    const handleOnChange = (evt) => {
        let temp = eventObj
        temp["eventDate"] = evt.target.value
        setEventObj(temp)
    }
    const handleOnChangeTime = (meal, index, evt) => {
        let tempObj = {
            mealId: meal.meal.id,
            eventId: meal.eventId,
            mealTime: evt.target.value,
        }
        editEventMealTime(tempObj, meal.id).then(responseFromApi => {
        })
    }
    const handleRemoveMeal = (id, index, evt) => {
        eventEditRemoveMeal(index.id).then(() => {
            getEventMealByEventId(eventId)
                .then(responseFromApi => {
                    setEvent(responseFromApi)
                })
        })
    }
    const handleNewEventMealAddClick = (i) => {
        setNewEditMeals([...newEditMeals, {
            eventId: eventId,
            mealId: 0,
            mealTime: "00:00"
        }])
    }
    const hanldeNewEventEditRemoveOnClick = (i) => {
        let temp = [...newEditMeals]
        temp.splice(i, 1)
        setNewEditMeals(temp)

    }
    const handleNewTimeOnChnage = (evt, i) => {
        let selected = evt.target.value
        let temp = [...newEditMeals]
        if (evt.target.id === "mealTime") {
            temp[i]["mealTime"] = selected
        } else if (evt.target.id === "mealId") {
            temp[i]["mealId"] = selected
        }
        setNewEditMeals([...temp])
    }
    // meals added to the edit new
    const handleDeleteEvent = () => {

    }
    const handEventMealEditSave = () => {
        let temp = []
        for (let i = 0; i < newEditMeals.length; i++) {
            if (newEditMeals[i].mealId !== 0) {
                temp.push(newEditMeals[i])
            }
        }
        if (temp.length > 0) {
            temp.forEach((sendObj) => { return updateEventEventMeals(sendObj) })
            eventEditDateUpdate(eventObj.eventDate, eventId)
            getEventMealByEventId(eventId).then(() => { history.push(`/events/${eventId}`) })

        } else {
            eventEditDateUpdate(eventObj.eventDate, eventId)
            getEventMealByEventId(eventId).then(() => { history.push(`/events/${eventId}`) })
        }
    }
    return (<>
        <h1> Edit Event Set For</h1>
        <button onClick={handEventMealEditSave}>Save Edit</button>
        <input type="date" onChange={handleOnChange} id="eventDate" defaultValue={eventObj.eventDate}></input>
        {event.map((meal, i) => {
            return <EventEditCard key={meal.id} meal={meal} index={i} userMeals={userMeals} handleRemoveMeal={handleRemoveMeal} handleOnChangeTime={handleOnChangeTime}
            />
        })}
        {newEditMeals.map((meal, i) => {
            return <EventEditAdd key={i} handleOnChange={handleNewTimeOnChnage} handleAdd={handleNewEventMealAddClick} handleRemove={hanldeNewEventEditRemoveOnClick} length={newEditMeals.length} newEditMeal={meal} userMeals={userMeals} i={i}
            />
        })}
    </>)
}