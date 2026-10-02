<script lang="ts">
    import { prefs, palettes, backgrounds } from '$lib/prefs.svelte';
    let open = $state(true);
</script>

<div class="bg-base-100 text-base-content fixed bottom-4 left-4 z-50 w-56 border-2 text-xs">
    <button class="flex w-full cursor-pointer justify-between border-b-2 px-2 py-1" onclick={() => (open = !open)}>
        <span>> DEV: LOOK</span><span>{open ? '–' : '+'}</span>
    </button>
    {#if open}
        <div class="flex flex-col gap-2 p-2">
            <p class="opacity-70">palette</p>
            <div class="flex flex-wrap gap-1">
                {#each palettes as p (p)}
                    <button
                        onclick={() => (prefs.palette = p)}
                        class="cursor-pointer border-2 px-2 {prefs.palette === p ? 'bg-primary text-primary-content' : ''}">{p}</button>
                {/each}
            </div>
            <p class="opacity-70">background</p>
            <div class="flex flex-wrap gap-1">
                {#each backgrounds as b (b)}
                    <button
                        onclick={() => (prefs.background = b)}
                        class="cursor-pointer border-2 px-2 {prefs.background === b ? 'bg-primary text-primary-content' : ''}">{b}</button>
                {/each}
            </div>
        </div>
    {/if}
</div>