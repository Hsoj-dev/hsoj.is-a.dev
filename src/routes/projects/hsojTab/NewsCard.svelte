<!-- src\routes\projects\hsoj-tab\NewsCard.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Panel from './Panel.svelte';
	import type { NewsArticle } from './news/+server';

	const ROTATE_MS = 5000;

	let articles = $state<NewsArticle[]>([]);
	let index = $state(0);
	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let paused = $state(false);

	const current = $derived(articles[index]);

	onMount(async () => {
		try {
			const res = await fetch('/projects/hsoj-tab/news');
			if (!res.ok) throw new Error(String(res.status));
			const data: { articles: NewsArticle[] } = await res.json();
			articles = data.articles;
			status = articles.length ? 'ready' : 'error';
		} catch {
			status = 'error';
		}
	});

	// Rotate every 5s; pauses while hovered. Reading `index` restarts the timer
	// whenever the story changes (including manual dot clicks).
	$effect(() => {
		void index;
		if (status !== 'ready' || paused || articles.length < 2) return;
		const id = setInterval(() => {
			index = (index + 1) % articles.length;
		}, ROTATE_MS);
		return () => clearInterval(id);
	});
</script>

<Panel title="Latest PH News">
	{#if status === 'loading'}
		<p class="cursor-blink text-sm opacity-70">LOADING</p>
	{:else if status === 'error' || !current}
		<p class="text-sm opacity-70">&gt; NEWS UNAVAILABLE</p>
	{:else}
		<div
			class="flex flex-1 flex-col gap-3"
			role="region"
			aria-label="Latest news"
			onmouseenter={() => (paused = true)}
			onmouseleave={() => (paused = false)}
		>
			<div class="relative min-h-56 flex-1 overflow-hidden border-2 border-base-content bg-base-300">
				{#key current.uuid}
					<a
						href={current.url}
						target="_blank"
						rel="noopener noreferrer"
						class="absolute inset-0 block"
						in:fade={{ duration: 300 }}
					>
						{#if current.thumbnail}
							<img
								src={current.thumbnail}
								alt=""
								referrerpolicy="no-referrer"
								class="absolute inset-0 size-full object-cover"
							/>
						{/if}
						<div
							class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-12 text-white"
						>
							<p class="mb-1 text-[10px] tracking-widest uppercase opacity-70">{current.publisher}</p>
							<h3 class="line-clamp-2 text-sm leading-snug font-bold">{current.title}</h3>
							{#if current.description}
								<p class="mt-1 line-clamp-2 text-xs opacity-80">{current.description}</p>
							{/if}
						</div>
					</a>
				{/key}
			</div>

			<div class="flex justify-center gap-1.5" role="tablist" aria-label="Choose story">
				{#each articles as article, i (article.uuid)}
					<button
						type="button"
						role="tab"
						aria-selected={i === index}
						aria-label="Story {i + 1}"
						class="h-2 transition-all {i === index ? 'w-6 bg-base-content' : 'w-2 bg-base-content/40'}"
						onclick={() => (index = i)}
					></button>
				{/each}
			</div>
		</div>
	{/if}
</Panel>
