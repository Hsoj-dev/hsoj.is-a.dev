<!-- src/routes/projects/hsojOS/os/LockScreen.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { CONFIG } from './config';
	import { sys } from './system.svelte';

	let value = $state('');
	let failed = $state(false);
	let pictureFailed = $state(false);
	let input: HTMLInputElement | undefined = $state();
	let shaker: HTMLElement | undefined = $state();

	const letter = CONFIG.userName.charAt(0).toUpperCase();

	onMount(() => input?.focus());

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (sys.unlock(value)) return;

		failed = true;
		value = '';
		input?.focus();
		if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
			shaker?.animate(
				[
					{ transform: 'translateX(0)' },
					{ transform: 'translateX(-8px)' },
					{ transform: 'translateX(8px)' },
					{ transform: 'translateX(-4px)' },
					{ transform: 'translateX(0)' }
				],
				{ duration: 280 }
			);
		}
	}
</script>

<div
	role="dialog"
	aria-modal="true"
	aria-label="Lock screen"
	class="fixed inset-0 z-9999 grid place-items-center bg-base-300/90 text-base-content backdrop-blur-2xl"
	style="background-image: radial-gradient(color-mix(in oklab, var(--color-base-content) 14%, transparent) 1px, transparent 1px); background-size: 24px 24px;"
	transition:fade|global={{ duration: 200 }}
>
	<div class="pointer-events-none absolute size-80 rounded-full bg-primary/15 blur-3xl sm:size-125"></div>

	<form class="relative flex w-72 flex-col items-center gap-4 px-4" onsubmit={submit}>
		<!-- Your picture. If the file is missing, your initial shows instead. -->
		<div
			class="relative grid size-32 place-items-center overflow-hidden rounded-full border-2 border-primary bg-base-100 text-5xl font-bold text-primary"
		>
			<span aria-hidden="true">{letter}</span>
			{#if !pictureFailed}
				<img
					src={CONFIG.profilePictureUrl}
					alt={letter}
					class="absolute inset-0 size-full bg-base-100 object-cover"
					onerror={() => (pictureFailed = true)}
				/>
			{/if}
		</div>
		<p class="text-lg font-bold">{CONFIG.userName}</p>

		<div bind:this={shaker} class="flex w-full items-center gap-2">
			<input
				bind:this={input}
				bind:value
				oninput={() => (failed = false)}
				type="password"
				placeholder="Password"
				aria-label="Password"
				autocomplete="off"
				class="w-full rounded-xl border-2 border-base-content/20 bg-base-100/80 px-3 py-2 text-sm outline-none placeholder:text-base-content/40 focus:border-primary"
			/>
			<button
				type="submit"
				aria-label="Unlock"
				class="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl border-2 border-primary bg-primary text-primary-content transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				→
			</button>
		</div>

		<p role="alert" class="min-h-10 text-center text-sm text-error">
			{#if failed}Incorrect password. <br> {CONFIG.lockHint}{/if}
		</p>
	</form>
</div>