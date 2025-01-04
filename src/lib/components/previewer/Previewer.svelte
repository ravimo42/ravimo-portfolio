<script lang="ts">
    import { enableScroll } from "$lib/store/store"
	import { LoadImage } from "$lib/utils/Preloaders"
	import Win10Loading from "$lib/utils/effects/Win10Loading.svelte"

    export let imgData: any
    export let openPreviewer: boolean

    let containerEl: HTMLElement
    let init = false
    let info = false
    let imgHD = imgData.imgHD.default
    let imgMeta = imgData.imgMetadata.default
    
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
        if (!init) return
        containerEl.classList.add("close-previewer")
    }
    function DisplayInfo(){
        info = !info
        if (info) return
        console.log(info)
    }
</script>
  
<span class="rav-flex-center fixed h-screen w-screen left-0 top-0 z-50">
    <div class="rav-fill-screen left-0 rav-translucent overflow-hidden animate-previewer"
    bind:this={containerEl}
    on:animationend={AnimationEnd}>

        {#await LoadImage(imgHD.img.src)}
        <!-- Loading animation -->
        <Win10Loading/>
        
        {:then _}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <enhanced:img
            class="rav-fill-screen min-h-screen min-w-[100vw] object-contain"
                src={imgData.imgHD.default}
                alt=""
                loading="lazy"
                on:click={()=>{}}/>
        {/await}
        
    <!-- Buttons -->
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <span class="text-xl absolute flex flex-col justify-between p-12 top-0 right-0 h-full z-50">
        <button class="shadow-xl bg-white rounded-full active:scale-90 duration-100 w-16 h-16"
        on:click={OnClick}>
            <i class="nf nf-md-close" >
        </button>
        <span class="shadow-xl flex flex-col items-center gap-0 bg-white w-full rounded-full">
            <a class="prev-a" target="_blank" href="{imgHD.img.src}">
                <i class="nf nf-fa-magnifying_glass">
            </a>
            <span class="bg-black w-full h-[2px]"></span>
            <button class="prev-a"
            on:click={DisplayInfo}>
                <i class="nf nf-fa-question">
            </button>
            <span class="bg-black w-full h-[2px]"></span>
            <a class="prev-a" href="{imgHD.img.src}" download={imgMeta.name}>
                <i class="nf nf-oct-download">
            </a>
        </span>
    </span>
    </div>
</span>

<style>
    .prev-a{
        @apply w-full h-16 flex justify-center items-center;
    }
    :global(.animate-previewer) {
        animation-name: previewer;
        animation-duration: 0.75s;
        animation-timing-function: ease-in-out;
    }
    :global(.close-previewer) {
        animation-name: close;
        animation-duration: 0.75s;
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