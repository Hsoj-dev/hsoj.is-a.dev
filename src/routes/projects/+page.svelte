<!-- src\routes\projects\+page.svelte -->
<script lang="ts">
    import ProjectCard from '$lib/components/ProjectCard.svelte';
    import { projects, type Status } from '$lib/projects';

    type Filter = 'all' | Status;
    let filter = $state<Filter>('all');

    const options: { value: Filter; label: string }[] = [
        { value: 'all', label: 'ALL' },
        { value: 'live', label: 'LIVE' },
        { value: 'wip', label: 'WIP' },
        { value: 'archived', label: 'ARCHIVED' }
    ];

    const count = (f: Filter) =>
        f === 'all' ? projects.length : projects.filter((p) => p.status === f).length;

    const shown = $derived(filter === 'all' ? projects : projects.filter((p) => p.status === filter));
</script>

<div class="border-2">
    <div class="flex h-8 items-center border-b-2 px-2">
        <p class="cursor-blink">> MY PROJECTS [{shown.length}]</p>
    </div>

    <div class="flex flex-col gap-5 p-5">
        <label class="flex items-center gap-2 self-end text-sm">
            <span>FILTER:</span>
            <select
                bind:value={filter}
                class="bg-base-100 focus:border-primary cursor-pointer border-2 px-2 py-1 focus:outline-none"
            >
                {#each options as o (o.value)}
                    <option value={o.value}>{o.label} ({count(o.value)})</option>
                {/each}
            </select>
        </label>

        {#if shown.length}
            <div class="grid gap-5 md:grid-cols-2">
                {#each shown as project (project.slug)}
                    <ProjectCard {project} />
                {/each}
            </div>
        {:else}
            <p class="py-10 text-center opacity-70">NO PROJECTS WITH THIS STATUS.</p>
        {/if}
    </div>
</div>