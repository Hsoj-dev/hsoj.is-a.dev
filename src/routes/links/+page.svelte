<!-- src\routes\links\+page.svelte -->
<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<div class="group border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p>> LINKS</p> 
    </div>
    <div class="p-5">
        <ul>
            <li>* <a href={resolve("/games")} class="link link-hover font-bold">Games</a> - I sometimes dabble in game dev</li>
            <li>* <a href={resolve("/artworks")} class="link link-hover font-bold">Artwork</a> - Some of my artworks (not that many yet)</li>
            <li>* <a href={resolve("/stories")} class="link link-hover font-bold">Stories</a> - Still zero but I do plan to write someday</li>
            <li>* <a href={resolve("/ukulele-notes")} class="link link-hover font-bold">Ukulele Notes</a> - my ukulele notes</li>
        </ul>
    </div>
</div>
