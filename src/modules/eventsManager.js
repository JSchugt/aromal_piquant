import { API } from "../Settings"

export const getMealsByUserId = (id) => {
    return fetch(`${API.baseUrl}:8088/meals?userId=${id}`)
    .then(res => res.json());
}

export const createEvent = (eventObj) =>{
    return fetch(`${API.baseUrl}:8088/events`,{
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
        return fetch(`${API.baseUrl}:8088/eventMeals`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendObj)
            }).then((res) => res.json())
}