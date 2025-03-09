
import { quintOut } from "svelte/easing"
import { tweened } from "svelte/motion"

export let scrollX = tweened(
    0.0,
    { duration: 1000, easing: quintOut }
)

export function Scroll(event: WheelEvent, imgAmmount: number, gridAmmount: number, window: Window, backdropEl: HTMLElement){
    scrollX.update((n: number) => {
        let dir = Math.sign(event.deltaY)
        let backdropSize = backdropEl.scrollWidth
        let length = backdropSize / imgAmmount
        n = n + length * dir
        n = Math.min(n, length * (imgAmmount - gridAmmount))
        n = Math.max(n, 0)

        return n
    })
}
export function UpdateScroll(sX: number, BG: HTMLElement){
    if (!BG) return
    BG.scrollLeft = sX
    BG.scrollTop = 0
}