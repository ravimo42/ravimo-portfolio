<script lang='ts'>
	import { quintOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { numIntroFinished } from "$lib/store/store"

    export let imgData: any
    export let index = 0
    export let duration = 0
    export let delayDevider = 0

</script>

<section
transition:fly={{
        delay: delayDevider !== 0 ? duration / delayDevider * index : 0,
        duration: duration,
        opacity: 100,
        y: innerHeight * (index % 2 ? -1 : 1),
        easing: quintOut,
    }}
    on:introend={() => { if (duration !== 0) $numIntroFinished += 1}}>
    <enhanced:img
        class="object-cover cursor-pointer h-full"
        src={imgData.imgLow.default}
        alt=""/>
</section>