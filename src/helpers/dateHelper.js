const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

export const monthToString = (dater) =>{
    return `${months[parseInt(dater.split("-")[0]-1)]} ${dater.split("-")[1]}`
}