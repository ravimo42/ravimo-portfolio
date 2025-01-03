<script lang="ts">
    import { enableScroll } from "$lib/store/store"

    export let imgData: any
    export let openPreviewer: boolean

    let containerEl: HTMLElement
    let init = false

    function OnClick(){
        CloseAnimation()
    }
    function AnimationEnd(){
        SetBools()
        init = true
    }
    function SetBools(){
        if (!init) return
        openPreviewer = false
        $enableScroll = true
    }
    function CloseAnimation(){
        containerEl.classList.add("close-previewer")
    }
</script>
  
<span class="rav-flex-center fixed h-screen w-screen left-0 top-0 z-50">
    <div class="rav-fill-screen left-0 bg-black overflow-hidden animate-previewer"
    bind:this={containerEl}
    on:animationend={AnimationEnd}>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <enhanced:img
        class="rav-fill-screen min-h-screen min-w-[100vw] object-contain"
            src={imgData.imgHD.default}
            alt=""
            loading="lazy"
            on:click={()=>{}}/>
    </div>
    <button class="bg-black text-white absolute"
    on:click={OnClick}>
        CLOSE
    </button>
</span>

<style>
    :global(.animate-previewer) {
        animation-name: previewer;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
    }
    :global(.close-previewer) {
        animation-name: close;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
    }
    @keyframes previewer{
        from { width: 0; }
        to { width: 100vw; }
    }
    @keyframes close{
        from { width: 100vw; }
        to { width: 0; }
    }
</style>