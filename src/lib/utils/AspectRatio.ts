export function GetGridBasedOnRatio(windowW: number, windowH: number){
    let gridAmmount: number
    let ratio = windowW/windowH

    if (ratio < 1.0) {
        gridAmmount = 1
    }
    else if (ratio < 1.5) {
        gridAmmount = 3
    }
    else {
        gridAmmount = 4
    }
    return gridAmmount
}