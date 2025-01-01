
import { quintOut } from "svelte/easing"
import { tweened } from "svelte/motion"



export let scrollX = tweened(
    0.0,
    { duration: 1000, easing: quintOut }
)

export function Scroll(event: WheelEvent, verticalMode: boolean, gridAmmount: number, window: Window){
    scrollX.update((n: number) => {
        let dir = Math.sign(event.deltaY)
        let windowSize = (!verticalMode ? window.innerWidth : window.innerHeight)
        let length = windowSize / gridAmmount
        n = n + length * dir
        n = Math.min(n, (gridAmmount - (gridAmmount === 4 ? 2 : 0)) * windowSize)
        n = Math.max(n, 0)

        return n
    })
}
export function UpdateScroll(verticalMode: boolean, sX: number, BG: HTMLElement){
    if (!BG) return
    if (!verticalMode){
        BG.scrollLeft = sX
        BG.scrollTop = 0
        return
    }
    BG.scrollTop = sX
    BG.scrollLeft = 0
}