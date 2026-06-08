<!-- src\routes\projects\+page.svelte -->
<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<div><p>List of Projects</p></div>

<ul>
    <li><a href={resolve('/projects/hsoj-bot')}>Hsoj-Bot</a></li>
    <li><a href={resolve('/projects/scrabbly')}>Scrabbly</a></li>
</ul>