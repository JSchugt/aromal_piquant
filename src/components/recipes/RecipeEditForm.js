import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { cookTimeToString, prepTimeToStraing, splitInstructionsIngrendiens, splitTime } from "../../helpers/measurements"
import { getRecipeById, getRecipesByUser, deleteRecipeById, updateRecipeById } from "../../modules/recipeManager"
import {userStorageKey} from "../auth/authSettings"


export const RecipeEditForm = () => {
    const { recipeId } = useParams()
    const history = useHistory();
    // const [recipe, setRecipe] = useState([])
    const [instructions, setInstructions] = useState([""])
    const [ingredients, setIngredients] = useState([""])
    const [notes, setNotes] = useState([""])
    const [mealName, setMealName] = useState([""])
    const [prepTime, setPrepTime] = useState({})
    const [cookTime, setCookTime] = useState({})
    // Parse Recipe object from the data base
    //TODO: Look into refactoring this code
    useEffect(() => {
        getRecipeById(recipeId).then((recipeFromApi) => {
            // setRecipe(recipeFromApi);
                setInstructions(splitInstructionsIngrendiens(recipeFromApi.instructions));
          // setInstructions(splitInstructionsIngrendiens(recipeFromApi.instructions));
            setIngredients(splitInstructionsIngrendiens(recipeFromApi.ingredientsList));
            setNotes(recipeFromApi.notes);
            setMealName(recipeFromApi.recipeName);
            setCookTime({
                cookHours: splitTime(recipeFromApi.cookTime)[0],
                cookMinutes: splitTime(recipeFromApi.cookTime)[1]
            });
            setPrepTime( {
                prepHours: splitTime(recipeFromApi.prepTime)[0],
                prepMinutes: splitTime(recipeFromApi.prepTime)[1] 
            });
        })
    }, [recipeId])

    //Deletes the current recipe based on the recipe from the use params
    const handleDeleteRecipe = () => {
        deleteRecipeById(recipeId).then(() => getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(() => history.push("/recipes")))
    }
    // handle input change
    // name is the form field that the information the input is comming from
    // Instead of using target id
    const handleInputChange = (evt, index) => {
        let temp = [...ingredients];
        temp[index] = evt.target.value;
        setIngredients(temp);
    };
    const handleInstructionInputChange = (evt, index) => {
        let temp = [...instructions];
        temp[index] = evt.target.value;
        setInstructions(temp);
    };
    // handle click event of the Remove button
    const handleRemoveIngredientClick = index => {
        const temp = [...ingredients];
        // let kick = temp.splice(index, 1);
        setIngredients(temp);
    };
    const handleRemoveInstructionClick = index => {
        const temp = [...instructions];
        temp.splice(index+1, 1);
        setInstructions(temp);
    };
    // handle click event of the Add button
    const handleAddIngredientClick = () => {
        setIngredients([...ingredients,  "" ]);
    };
    // handle click event of the Add button
    const handleAddInstructionClick = () => {
        setInstructions([...instructions,  "" ]);
    };
    const handleNotesOnChange = (evt) => {
        if (evt.target.id === "notes") {
            setNotes(evt.target.value)
        } else if (evt.target.id === "mealName") {
            setMealName(evt.target.value)
        }
    }
    const handleTimeOnChange = (evt) => {
        if(evt.target.name === "cookHours" || evt.target.name === "cookMinutes"){
            let temp = {...cookTime}
            temp[evt.target.name] = evt.target.value
            setCookTime(temp)

        }else if (evt.target.name === "prepHours" || evt.target.name === "prepMinutes"  ){
            let temp = {...prepTime}
            temp[evt.target.name] = evt.target.value
            setPrepTime(temp)
        }
    }
    // Handles saving recipe edit when the user selects save button
    const handleSaveRecipe = (evt) => {

        const recipeObj = {
            recipeName: mealName,
            ingredientsList: ingredients.join("_-_-_-_"),
            instructions: instructions.join("_-_-_-_"),
            notes: notes,
            prepTime: prepTimeToStraing(prepTime),
            cookTime:  cookTimeToString(cookTime),
            userId: parseInt(sessionStorage.getItem(userStorageKey)),
            id: recipeId
        }
        // Save recipe in database
        //Get the recipes from the data base
        // then go to the recipe just editied
        updateRecipeById(recipeObj)
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(()=> history.push(`/recipes/${recipeId}`))

    }
    return (
        <>
            <button onClick={handleSaveRecipe}>Save</button>
            <button onClick={handleDeleteRecipe}>Delete</button>
            <input type="text" name="mealName" onChange={handleNotesOnChange} id="mealName" defaultValue={mealName} />
            <div className="entryFields">
                <div className="ingredientField">
                    {ingredients.map((x, j) => {
                        return (
                            <>
                                <div className="box" key={`ingredient__${j}`} >
                                    <input

                                        name="ingredient"
                                        onChange={evt => handleInputChange(evt, j)}
                                        defaultValue={x}
                                    />
                                    <div className="btn-box">
                                        {ingredients.length !== 1 && <button
                                            className="recipeRemoveButton"
                                            onClick={() => handleRemoveIngredientClick(j)}>Remove</button>}
                                        {ingredients.length - 1 === j && <button onClick={handleAddIngredientClick}>Add</button>}
                                    </div>
                                </div>
                            </>);
                    })}
                </div>
                <div>
                    {instructions.map((y, i) => {
                        return (
                            <>
                                <div className="box" key={`instruction__${i}`}>
                                    <input
                                        name="instruction"
                                        onChange={evt => handleInstructionInputChange(evt, i)}
                                        defaultValue={y}
                                    />
                                    <div className="btn-box">
                                        {instructions.length !== 1 && <button
                                            className="recipeRemoveButton"
                                            onClick={() => handleRemoveInstructionClick(i)}>Remove</button>}
                                        {instructions.length - 1 === i && <button onClick={handleAddInstructionClick}>Add</button>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div>
                <div className="recipePrepCookTime">Prep Time</div>
                <input type="number" onChange={handleTimeOnChange} name="prepHours" min="0" max="99" defaultValue={prepTime.prepHours}></input>:
                <input type="number" onChange={handleTimeOnChange} name="prepMinutes" min="0" max="59" defaultValue={prepTime.prepMinutes}></input>
            </div>
            <div>
                <div className="recipePrepCookTime">Cook Time</div>
                <input type="number" onChange={handleTimeOnChange} name="cookHours" min="0" max="99" defaultValue={cookTime.cookHours}></input>:
                <input type="number" onChange={handleTimeOnChange} name="cookMinutes" min="0" max="59" defaultValue={cookTime.cookMinutes}></input>
            </div>
            <div>
                <textarea id="notes" name="notes" defaultValue={notes} onChange={handleNotesOnChange}></textarea>
            </div>
        </>
    );
}