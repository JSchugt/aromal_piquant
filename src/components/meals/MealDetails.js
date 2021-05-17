import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { deleteMealById, getMealRecipeByMealId } from "../../modules/mealManager"
import { getMealsRecipeByUserId } from "../../modules/mealRecipeManager"
import { userStorageKey } from "../auth/authSettings"
import { confirmAlert } from "react-confirm-alert"


export const MealDetails = () => {
    const { mealsId } = useParams()
    const history = useHistory()
    const [mealName, setMealName] = useState([])
    const [recipe, setRecipe] = useState([])


    useEffect(() => {
        getMealRecipeByMealId(mealsId)
            .then((responseFromAPi) => {
                if (responseFromAPi.length > 0) {

                    // setMeals(responseFromAPi)
                    setMealName(responseFromAPi[0].meal.mealName)
                    setRecipe([...responseFromAPi.map((rec) => {
                        return rec.recipe
                    })])
                }
            })
    }, [mealsId])
    const handleRecipeClick = (evt) => {
        evt.preventDefault()
        history.push(`/recipes/${evt.target.id}`)
    }

    const handleDeleteMeal = (evt) => {
        evt.preventDefault()
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h1>Are you sure?</h1>
                        <p className="cUiP">Confirm You Want To Delete This Meal</p>
                        <p className="cUiP">This can't be undone</p>
                        <button onClick={onClose}>No</button>
                        <button
                            onClick={() => {
                                deleteMealById(mealsId)
                                    .then(() => { getMealsRecipeByUserId(sessionStorage.getItem(userStorageKey)) })
                                history.push("/meals")
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

    // Start jsx
    return (<div id="mainMealList">

        <h1>{mealName}</h1>
        <Link to={`/meals/${mealsId}/edit`}>
            <button>Edit</button>

        </Link>
        <button onClick={handleDeleteMeal}>Delete</button>
        { (recipe.length > 0) ? (recipe.map(item => {
            return <p key={item.id} className={"mealRecipeLister"} id={item.id} onClick={handleRecipeClick}>{item.recipeName}</p>
        })) : ""}

    </div>)


}