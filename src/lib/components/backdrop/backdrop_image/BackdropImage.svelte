<script lang='ts'>
    import { fly } from "svelte/transition"
	import { quintOut } from "svelte/easing"
    import { numIntroFinished, enableScroll } from "$lib/store/store"
	import { LoadImage } from "$lib/utils/Preloaders"
    import Previewer from "$lib/components/previewer/Previewer.svelte"
	import Win10Loading from "$lib/utils/effects/Win10Loading.svelte"

    export let imgData: any
    export let index = 0
    export let duration = 0
    export let delayDevider = 0

    let openPreviewer = false
    let hover = false
    let imgLow = imgData.imgLow.default
    let imgMeta = imgData.imgMetadata.default

    function ImageOnClick(){
        if (!$enableScroll) return
        openPreviewer = true
        $enableScroll = false
    }
    function Hover(what: boolean){
        hover = what
    }

</script>

<section class="{openPreviewer ? "" : "z-10"} {$enableScroll ? "bg-white" : "bg-slate-800"} w-full h-full duration-300"
transition:fly={{
        delay: delayDevider !== 0 ? duration / delayDevider * index : 0,
        duration: duration,
        opacity: 0,
        y: innerHeight * (index % 2 ? -1 : 1),
        easing: quintOut,
    }}
    on:introend={() => { if (duration !== 0) $numIntroFinished += 1}}>
    
    <!-- Loading Image -->
    {#await LoadImage(imgLow.img.src)}
    <Win10Loading/>

    {:then _} 
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->

    <!-- Image Image -->
    <enhanced:img
        class="object-cover h-full {$enableScroll ? "cursor-pointer hover:scale-[98%]" : "" } duration-300"
        src={imgData.imgLow.default}
        alt=""
        loading="lazy"
        on:click={ImageOnClick}
        on:mouseenter={()=>{Hover(true)}}
        on:mouseleave={()=>{Hover(false)}}>
    
    </enhanced:img>
    {/await}
    
    <!-- Image Metadata -->
    {#if hover && $enableScroll}
    <div class="absolute top-0 h-full pointer-events-none flex items-end"
    transition:fly={{
        duration: 500,
        easing: quintOut,
        opacity: 0,
        y: 30
    }}>
        <span class="flex items-start flex-col m-10 text-xl">
            <p class="font-bold text-white">{imgMeta.name}
                <i class="text-white p-2 nf nf-md-magnify_scan">
            </p>
            <p class=" text-white">{imgMeta.name}</p>
        </span>
    </div>

    {/if}

    <!-- Image Previewer -->
    {#if openPreviewer}     
        <Previewer
            bind:imgData
            bind:openPreviewer/>
    {/if}

</section>