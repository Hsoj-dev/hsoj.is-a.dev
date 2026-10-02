<!-- src\routes\games\+page.svelte -->
<script lang="ts">
    import { resolve } from "$app/paths";
</script>

<!-- flex items-center justify-center self-center -->
<div class="group border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p>> MY GAMES</p> 
    </div>
    <div class="p-5">
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col border-2 border-dashed p-5">
              <div class="w-full aspect-square border-2 flex items-center justify-center">
                  <img src="" alt="Segregame">
              </div>
              <button class="mt-3 border-2 p-2 hover:bg-primary self-center">
                  <a href={resolve('/games/segregame')}>See Game</a>
              </button>
          </div>
          
          <div class="flex flex-col border-2 border-dashed p-5">
              <div class="w-full aspect-square border-2 flex items-center justify-center">
                  <img src="" alt="Flappy Vace">
              </div>
              <button class="mt-3 border-2 p-2 hover:bg-primary self-center">
                  <a href={resolve('/games/flappy-vace')}>See Game</a>
              </button>
          </div>

          <div class="flex flex-col border-2 border-dashed p-5">
              <div class="w-full aspect-square border-2 flex items-center justify-center">
                  <img src="" alt="Ahas ni Lakan">
              </div>
              <button class="mt-3 border-2 p-2 hover:bg-primary self-center">
                  <a href={resolve('/games/ahas-ni-lakan')}>See Game</a>
              </button>
          </div>
        </div>
    </div>
</div>