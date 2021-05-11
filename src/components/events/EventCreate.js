import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { createEvent, createEventMeals, getMealsByUserId } from "../../modules/eventsManager"
import { userStorageKey } from "../auth/authSettings"
import { confirmAlert } from "react-confirm-alert"
import "./events.css"
export const EventCreate = () => {
    const date = new Date()
    const history = useHistory()
    const [userMeals, setUserMeals] = useState([])
    const [eventMeals, setEventMeals] = useState([{ mealTime: "00:01", mealId: "0" }])
    const [eventObj, setEventObj] = useState({
        userId: parseInt(sessionStorage.getItem(userStorageKey)),
        eventDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    })
    // Events
    useEffect(() => {
        getMealsByUserId(sessionStorage.getItem(userStorageKey)).then(response => {
            setUserMeals(response)
        })
    }, [])
    const handleRemoveMeal = (i) => {
        let temp = [...eventMeals];
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
        let tempMeal = []
        eventMeals.forEach(meal => {
            if (meal.mealId === "0" || meal.mealId === 0) {
            }
            else {
                tempMeal.push(meal)
            }
        })
        if (tempMeal.length > 0) {
            setEventMeals([...tempMeal])
            createEvent(eventObj)
                .then(responseFromApi => {
                    eventMeals.map(res => {
                        if (res.mealId !== 0 && res.mealId !== "0") {
                            createEventMeals(responseFromApi.id, res)

                        }
                        return true
                    })
                }).then(() => { history.push("/events") })
        } else {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div key={"custom_ui_confirm_alert"} className='custom-ui'>
                            <h1 key={"confirm_alert_h1"}>No Meal Was Selected</h1>
                            <button key={"confirm_alert_close_button"} onClick={onClose}>Ok</button>
                        </div>
                    );
                }
            });

        }
    }
    return (<>
        <h1 key={"event_create_title"}>Lets Plan Somthing</h1>
        <button key={"event_create_handle_on_save"} onClick={handleOnSave}>Save Event</button>
        <div key={"event_create_input_contain_div"}>
            <input key={"event_create_set_date"} type="date" id="eventDate" onChange={handleOnChange} defaultValue={eventObj.eventDate}></input>
        </div>
        {/* Begin Drop Down Seciton */}
        <section key={"event_create_add_meal_section"}>
            {eventMeals.map((item, i) => {
                return (<>
                    <div key={"event_create_div_before_selection"}>
                        <label key={"label_for_event_create_section"} className="labelCreateEvent">Meal</label>
                        <div key={"div_inside_selection_create_event"}>
                            <select key={"meal_field_select"+i} id="mealId" onChange={(evt) => handleEventMealsOnChange(evt, i)} >
                                <option key={"meal_option__"+i+"__"+0} value="0">Select A Meal</option>
                                {userMeals.map(meal => {
                                    return (<option key={"meal_option__"+i+"__"+meal.id} value={meal.id} >{meal.mealName}</option>)
                                })}
                            </select>
                            <input key={"input_time_event_create"+i} type="time" id="mealTime" defaultValue="00:01" onChange={(evt) => handleEventMealsOnChange(evt, i)} />
                        </div>
                    </div>
                    {eventMeals.length !== 1 && <button
                    key={"event_create_remove_button"+i}
                        className="recipeRemoveButton"
                        onClick={() => handleRemoveMeal(i)}>Remove</button>}
                    {eventMeals.length - 1 === i && <button key={"event_create_add_meal_button"} onClick={handleAddMealClick}>Add</button>}
                </>)
            })}

        </section>
        {/* End Drop Down Section */}
    </>)
}