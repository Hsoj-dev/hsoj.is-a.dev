<!-- src\routes\projects\hsojTab\+page.svelte -->
<script lang="ts">
  import Clock from "./Clock.svelte";
  import SearchBar from "./SearchBar.svelte";
  import NewsCard from "./NewsCard.svelte";
  import Shortcuts from "./Shortcuts.svelte";
  import Todo from "./Todo.svelte";
</script>

<svelte:head>
  <title>hsoj-tab</title>
</svelte:head>

<main class="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-8 px-4 py-12">
    <Clock />
    <SearchBar />
    
    <div class="grid w-full gap-6 md:grid-cols-3">
        <NewsCard />
        <Shortcuts />
        <Todo />
    </div>
</main>