<script lang='ts'>
	import { quartOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import { numIntroFinished } from "$lib/store/store"

    export let imgData: any
    export let index = 0
    export let duration = 0
    export let delayDevider = 0

</script>

<section
transition:fly={{
        delay: duration / delayDevider * index,
        duration: duration,
        opacity: 100,
        y: innerHeight * (index % 2 ? -1 : 1),
        easing: quartOut,
    }}
    on:introend={() => { if (duration !== 0) $numIntroFinished += 1}}>
    <enhanced:img
        class="object-cover cursor-pointer h-full"
        src={imgData.imgLow.default}
        alt=""/>
</section>