<script lang='ts'>
    import { fly } from "svelte/transition"
	import { quintOut } from "svelte/easing"
    import { numIntroFinished, enableScroll } from "$lib/store/store"
    import Previewer from "$lib/components/previewer/Previewer.svelte";

    export let imgData: any
    export let index = 0
    export let duration = 0
    export let delayDevider = 0

    let openPreviewer = false

    function ImageOnClick(){
        if (!$enableScroll) return
        openPreviewer = true
        $enableScroll = false
    }

</script>

<section class="bg-white {openPreviewer ? "" : "z-10"}"
transition:fly={{
        delay: delayDevider !== 0 ? duration / delayDevider * index : 0,
        duration: duration,
        opacity: 100,
        y: innerHeight * (index % 2 ? -1 : 1),
        easing: quintOut,
    }}
    on:introend={() => { if (duration !== 0) $numIntroFinished += 1}}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <enhanced:img
        class="object-cover h-full {$enableScroll ? "cursor-pointer hover:scale-[98%]" : "" } duration-300"
        src={imgData.imgLow.default}
        alt=""
        loading="lazy"
        on:click={ImageOnClick}/>

    <!-- Image Previewer -->
    {#if openPreviewer}     
        <Previewer
            bind:imgData
            bind:openPreviewer/>
    {/if}

</section>