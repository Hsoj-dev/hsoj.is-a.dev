<script lang="ts">
    import { onMount } from 'svelte';
    import { resolve } from '$app/paths';
    import MusicPlayer from '$lib/components/MusicPlayer.svelte';

    // EDIT THESE
    const song = { videoId: 'We4QQCMwyrg', title: 'Sign of the Times', artist: 'Harry Styles' };

    const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    let today = $state('');
    onMount(() => {
        const d = new Date();
        today = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
    });
</script>

<div class="group  border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p class="cursor-blink">> WHO AM I?</p> 
    </div>
    <div class="flex flex-col md:flex-row gap-5 p-5">
        <div class="w-full max-w-65 md:min-w-65 min-h-65 border-2 border-dashed border-base-content flex items-center justify-center self-center">
            <img src="/images/pic.png" alt="" width="240">
        </div>
        <div class="flex flex-col justify-between">
            <p>Hullo! I'm Josh (he/him), an 18-year-old developer from the Philippines. I like sleeping, reading, and programming. I created this site to have my own little corner in the web. Hope you enjoy looking around!</p>
            <div class="w-80 border-2 p-3 my-3 self-center">
                <p>"Live, Laugh, Toaster Bath"</p>
                <p class="text-right italic">- Unknown</p>
            </div>
            <p class="self-center font-bold flex items-center gap-2">
                <span class="status-dot"></span>
                Status: Still Alive and Kickin'
            </p>
        </div>
    </div>
</div>

<div class="flex flex-col md:flex-row gap-5">
    <div class="group border-2 w-full md:w-1/2">
        <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
             <p>> NOW - {today}</p>
        </div>
        <div class="p-5">
            <ul>
                <li>LOCATION: AT HOME</li>
                <hr>
                <li>MOOD: BORED</li>
                <hr>
                <li>READING: DC Absolute Comics</li>
                <hr>
                <li>PLAYING: Tunic, Albion, Brawhalla</li>
                <hr>
                <li>WATCHING: DC Tomorrowverse Movies</li>
                <hr>
                <li>LEARNING: Titration</li>
            </ul>
        </div>
    </div>

    <div class="group flex flex-col border-2 w-full md:w-1/2">
        <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
            <p>> SONG ON MY MIND RIGHT NOW</p> 
        </div>
        <div class="flex flex-1 flex-col justify-center">
            <MusicPlayer {...song} />
        </div>
    </div>
</div>

<div class="group border-2">
    <div class="flex items-center border-b-2 h-8 px-2 group-hover:bg-base-content group-hover:text-base-100">
        <p>> LATEST BLOGS</p>
    </div>
    <div class="">
        <div class="flex flex-col gap-3 px-5 pt-5">
            <div class="flex flex-row gap-4 items-center">
                <p class="shrink-0">mm-dd-yyyy</p>
                <p class="shrink-0">-</p>
                <a href="" class="link link-hover">Title</a>
            </div>
        </div>
        <a href={resolve('/blogs')} class="flex justify-end link link-hover m-2">More....</a> 
    </div>
</div>

<style>
    hr {
        margin-top: 2px;
        margin-bottom: 2px;
    }
</style>