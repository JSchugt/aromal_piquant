import { waitForElementToBeRemoved } from "@testing-library/dom"

const measurements = [
    "cups",
    "tea spoons",
    "table spoons",
    "kilo gram",
    "grams",
    "milligrams",
    "pounds",
    "pinch",
    "liter",
    "mililiter"
]

export const ingredientToString = (transObj) => {
    let temp = [...transObj].map(item => {return item.ingredient}).join("_-_-_-_")
    return temp
}
export const instructToString = (transObj) => {
    let temp = [...transObj].map(item => { return item.instruction }).join("_-_-_-_")
    return temp
}

export const cookTimeToString = (transObj) => {
    let temp = transObj.cookHours + ":-:" + transObj.cookMinutes
    return temp
}

export const prepTimeToStraing = (transObj) => {
    let prepTemp = transObj.prepHours + ":-:" + transObj.prepMinutes
    return prepTemp
}

export const splitInstructionsIngrendiens = (transObj) => {
    let temp = transObj.split("_-_-_-_")
    return temp
}

export const splitTime = (transObj) => {
    let temp = transObj.split(":-:")
    return temp
}