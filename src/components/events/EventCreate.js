import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { createEvent, createEventMeals, getMealsByUserId } from "../../modules/eventsManager"
import { userStorageKey } from "../auth/authSettings"


export const EventCreate = () => {
    const history = useHistory()
    const [userMeals, setUserMeals] = useState([])
    const [eventMeals, setEventMeals] = useState([{ mealTime: "00:01", mealId: "0" }])
    const [eventObj, setEventObj] = useState({
        userId: parseInt(sessionStorage.getItem(userStorageKey)),
        eventDate: "2021-01-01"
    })
    // Events
    useEffect(() => {
        getMealsByUserId(1).then(response => {
            setUserMeals(response)
        })
    }, [])
    const handleRemoveMeal = (i) => {
        const temp = [...eventMeals];
        temp.splice(i, 1);
        setEventMeals(temp);
    }
    // Get event data
    const handleOnChange = (evt) => {
        let temp = { ...eventObj }
        if (evt.target.id === "eventDate") {
            temp[evt.target.id] = evt.target.value
            setEventObj(temp)
        } 

    }
    // Event Meals Section
    // Add new block for meal to event
    const handleAddMealClick = (evt) => {
        setEventMeals([...eventMeals, { mealTime: "00:01", mealId: "0" }])
    }
    // Set event meals object in array to values changed in code
    const handleEventMealsOnChange = (evt, i) => {
        let temp = [...eventMeals]
        if (evt.target.id === "mealTime") {
            temp[i][evt.target.id] = evt.target.value
        } else if (evt.target.id === "mealId") {
            temp[i][evt.target.id] = evt.target.value

        }
        setEventMeals(temp)
    }
    const handleOnSave = (evt) => {
        evt.preventDefault()
        createEvent(eventObj)
        .then(responseFromApi => { 
            console.log(responseFromApi.id)
            eventMeals.map( res => {createEventMeals(responseFromApi.id, res)})
        }).then(()=>{history.push("/events")})
    }
    return (<>
        <h1>Lets Plan Somthing</h1>
        <button onClick={handleOnSave}>Save Event</button>
        <div>
            <input type="text" id="eventMealName" onChange={handleOnChange} placeholder="Enter Event Name" />
            <input type="date" id="eventDate" onChange={handleOnChange} ></input>
        </div>
        {/* Begin Drop Down Seciton */}
        <section>
            {eventMeals.map((item, i) => {
                return (<>
                    <div>
                        <label>Meal</label>
                        <div>
                            <select id="mealId" onChange={(evt) => handleEventMealsOnChange(evt, i)}>
                                {userMeals.map(meal => {
                                    return (<option value={meal.id} >{meal.mealName}</option>)
                                })}
                            </select>
                            <input type="time" id="mealTime" onChange={(evt) => handleEventMealsOnChange(evt, i)} />
                        </div>
                    </div>
                    {eventMeals.length !== 1 && <button
                        className="recipeRemoveButton"
                        onClick={() => handleRemoveMeal(i)}>Remove</button>}
                    {eventMeals.length - 1 === i && <button onClick={handleAddMealClick}>Add</button>}
                </>)
            })}

        </section>
        {/* End Drop Down Section */}
    </>)
}