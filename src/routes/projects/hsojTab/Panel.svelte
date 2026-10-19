<!-- src\routes\projects\hsojTab\Panel.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";

    let {
      title,
      actions,
      children,
      class: className = ''
    }: {
      title: string;
      actions?: Snippet;
      children: Snippet;
      class?: string;
    } = $props();
</script>

<section class="flex min-h-96 flex-col border-2 border-base-content bg-base-100 {className}">
	<header class="flex items-center justify-between gap-2 border-b-2 border-base-content px-3 py-2">
	    <h2 class="cursor-blink text-sm font-bold tracking-widest uppercase">&gt; {title}</h2>
		{@render actions?.()}
	</header>
	<div class="flex flex-1 flex-col p-4">
	    {@render children()}
	</div>
</section>