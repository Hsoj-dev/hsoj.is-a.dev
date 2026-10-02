<script lang="ts">
    import { onMount } from 'svelte';

    let { mode }: { mode: 'stars' | 'shapes' } = $props();

    type P = { x: number; y: number; vx: number; vy: number; s: number; t: number; rot: number; vr: number; kind: number };

    let canvas: HTMLCanvasElement;

    onMount(() => {
        const ctx = canvas.getContext('2d')!;
        const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = 0, h = 0, raf = 0, frame = 0;
        let color = 'rgb(255,255,255)';
        let parts: P[] = [];
        const rnd = (a: number, b: number) => a + Math.random() * (b - a);

        function make(): P {
            return mode === 'stars'
                ? { x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.03, 0.03), vy: -rnd(0.08, 0.35), s: Math.floor(rnd(1, 4)), t: rnd(0, 6.28), rot: 0, vr: 0, kind: 0 }
                : { x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.1, 0.1), vy: -rnd(0.1, 0.3), s: rnd(14, 40), t: 0, rot: rnd(0, 6.28), vr: rnd(-0.004, 0.004), kind: Math.floor(rnd(0, 3)) };
        }

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = mode === 'stars' ? Math.round((w * h) / 9000) : Math.round((w * h) / 60000) + 8;
            parts = Array.from({ length: count }, make);
            draw();
        }

        function draw() {
            if (frame % 30 === 0) color = getComputedStyle(document.documentElement).color;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            for (const p of parts) {
                if (mode === 'stars') {
                    ctx.globalAlpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(p.t));
                    ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
                } else {
                    ctx.globalAlpha = 0.16;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    const r = p.s / 2;
                    if (p.kind === 0) ctx.strokeRect(-r, -r, p.s, p.s);
                    else if (p.kind === 1) {
                        ctx.beginPath();
                        ctx.moveTo(-r, 0); ctx.lineTo(r, 0);
                        ctx.moveTo(0, -r); ctx.lineTo(0, r);
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(0, -r); ctx.lineTo(r, r); ctx.lineTo(-r, r);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    ctx.restore();
                }
            }
            ctx.globalAlpha = 1;
        }

        function step() {
            frame++;
            for (const p of parts) {
                p.x += p.vx; p.y += p.vy; p.t += 0.03; p.rot += p.vr;
                const m = p.s + 4;
                if (p.y < -m) { p.y = h + m; p.x = rnd(0, w); }
                if (p.x < -m) p.x = w + m;
                if (p.x > w + m) p.x = -m;
            }
            draw();
            raf = requestAnimationFrame(step);
        }

        resize();
        window.addEventListener('resize', resize);
        if (!reduce) raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    });
</script>

<canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>