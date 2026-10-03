<!-- src\lib\components\ProjectCard.svelte -->
<script lang="ts">
    import { resolve } from '$app/paths';
    import type { Project, Status } from '$lib/projects';

    let { project }: { project: Project } = $props();

    const statusLabel: Record<Status, string> = {
        live: '[LIVE]',
        wip: '[WIP]',
        archived: '[ARCHIVED]'
    };
    const statusColor: Record<Status, string> = {
        live: 'text-success',
        wip: 'text-warning',
        archived: 'opacity-60'
    };

    const linkBtn =
        'relative z-10 cursor-pointer border-2 px-2 text-sm font-bold hover:bg-base-content hover:text-base-100';

    const lines = $derived(
        project.preview ?? [
            `$ cat ${project.slug}/README`,
            project.tagline,
            `> stack: ${project.stack.join(', ')}`,
            `> status: ${project.status}`
        ]
    );
</script>

<article class="group relative flex flex-col border-2">
    <!-- header bar -->
    <div class="flex h-8 items-center justify-between border-b-2 px-2 group-hover:bg-base-content group-hover:text-base-100">
        {#if project.page}
            <a
                href={resolve(project.page)}
                class="truncate font-bold after:absolute after:inset-0 after:content-['']"
            >
                > {project.name}
            </a>
        {:else}
            <span class="truncate font-bold">> {project.name}</span>
        {/if}
        <span class="shrink-0 text-sm {statusColor[project.status]} group-hover:text-base-100">
            {statusLabel[project.status]}
        </span>
    </div>

    <!-- screenshot -->
    {#if project.image}
        <img
            src={project.image}
            alt="{project.name} screenshot"
            loading="lazy"
            class="aspect-video w-full border-b-2 border-dashed object-cover"
        />
    {:else}
        <div class="flex aspect-video w-full items-center justify-center border-b-2 border-dashed opacity-60">
            <p>NO PREVIEW</p>
        </div>
        <!-- <div class="bg-base-200 aspect-video w-full overflow-hidden border-b-2 border-dashed p-3 text-sm">
            {#each lines as line, i (i)}
                <p class="wrap-break-word {i === lines.length - 1 ? 'cursor-blink' : ''}">{line}</p>
            {/each}
        </div> -->
    {/if}

    <!-- body -->
    <div class="flex flex-1 flex-col gap-3 p-4">
        <p>{project.tagline}</p>

        <ul class="flex flex-wrap gap-2">
            {#each project.stack as tech (tech)}
                <li class="border-2 border-dotted px-2 text-sm">{tech}</li>
            {/each}
        </ul>

        <div class="mt-auto flex items-center justify-between gap-2 pt-2">
            <span class="text-sm opacity-70">{project.year}</span>
            <div class="flex gap-2">
                {#if project.demo}
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" class={linkBtn}>DEMO</a>
                {/if}
                {#if project.repo}
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" class={linkBtn}>SOURCE</a>
                {/if}
                {#if project.page}
                    <a href={resolve(project.page)} class={linkBtn}>DETAILS</a>
                {/if}
            </div>
        </div>
    </div>
</article>