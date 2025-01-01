<script lang="ts">
    import BackdropImage from "./backdrop_image/BackdropImage.svelte"
    import { Images } from "./backdrop_images/BackdropImages.svelte"
    import { GetGridBasedOnRatio } from "$lib/utils/AspectRatio"
    import { numIntroFinished, darkmode } from "$lib/store/store"
    import { Scroll, UpdateScroll, scrollX } from "$lib/utils/Scroll"
	import { onMount } from "svelte";

    const DURATION = 800.0
    const DELAY_DEVIDER = 2.5

    let gridAmmount: number
    let verticalMode: boolean
    let pageLoaded: boolean
    let enableScroll: boolean
    let introFinished: boolean
    let backdropEl: HTMLElement, parentEl: HTMLElement

    const images = () => {
        return $darkmode ? Images() : Images().reverse()
    }
    numIntroFinished.subscribe((val)=>{
        if (val === gridAmmount - 1){
            AssignAnimation(2)
            ToggleBlackOverlay(true)
            introFinished = true
        }
    })
    scrollX.subscribe((n)=>{
        UpdateScroll(verticalMode, n, parentEl)
    })
    function OnPageLoad(){
        SetGridAmmount()
        AssignAnimation(1)
        pageLoaded = true
    }
    function SetGridAmmount(){
        let result = GetGridBasedOnRatio(innerWidth, innerHeight)
        gridAmmount = result.gridAmmount
        verticalMode = result.verticalMode
        $scrollX = 0.0
    }
    function AssignAnimation(num: number){
        const root: HTMLElement | null = document.querySelector(":root")
        const dur = (gridAmmount + 1) * (DURATION / DELAY_DEVIDER)
        root?.style.setProperty('--anim-dur', dur.toString())
        backdropEl?.classList.add(`anim-scale-${num}`)
    }
    function ToggleBlackOverlay(enable: boolean){
        backdropEl?.classList.add(`black-overlay-${enable ? "enable" : "disable"}`)
    }
    onMount(() => {
        OnPageLoad()
    })
    
</script>

<svelte:window
on:resize={SetGridAmmount}
on:wheel={(e) => {
    if (enableScroll) {
        Scroll(e, verticalMode, gridAmmount, window)
    }
}}/>

<div class="rav-fill-screen overflow-hidden"
bind:this={parentEl}>
    <section class="flex gap-2 flex-row p-8 absolute w-60 h-32 top-0 z-50">
        <button class="w-1/2 top-0 bg-white"
        on:click={()=>{
            enableScroll = !enableScroll
            $scrollX = 0.0
        }}> Scroll </button>
        <button class="w-1/2 top-0 bg-white"
        on:click={()=>{
            $darkmode = !$darkmode
            pageLoaded = false
            setTimeout(() => {pageLoaded = true}, DURATION / 1.5)
        }}> Dark Mode </button>
    </section>

    <div class="grid h-full
    {verticalMode ? "grid-flow-row" : "grid-flow-col"}
    {enableScroll ? (gridAmmount === 4 ? "w-[300vw]" : "w-[400vw]") : "w-full"}"
    bind:this={backdropEl}>
        <!-- First 3-4 images -->
        {#each images().slice(0, gridAmmount) as imgData, i}
            {#if pageLoaded }
                <BackdropImage
                    bind:imgData
                    bind:index={() => i, (_) => null}
                    bind:duration={() => DURATION, (_) => null}
                    bind:delayDevider={() => !introFinished ? DELAY_DEVIDER : 0, (_) => null}/>
            {/if}
        {/each}
        
        <!-- Rest of the images -->
        {#if enableScroll}
            {#each images().slice(gridAmmount, images().length) as imgData, i}
                    <BackdropImage bind:imgData/>
            {/each}
        {/if}
    </div>
</div>

<style>
    :global(:root){
        --anim-dur: 0;
    }
    :global(.black-overlay-enable){
        @apply pointer-events-none opacity-80;
    }
    :global(.black-overlay-disable){
        @apply pointer-events-none opacity-100;
    }
    :global(.anim-scale-1) {
        animation-name: s-1;
        animation-duration: calc(var(--anim-dur) * 1ms);
        animation-timing-function: ease-in-out;
    }
    :global(.anim-scale-2) {
        animation-name: s-2;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
    }
    @keyframes s-1{
        from { scale: 125%; }
        to { scale: 115%; }
    }
    @keyframes s-2{
        from { scale: 115%; }
        to { scale: 100%; }
    }
</style>