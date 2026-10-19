<!-- src\routes\projects\hsojTab\SearchBar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { loadJSON, saveJSON } from './storage';

	const ENGINES = [
		{ id: 'google', name: 'Google', action: 'https://www.google.com/search' },
		{ id: 'duckduckgo', name: 'DuckDuckGo', action: 'https://duckduckgo.com/' },
		{ id: 'bing', name: 'Bing', action: 'https://www.bing.com/search' }
	] as const;

	const KEY = 'hsojTab:engine';

	let engineId = $state<string>(ENGINES[0].id);
	let loaded = $state(false);

	const engine = $derived(ENGINES.find((e) => e.id === engineId) ?? ENGINES[0]);

	onMount(() => {
		const saved = loadJSON<string>(KEY, ENGINES[0].id);
		if (ENGINES.some((e) => e.id === saved)) engineId = saved;
		loaded = true;
	});

	$effect(() => {
		if (loaded) saveJSON(KEY, engineId);
	});
</script>

<!-- Plain GET form: the browser navigates straight to the engine's results page -->
<form
	action={engine.action}
	method="GET"
	class="flex w-full max-w-2xl items-center gap-2 border-2 border-base-content bg-base-100 p-2"
>
	<span class="px-2 font-bold" aria-hidden="true">&gt;</span>
	<input
		type="text"
		name="q"
		class="input input-ghost min-w-0 flex-1 focus:outline-none"
		placeholder="Search with {engine.name}..."
		aria-label="Search query"
		autocomplete="off"
		required
	/>
	<select
		class="select select-sm w-auto"
		bind:value={engineId}
		aria-label="Search engine"
	>
		{#each ENGINES as e (e.id)}
			<option value={e.id}>{e.name}</option>
		{/each}
	</select>
</form>
