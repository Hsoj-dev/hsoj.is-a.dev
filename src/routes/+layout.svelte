<script lang="ts">
    import '../app.css';  
	import favicon from '$lib/assets/favicon.svg';
    import { onMount } from 'svelte';
	import Header from "$lib/components/layout/Header.svelte";
	import Background from '$lib/components/layout/Background.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import DevSwitcher from '$lib/components/DevSwitcher.svelte';
    import { loadPrefs, savePrefs, applyPalette } from '$lib/prefs.svelte';

	let { children } = $props();

    onMount(loadPrefs); // must stay above the effect
    $effect(() => {
        applyPalette();
        savePrefs();
    });
</script>

<svelte:head>
    <title>Hsoj-Dev</title>
    <link rel="icon" href={favicon} />
</svelte:head>

<Background />

<div class="flex flex-col min-h-screen items-center justify-center">
    <div class="bg-base-100 w-full max-w-4xl h-fit my-5">
        <div class="flex flex-col gap-5 bg-base-100 m-3 h-auto border-2 border-dashed border-base-content p-3 md:m-5 md:p-5">
            
            <Header />
            
            {@render children()}

            <p class="text-center">© 2026 Hsoj-Dev. All rights reserved</p>

        </div>
    </div>
</div>

<BackToTop />
<DevSwitcher />
