<!-- src\routes\projects\hsoj-tab\Todo.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import { loadJSON, saveJSON } from './storage';

	type Todo = { id: string; text: string; done: boolean };

	const KEY = 'hsoj-tab:todos';

	let todos = $state<Todo[]>([]);
	let loaded = $state(false);
	let text = $state('');
	let title = $state('Today');

	onMount(() => {
		todos = loadJSON<Todo[]>(KEY, []);
		title = new Date().toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric'
		});
		loaded = true;
	});

	$effect(() => {
		if (loaded) saveJSON(KEY, todos);
	});

	function add(e: SubmitEvent) {
		e.preventDefault();
		const value = text.trim();
		if (!value) return;
		todos.push({ id: crypto.randomUUID(), text: value, done: false });
		text = '';
	}

	function remove(id: string) {
		todos = todos.filter((t) => t.id !== id);
	}
</script>

<Panel {title}>
	<form onsubmit={add} class="mb-4 flex items-center gap-2 border-2 border-base-content p-1">
		<span class="pl-2 font-bold" aria-hidden="true">+</span>
		<input
			type="text"
			class="input input-ghost input-sm min-w-0 flex-1 focus:outline-none"
			placeholder="Add a task..."
			aria-label="New task"
			autocomplete="off"
			bind:value={text}
		/>
	</form>

	{#if todos.length === 0}
		<p class="text-sm opacity-70">&gt; NOTHING TO DO</p>
	{:else}
		<ul class="flex flex-col gap-1 overflow-y-auto">
			{#each todos as todo (todo.id)}
				<li class="group flex items-center gap-3 border-b border-base-content/30 px-1 py-2">
					<input
						type="checkbox"
						class="checkbox checkbox-sm"
						aria-label="Mark “{todo.text}” as done"
						bind:checked={todo.done}
					/>
					<span class="min-w-0 flex-1 wrap-break-word {todo.done ? 'line-through opacity-50' : ''}">
						{todo.text}
					</span>
					<button
						type="button"
						class="btn btn-ghost btn-xs"
						aria-label="Delete “{todo.text}”"
						onclick={() => remove(todo.id)}
					>
						[x]
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</Panel>
