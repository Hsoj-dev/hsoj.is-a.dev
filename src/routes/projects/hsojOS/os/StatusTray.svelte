<!-- src/routes/projects/hsojOS/os/StatusTray.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { sound } from './sound.svelte';

	let { class: className = '' }: { class?: string } = $props();

	// Not in TypeScript's DOM types, so describe just what we use
	interface BatteryManager extends EventTarget {
		level: number;
		charging: boolean;
	}
	type BrowserNav = Navigator & {
		getBattery?: () => Promise<BatteryManager>;
		connection?: EventTarget & { type?: string };
	};

	// ---------- Volume ----------
	let shown = $derived(sound.muted ? 0 : sound.volume);

	// ---------- Battery ----------
	let battery = $state<{ level: number; charging: boolean } | null>(null);
	let batteryChecked = $state(false);

	// ---------- Network ----------
	let online = $state(true);
	let linkType = $state<string | undefined>();

	let net = $derived.by(() => {
		if (!online) return { label: 'wifi', value: 'off', title: 'Offline' };
		if (linkType === 'ethernet') return { label: 'eth', value: 'on', title: 'Online (ethernet)' };
		if (linkType === 'cellular') return { label: 'cell', value: 'on', title: 'Online (cellular)' };
		return {
			label: 'wifi',
			value: 'on',
			title: linkType === 'wifi' ? 'Online (wifi)' : 'Online (browsers do not reveal the connection type)'
		};
	});

	onMount(() => {
		sound.load();

		const nav = navigator as BrowserNav;

		// Network
		const syncNet = () => {
			online = navigator.onLine;
			linkType = nav.connection?.type;
		};
		syncNet();
		window.addEventListener('online', syncNet);
		window.addEventListener('offline', syncNet);
		nav.connection?.addEventListener('change', syncNet);

		// Battery (Chromium only)
		let battMgr: BatteryManager | null = null;
		const syncBattery = () => {
			if (battMgr) battery = { level: Math.round(battMgr.level * 100), charging: battMgr.charging };
		};
		if (nav.getBattery) {
			nav
				.getBattery()
				.then((b) => {
					battMgr = b;
					syncBattery();
					b.addEventListener('levelchange', syncBattery);
					b.addEventListener('chargingchange', syncBattery);
				})
				.catch(() => {})
				.finally(() => (batteryChecked = true));
		} else {
			batteryChecked = true;
		}

		return () => {
			window.removeEventListener('online', syncNet);
			window.removeEventListener('offline', syncNet);
			nav.connection?.removeEventListener('change', syncNet);
			battMgr?.removeEventListener('levelchange', syncBattery);
			battMgr?.removeEventListener('chargingchange', syncBattery);
		};
	});
</script>

<div class={className}>
	<!-- Volume -->
	<div class="flex items-center gap-2">
		<button
			type="button"
			onclick={() => sound.toggleMute()}
			aria-label={sound.muted ? 'Unmute' : 'Mute'}
			aria-pressed={sound.muted}
			title={sound.muted ? 'Unmute' : 'Mute'}
			class="grid size-6 cursor-pointer place-items-center rounded-lg transition-colors hover:bg-base-content/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
		>
			<svg
				viewBox="0 0 24 24"
				class="size-4"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="M11 5 6 9H3v6h3l5 4z" />
				{#if shown === 0}
					<path d="m16 9 5 6" />
					<path d="m21 9-5 6" />
				{:else}
					<path d="M15.5 8.5a5 5 0 0 1 0 7" />
					{#if shown > 50}
						<path d="M18.5 5.5a9 9 0 0 1 0 13" />
					{/if}
				{/if}
			</svg>
		</button>
		<input
			type="range"
			min="0"
			max="100"
			step="1"
			value={shown}
			oninput={(e) => sound.setVolume(Number(e.currentTarget.value))}
			onchange={() => sound.chime()}
			aria-label="Volume"
			class="hidden h-1 w-20 cursor-pointer accent-primary sm:block"
		/>
		<span class="hidden w-9 text-right tabular-nums sm:inline">{shown}%</span>
	</div>

	<!-- Battery -->
	<span class="hidden h-4 w-0.5 bg-base-content/15 sm:block"></span>
	<span
		class="hidden items-center gap-1 sm:flex"
		title={battery
			? `${battery.level}%${battery.charging ? ', charging' : ''}`
			: batteryChecked
				? 'Battery status is not available in this browser'
				: 'Checking battery'}
		role="img"
		aria-label={battery
			? `Battery ${battery.level} percent${battery.charging ? ', charging' : ''}`
			: 'Battery status unavailable'}
	>
		{#if battery?.charging}
			<svg viewBox="0 0 24 24" class="size-3.5 text-primary" fill="currentColor" aria-hidden="true">
				<path d="M13 2 4 14h6l-1 8 9-12h-6z" />
			</svg>
		{/if}
		<svg
			viewBox="0 0 24 24"
			class="h-5 w-6 {battery ? (!battery.charging && battery.level <= 20 ? 'text-error' : '') : 'opacity-40'}"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<rect x="2" y="7" width="16" height="10" rx="2" />
			<path d="M22 11v2" />
			{#if battery}
				<!-- the fill shows how much charge is left -->
				<rect x="4" y="9" width={Math.max(1, (12 * battery.level) / 100)} height="6" rx="1" fill="currentColor" stroke="none" />
			{:else}
				<path d="M10 10.5a1.5 1.5 0 1 1 2 1.4c-.6.3-1 .6-1 1.1" />
				<path d="M11 15h.01" />
			{/if}
		</svg>
	</span>

	<!-- Wifi -->
	<span class="hidden h-4 w-0.5 bg-base-content/15 sm:block"></span>
	<span
		class="hidden sm:inline-flex {online ? '' : 'text-error'}"
		title={net.title}
		role="img"
		aria-label={online ? 'Online' : 'Offline'}
	>
		<svg
			viewBox="0 0 24 24"
			class="size-5"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			{#if online}
				<path d="M12 20h.01" />
				<path d="M2 8.82a15 15 0 0 1 20 0" />
				<path d="M5 12.859a10 10 0 0 1 14 0" />
				<path d="M8.5 16.429a5 5 0 0 1 7 0" />
			{:else}
				<path d="M12 20h.01" />
				<path d="M8.5 16.429a5 5 0 0 1 7 0" />
				<path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
				<path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
				<path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
				<path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
				<path d="m2 2 20 20" />
			{/if}
		</svg>
	</span>
</div>