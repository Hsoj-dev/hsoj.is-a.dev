<!-- src\routes\links\+page.svelte -->
<script lang="ts">
	import { resolve } from "$app/paths";
</script>

<div class="group border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p>> LINKS</p> 
    </div>
    <div class="p-5">
        <div class="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-left">
            <p>* <a href={resolve("/games")} class="link link-hover font-bold">Games</a></p>
            <span>
                - I sometimes dabble in game dev
            </span>

            <!-- <p>* <a href={resolve("/artworks")} class="link link-hover font-bold">Artwork</a></p>
            <span>
                 - Some of my artworks (not that many yet)
            </span> -->

            <!-- <p>* <a href={resolve("/stories")} class="link link-hover font-bold">Stories</a></p>
            <span>
                - Still zero but I do plan to write someday
            </span> -->

            <!-- <p>* <a href={resolve("/ukulele-notes")} class="link link-hover font-bold">Ukulele</a></p>
            <span>
                - my ukulele related stuff
            </span> -->
        </div>
    </div>
</div>
