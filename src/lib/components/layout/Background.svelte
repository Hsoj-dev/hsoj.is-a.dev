<script lang="ts">
    import { prefs } from '$lib/prefs.svelte';
    import Particles from './Particles.svelte';
</script>

<div class="text-base-content pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    {#if prefs.background === 'stars'}
        <Particles mode="stars" />
    {:else if prefs.background === 'shapes'}
        <Particles mode="shapes" />
    {:else if prefs.background === 'grid'}
        <div class="grid-bg absolute inset-0"></div>
    {:else}
        <div class="scan absolute inset-0"></div>
        <div class="band"></div>
    {/if}
</div>

<style>
    .grid-bg {
        background-image:
            linear-gradient(color-mix(in oklab, currentColor 10%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, currentColor 10%, transparent) 1px, transparent 1px);
        background-size: 32px 32px;
        animation: grid-scroll 8s linear infinite;
    }
    @keyframes grid-scroll {
        to { background-position: 32px 32px; }
    }

    .scan {
        background: repeating-linear-gradient(
            to bottom,
            transparent 0 2px,
            color-mix(in oklab, currentColor 7%, transparent) 2px 4px
        );
        animation: flicker 5s steps(1) infinite;
    }
    .band {
        position: absolute;
        left: 0;
        right: 0;
        height: 140px;
        background: linear-gradient(to bottom, transparent, color-mix(in oklab, currentColor 7%, transparent), transparent);
        animation: sweep 9s linear infinite;
    }
    @keyframes sweep {
        from { transform: translateY(-140px); }
        to { transform: translateY(100vh); }
    }
    @keyframes flicker {
        0% { opacity: 1; }
        92% { opacity: 0.85; }
        94% { opacity: 1; }
        97% { opacity: 0.9; }
    }

    @media (prefers-reduced-motion: reduce) {
        .grid-bg, .scan, .band { animation: none; }
    }
</style>