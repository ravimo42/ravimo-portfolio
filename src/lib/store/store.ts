import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const numIntroFinished = writable(0)
export const darkmode = writable(browser && localStorage.getItem("darkmode") || true)

darkmode.subscribe((val) => {
  browser && localStorage.setItem("darkmode", val.toString())
})