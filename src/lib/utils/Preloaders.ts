export function LoadImage(src: string){
    return new Promise((resolve) => {
        let img = new Image()
        img.onload = resolve
        img.src = src
    })
}