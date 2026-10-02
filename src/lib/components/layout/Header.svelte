<!-- src\lib\components\layout\Header.svelte -->
<script lang="ts">
    import { resolve } from "$app/paths";
    let name = "> HSOJ-DEV <"
</script>

<div class="flex flex-col">
    <div class="bg-base-content text-base-100 mb-5 flex h-10 items-center justify-center">
        <p class="font-bold">{name}</p>
    </div>
    <div class="flex flex-wrap justify-center items-center md:justify-evenly">
        <a href={resolve('/blogs')} class="px-2 border-2 border-transparent hover:border-dotted hover:border-current">Blogs</a>
        <a href={resolve('/projects')} class="px-2 border-2 border-transparent hover:border-dotted hover:border-current">Projects</a>
        <a href={resolve('/')} class="px-2 border-2 border-transparent hover:border-dotted hover:border-current">Home</a>
        <a href={resolve('/links')} class="px-2 border-2 border-transparent hover:border-dotted hover:border-current">Links</a>
        <a href={resolve('/guestbook')} class="px-2 border-2 border-transparent hover:border-dotted hover:border-current">Guestbook</a>
    </div>
</div>