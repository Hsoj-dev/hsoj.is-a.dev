<!-- src\routes\games\+page.svelte -->
<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<div><p>List of Games</p></div>

<ul>
    <li><a href={resolve('/games/segregame')}>Segregame</a></li>
    <li><a href={resolve('/games/flappy-vace')}>Flappy Vace</a></li>
    <li><a href={resolve('/games/ahas-ni-lakan')}>Ahas ni Lakan</a></li>
</ul>