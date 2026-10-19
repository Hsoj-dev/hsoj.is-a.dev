<!-- src\routes\projects\hsojTab\Shortcuts.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import { loadJSON, saveJSON } from './storage';

	type Shortcut = { id: string; name: string; url: string };

	const KEY = 'hsojTab:shortcuts';

	let shortcuts = $state<Shortcut[]>([]);
	let loaded = $state(false);
	let editing = $state(false);
	let adding = $state(false);
	let name = $state('');
	let url = $state('');
	let invalid = $state(false);

	onMount(() => {
		shortcuts = loadJSON<Shortcut[]>(KEY, []);
		loaded = true;
	});

	$effect(() => {
		if (loaded) saveJSON(KEY, shortcuts);
	});

	function normalize(raw: string): URL | null {
		const trimmed = raw.trim();
		if (!trimmed) return null;
		try {
			return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
		} catch {
			return null;
		}
	}

	const favicon = (u: string) =>
		`https://www.google.com/s2/favicons?domain=${new URL(u).hostname}&sz=64`;

	function add(e: SubmitEvent) {
		e.preventDefault();
		const parsed = normalize(url);
		if (!parsed) {
			invalid = true;
			return;
		}
		shortcuts.push({
			id: crypto.randomUUID(),
			name: name.trim() || parsed.hostname.replace(/^www\./, ''),
			url: parsed.toString()
		});
		name = '';
		url = '';
		invalid = false;
		adding = false;
	}

	function remove(id: string) {
		shortcuts = shortcuts.filter((s) => s.id !== id);
	}
</script>

<Panel title="Shortcuts">
	{#snippet actions()}
		<div class="flex gap-1">
			<button
				type="button"
				class="btn btn-xs {editing ? 'btn-primary' : ''}"
				aria-pressed={editing}
				onclick={() => (editing = !editing)}
			>
				{editing ? '[DONE]' : '[EDIT]'}
			</button>
			<button
				type="button"
				class="btn btn-xs {adding ? 'btn-primary' : ''}"
				aria-expanded={adding}
				onclick={() => (adding = !adding)}
			>
				[+]
			</button>
		</div>
	{/snippet}

	{#if adding}
		<form onsubmit={add} class="mb-4 flex flex-col gap-2 border-2 border-dashed border-base-content p-3">
			<input
				type="text"
				class="input input-sm w-full"
				placeholder="Name (optional)"
				aria-label="Shortcut name"
				bind:value={name}
			/>
			<input
				type="text"
				class="input input-sm w-full {invalid ? 'input-error' : ''}"
				placeholder="URL, e.g. youtube.com"
				aria-label="Shortcut URL"
				bind:value={url}
				oninput={() => (invalid = false)}
				required
			/>
			{#if invalid}
				<p class="text-xs text-error">&gt; INVALID URL</p>
			{/if}
			<button type="submit" class="btn btn-sm btn-primary">ADD</button>
		</form>
	{/if}

	{#if shortcuts.length === 0}
		<p class="text-sm opacity-70">&gt; NO SHORTCUTS YET. PRESS [+] TO ADD ONE.</p>
	{:else}
		<ul class="flex flex-wrap gap-4">
			{#each shortcuts as s (s.id)}
				<li class="relative">
					<a
						href={s.url}
						title={s.name}
						aria-label={s.name}
						class="relative flex size-12 items-center justify-center border-2 border-base-content bg-base-200 hover:bg-base-300"
					>
						<span class="text-lg font-bold uppercase" aria-hidden="true">{s.name.charAt(0)}</span>
						<!-- letter above is the fallback; the favicon covers it once it loads -->
						<img
							src={favicon(s.url)}
							alt=""
							class="absolute inset-0 size-full bg-base-200 object-contain p-1.5"
							onerror={(e) => e.currentTarget.remove()}
						/>
					</a>
					{#if editing}
						<button
							type="button"
							class="btn btn-xs btn-error absolute -top-2 -right-2 size-5 min-h-0 p-0"
							aria-label="Remove {s.name}"
							onclick={() => remove(s.id)}
						>
							x
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</Panel>
