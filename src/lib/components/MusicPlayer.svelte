<script lang="ts">
    import { onMount } from 'svelte';

    let { videoId, title, artist = '' }: { videoId: string; title: string; artist?: string } = $props();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    let host: HTMLDivElement;
    let player: any;
    let ready = $state(false);
    let playing = $state(false);
    let failed = $state(false);
    let current = $state(0);
    let duration = $state(0);
    let volume = $state(50);
    let seeking = false;

    const status = $derived(failed ? 'ERROR: CANNOT PLAY VIDEO' : !ready ? 'LOADING...' : playing ? 'PLAYING' : 'PAUSED');

    function loadApi(): Promise<void> {
        return new Promise((done) => {
            const w = window as any;
            if (w.YT?.Player) return done();
            const prev = w.onYouTubeIframeAPIReady;
            w.onYouTubeIframeAPIReady = () => { prev?.(); done(); };
            if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
                const s = document.createElement('script');
                s.src = 'https://www.youtube.com/iframe_api';
                document.head.append(s);
            }
        });
    }

    function toggle() {
        if (!ready) return;
        playing ? player.pauseVideo() : player.playVideo();
    }

    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

    $effect(() => {
        if (ready) player.setVolume(volume);
    });

    onMount(() => {
        let timer: ReturnType<typeof setInterval>;
        let destroyed = false;

        loadApi().then(() => {
            if (destroyed) return;
            const YT = (window as any).YT;
            player = new YT.Player(host, {
                width: '200',
                height: '200',
                videoId,
                playerVars: { controls: 0, disablekb: 1, playsinline: 1, rel: 0, origin: location.origin },
                events: {
                    onReady: () => {
                        ready = true;
                        duration = player.getDuration();
                        player.setVolume(volume);
                        timer = setInterval(() => {
                            if (seeking) return;
                            current = player.getCurrentTime();
                            duration = player.getDuration();
                        }, 250);
                    },
                    onStateChange: (e: { data: number }) => {
                        playing = e.data === 1;
                        if (e.data === 0) { player.seekTo(0, true); player.playVideo(); } // loop
                    },
                    onError: () => { failed = true; }
                }
            });
        });

        return () => {
            destroyed = true;
            clearInterval(timer);
            player?.destroy?.();
        };
    });
</script>

<!-- hidden YouTube player -->
<div class="pointer-events-none fixed top-0 -left-2499.75 h-50 w-50" aria-hidden="true">
    <div bind:this={host}></div>
</div>

<div class="flex flex-col gap-3 border-2 m-3 p-3">
    <div class="flex items-center gap-3">
        <div class="eq" class:playing aria-hidden="true">
            {#each [0, 1, 2, 3] as i (i)}
                <span style="animation-duration:{0.5 + i * 0.13}s"></span>
            {/each}
        </div>
        <div class="min-w-0">
            <p class="truncate font-bold">♪ {title}</p>
            {#if artist}<p class="truncate text-sm opacity-70">{artist}</p>{/if}
        </div>
    </div>

    <div class="flex items-center gap-3">
        <button
            onclick={toggle}
            disabled={!ready || failed}
            aria-label={playing ? 'Pause' : 'Play'}
            class="hover:bg-base-content hover:text-base-100 w-12 shrink-0 cursor-pointer border-2 py-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {playing ? '❚❚' : '▶'}
        </button>
        <input
            type="range"
            class="range range-xs range-primary min-w-0 flex-1"
            min="0"
            max={duration || 1}
            step="1"
            value={current}
            disabled={!ready || failed}
            aria-label="Seek"
            oninput={(e) => { seeking = true; current = +e.currentTarget.value; }}
            onchange={(e) => { player.seekTo(+e.currentTarget.value, true); seeking = false; }}
        />
        <span class="shrink-0 text-sm">{fmt(current)}/{fmt(duration)}</span>
    </div>

    <div class="flex items-center gap-3 text-sm">
        <span>VOL</span>
        <input type="range" class="range range-xs w-28" min="0" max="100" bind:value={volume} aria-label="Volume" />
        <span class="ml-auto">[{status}]</span>
    </div>
</div>

<style>
    .eq { display: flex; align-items: flex-end; gap: 2px; height: 20px; width: 22px; flex-shrink: 0; }
    .eq span { width: 4px; height: 4px; background: currentColor; }
    .eq.playing span { animation: eq 0.8s steps(5) infinite alternate; }
    @keyframes eq { from { height: 3px; } to { height: 20px; } }
    @media (prefers-reduced-motion: reduce) {
        .eq.playing span { animation: none; height: 12px; }
    }
</style>