<!-- src\routes\guestbook\+page.svelte -->
<script lang="ts">
	import Guestbook from "$lib/components/Guestbook.svelte";
    import { guestbook } from '$lib/guestbook.svelte';
    import SiteButton from '$lib/components/SiteButton.svelte';
</script>

<div class="group border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p class="cursor-blink">> GUESTBOOK [{guestbook.count}]</p> 
    </div>
    <div class="flex flex-col p-5">
        <Guestbook />
    </div>
</div>

<div class="group border-2">
    <div class="flex h-8 items-center border-b-2 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p class="cursor-blink">> LINK TO ME</p>
    </div>
    <div class="p-5">
        <SiteButton />
    </div>
</div>

