<script lang='ts'>
    import Backdrop from "$lib/components/backdrop/Backdrop.svelte"
    import { darkmode } from "$lib/store/store"
	import { onMount } from "svelte";

    function StrToBool(what: any){
        return what === "true" ? true : false
    }
    
    onMount(() => {
        $darkmode = StrToBool($darkmode)
    })

</script>
<div>
    <Backdrop/>
</div>