<!-- src/routes/projects/hsojOS/os/apps/Hsoj.svelte -->
<script lang="ts">
	import { CONFIG } from '../config';

	let loaded = $state(false);
	let nonce = $state(0); // bumping this reloads the page

	const host = new URL(CONFIG.siteUrl).host;

	const btn =
		'grid h-8 shrink-0 cursor-pointer place-items-center rounded-lg px-2.5 text-sm transition-colors hover:bg-base-content/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary';
</script>

<div class="flex h-full flex-col">
	<div class="flex shrink-0 items-center gap-1 border-b border-base-content/15 p-1.5">
		<p class="min-w-0 flex-1 truncate px-2 text-sm text-base-content/60">{host}</p>
		<button
			type="button"
			class={btn}
			onclick={() => {
				loaded = false;
				nonce++;
			}}
		>
			Reload
		</button>
		<a href={CONFIG.siteUrl} target="_blank" rel="noopener noreferrer" class={btn}>Open in new tab</a>
	</div>

	<div class="relative min-h-0 flex-1 bg-base-100">
		{#if !loaded}
			<p class="absolute inset-0 grid place-items-center text-sm text-base-content/60">Loading {host}…</p>
		{/if}
		{#key nonce}
			<iframe
				title="Hsoj"
				src={CONFIG.siteUrl}
				allow="clipboard-write; fullscreen"
				referrerpolicy="strict-origin-when-cross-origin"
				onload={() => (loaded = true)}
				class="relative size-full border-0"
			></iframe>
		{/key}
	</div>
</div>