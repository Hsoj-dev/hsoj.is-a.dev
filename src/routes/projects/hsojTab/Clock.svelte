<!-- src\routes\projects\hsojTab\Clock.svelte -->
<script lang="ts">
    let now = $state<Date | null>(null);

    $effect(() => { 
      now = new Date();
      const id = setInterval(() => (now = new Date()), 1000);
      return () => clearInterval(id);
    });

    const pad = (n: number) => String(n).padStart(2, '0');

    // "--" until mounted so SSR and client markup match
    const hours = $derived(now ? pad(now.getHours() % 12 || 12) : '--');
    const minutes = $derived(now ? pad(now.getMinutes()) : '--');
    const meridiem = $derived(now ? (now.getHours() >= 12 ? 'PM' : 'AM') : '');
</script>

<div class="flex items-baseline gap-3 select-none" aria-live="off">
    <span class="text-7xl font-bold tracking-tight md:text-9xl">{hours}:{minutes}</span>
    <span class="text-3xl font-bold opacity-60 md:text-5xl">{meridiem}</span>
</div>