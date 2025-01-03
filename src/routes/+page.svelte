<script lang='ts'>
    import Backdrop from "$lib/components/backdrop/Backdrop.svelte"
    import { darkmode } from "$lib/store/store"

    $darkmode = $darkmode === "true" ? true : false

</script>
<div>
    <Backdrop/>
</div>