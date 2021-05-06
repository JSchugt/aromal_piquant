import React, { useState } from "react"
import { useHistory } from "react-router";
import {createNewRecipe, getRecipesByUser} from "../../modules/recipeManager"
import { userStorageKey } from "../auth/authSettings";
import "./Recipes.css"
// import { IngredientsLister } from "./Ingredients";


export const RecipeEntryForm = () => {
    const history = useHistory()
    const [ingredientList, setIngredientList] = useState([{ ingredient: "" }]);
    const [instructionList, setInstructionList] = useState([{ instruction: "" }])
    const [notes, setNotes] = useState([""])
    const [mealName, setMealName] = useState([""])
    const [prepTime, setPrepTime] = useState({ prepHours: 0, prepMinutes: 0 })
    const [cookTime, setCookTime] = useState({ cookHours: 0, cookMinutes: 0 })
    // handle input change
    // name is the form field that the information the input is comming from
    // Instead of using target id
    const handleInputChange = (evt, index) => {
        const { name, value } = evt.target;
        const temp = [...ingredientList];
        temp[index][name] = value;
        setIngredientList(temp);
    };
    const handleInstructionInputChange = (evt, index) => {
        const { name, value } = evt.target;
        const temp = [...instructionList];
        temp[index][name] = value;
        setInstructionList(temp);
    };
    // handle click event of the Remove button
    const handleRemoveIngredientClick = index => {
        const temp = [...ingredientList];
        temp.splice(index, 1);
        setIngredientList(temp);
    };
    const handleRemoveInstructionClick = index => {
        const temp = [...instructionList];
        temp.splice(index, 1);
        setInstructionList(temp);
    };
    // handle click event of the Add button
    const handleAddIngredientClick = () => {
        setIngredientList([...ingredientList, { ingredient: "" }]);
    };
    // handle click event of the Add button
    const handleAddInstructionClick = () => {
        setInstructionList([...instructionList, { instruction: "" }]);
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
    const handleSaveRecipe = (evt) => {
        const recipeObj = {
            recipeName: mealName,
            ingredientsList: [...ingredientList].map(item => { return item.ingredient }),
            instructions: [...instructionList].map(item => { return item.instruction }),
            notes: notes,
            prepTime: prepTime,
            cookTime: cookTime,
            userId: 1
        }
        // Save recipe in database
        createNewRecipe(recipeObj)
        //Get the recipes from the data base
        // then go to recipes main page
        getRecipesByUser(sessionStorage.getItem(userStorageKey)).then(()=> history.push("/recipes"))
    }
    return (
        <>
            <input type="text" name="mealName" onChange={handleNotesOnChange} id="mealName" placeholder="Meal Name" />
            <div className="entryFields">
                <div className="ingredientField">
                    {ingredientList.map((x, i) => {
                        return (
                            <>
                                <div className="box" key={`ingredient__${i}`} >
                                    <input

                                        name="ingredient"
                                        placeholder={"ingredient " + (i + 1) + ":"}
                                        value={x.ingredient}
                                        onChange={evt => handleInputChange(evt, i)}
                                    />
                                    <div className="btn-box">
                                        {ingredientList.length !== 1 && <button
                                            className="recipeRemoveButton"
                                            onClick={() => handleRemoveIngredientClick(i)}>Remove</button>}
                                        {ingredientList.length - 1 === i && <button onClick={handleAddIngredientClick}>Add</button>}
                                    </div>
                                </div>
                            </>);
                    })}
                </div>
                <div>
                    {instructionList.map((x, i) => {
                        return (
                            <>
                                <div className="box" key={`instruction__${i}`}>
                                    <input

                                        name="instruction"
                                        placeholder={"instruction " + (i + 1) + ":"}
                                        value={x.instruction}
                                        onChange={evt => handleInstructionInputChange(evt, i)}
                                    />
                                    <div className="btn-box">
                                        {instructionList.length !== 1 && <button
                                            className="recipeRemoveButton"
                                            onClick={() => handleRemoveInstructionClick(i)}>Remove</button>}
                                        {instructionList.length - 1 === i && <button onClick={handleAddInstructionClick}>Add</button>}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <div>
                <div  className="entryTime">Prep Time</div>
                <input type="number" onChange={handleTimeOnChange} name="prepHours" min="0" max="99" placeholder="Hours"></input>:
                <input type="number" onChange={handleTimeOnChange} name="prepMinutes" min="0" max="59" placeholder="Minutes"></input>
            </div>
            
            <div  className="entryTime">Cook Time</div>
                <input type="number" onChange={handleTimeOnChange} name="cookHours" min="0" max="99" placeholder="Hours"></input>:
                <input type="number" onChange={handleTimeOnChange} name="cookMinutes" min="0" max="59" placeholder="Minutes"></input>
            <div>
                <textarea className="entryNotes" id="notes" name="notes" placeholder="Note for recipe" onChange={handleNotesOnChange}></textarea>
            </div>
            <button onClick={handleSaveRecipe}>Save Recipe</button>
        </>
    );
}