import { userStorageKey } from "../components/auth/authSettings";
import { API } from "../Settings"

export const getMealsByUserId = (id) => {
    return fetch(`${API.baseUrl}:8088/meals?userId=${id}`)
        .then(res => res.json());
}

export const createEvent = (eventObj) => {
    return fetch(`${API.baseUrl}:8088/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    }).then((res) => res.json())
}

export const createEventMeals = (eventId, eventMealObj) => {
    let sendObj = {
        mealId: parseInt(eventMealObj.mealId),
        eventId: eventId,
        mealTime: eventMealObj.mealTime
    }
    return fetch(`${API.baseUrl}:8088/eventMeals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendObj)
    }).then((res) => res.json())
}

export const getEventsByUserId = (id) => {
    return fetch(`${API.baseUrl}:8088/events?userId=${id}`)
        .then((res) => res.json())
}

export const getEventMealByEventId = (id) => {
    return fetch(`${API.baseUrl}:8088/eventMeals?eventId=${id}&_expand=event&_expand=meal`)
        .then((res) => res.json())
}

export const editEventMealTime = (timeObj, eventId) => {
    return fetch(`${API.baseUrl}:8088/eventMeals/${parseInt(eventId)}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(timeObj)
    }).then((res) => res.json())
}

export const eventEditRemoveMeal = (id) => {
    return fetch(`${API.baseUrl}:8088/eventMeals/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}

export const eventEditNoEventMeals = (id) => {
    return fetch(`${API.baseUrl}:8088/events/${id}`)
        .then((res) => res.json())
}

export const eventEditDateUpdate = (date, eventId) => {
    let eventObj = {
        eventDate: date,
        userId: parseInt(sessionStorage.getItem(userStorageKey))
    }
    return fetch(`${API.baseUrl}:8088/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
    }).then((res) => res.json())
}


export const updateEventEventMeals = (eventMealObj) => {
    let sendObj = {
        mealId: parseInt(eventMealObj.mealId),
        mealTime: eventMealObj.mealTime,
        eventId: parseInt(eventMealObj.eventId)
    }
    return fetch(`${API.baseUrl}:8088/eventMeals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendObj)
    }).then((res) => res.json())
}

export const delteEventById = (id) => {
    return fetch(`${API.baseUrl}:8088/events/${id}`, {
        method: "DELETE"
    }).then((res) => { res.json() })

}

export const getSpotlighEventMealsByUserIs = (id)=>{
    return fetch(`${API.baseUrl}:8088/eventMeals?_expand=meal&userId${id}`)
    .then((res)=> res.json())
}

export const getSpotLightEventByEventId = (id) => {
    return fetch(`${API.baseUrl}:8088/eventMeals?eventId=${id}&_expand=meal&_expand=event`)
    .then((res)=> res.json())
}