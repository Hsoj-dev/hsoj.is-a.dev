<!-- src\lib\components\BackToTop.svelte -->
<script lang="ts">
    import { fade } from 'svelte/transition';

    let y = $state(0);
    const show = $derived(y > 300);
</script>

<svelte:window bind:scrollY={y} />

{#if show}
    <button
        transition:fade={{ duration: 150 }}
        onclick={() => window.scrollTo({ top: 0 })}
        aria-label="Back to top"
        class="bg-base-100 border-base-content hover:bg-base-content hover:text-base-100 fixed right-4 bottom-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center border-2 font-bold"
    >
        ^
    </button>
{/if}