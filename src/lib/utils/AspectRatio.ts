export function GetGridBasedOnRatio(windowW: number, windowH: number){
    let gridAmmount: number
    let verticalMode: boolean
    let ratio = windowW/windowH

    if (ratio < 1.0) {
        gridAmmount = 2
        verticalMode = true
    }
    else if (ratio < 1.5) {
        gridAmmount = 3
        verticalMode = false
    }
    else {
        gridAmmount = 4
        verticalMode = false
    }
    return {
        gridAmmount: gridAmmount,
        verticalMode: verticalMode
    }
}