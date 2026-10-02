<!-- src\lib\components\Guestbook.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { guestbook } from '$lib/guestbook.svelte';

    const MAX = 500; // set this to your guestbook's real limit

    const field = 'w-full border-2 border-dotted bg-base-200 p-2 placeholder:opacity-60 focus:border-solid focus:border-primary focus:outline-none';

    let formEl: HTMLFormElement;
    let messagesEl: HTMLDivElement;
    let text = $state('');
    let submitted = false;

    const left = $derived(MAX - text.length);

    function onSubmit() {
        submitted = true;
    }

    // The form posts into a hidden iframe, so the visitor stays on this page.
    function onFrameLoad() {
        if (!submitted) return; // ignore the iframe's initial blank load
        submitted = false;
        formEl.reset();
        text = '';
    }

    onMount(() => {
        // message count: recount whenever the embed script adds or removes messages
        const recount = () =>
            (guestbook.count = messagesEl.querySelectorAll('.guestbook-message').length);
        recount();
        const observer = new MutationObserver(recount);
        observer.observe(messagesEl, { childList: true });

        // load the embed script only after the form and containers exist
        const script = document.createElement('script');
        script.src = 'https://guestbooks.meadow.cafe/resources/js/embed_script/6605/script.js';
        script.async = true;
        document.body.append(script);

        return () => {
            observer.disconnect();
            script.remove();
        };
    });
</script>

<iframe name="guestbook-target" title="Guestbook submission" class="hidden" onload={onFrameLoad}></iframe>

<!-- Guestbook Form -->
<div id="guestbooks___guestbook-form-container">
    <form
        bind:this={formEl}
        id="guestbooks___guestbook-form"
        action="https://guestbooks.meadow.cafe/guestbook/6605/submit"
        method="post"
        target="guestbook-target"
        onsubmit={onSubmit}
        class="flex flex-col"
    >
        <div class="guestbooks___input-container mb-5">
            <input type="text" id="name" name="name" placeholder="Your Name" required class={field} />
        </div>

        <div class="guestbooks___input-container mb-5">
            <input type="url" id="website" name="website" placeholder="Website (optional)" class={field} />
        </div>

        <div id="guestbooks___challenge-answer-container"></div>

        <div class="guestbooks___input-container">
            <textarea
                id="text"
                name="text"
                rows="4"
                maxlength={MAX}
                placeholder="Leave your message here... (plain text only)"
                required
                bind:value={text}
                class="{field} resize-y"
            ></textarea>
            <p class="mt-1 text-right text-sm {left < 50 ? 'text-warning' : 'opacity-70'}">
                {text.length}/{MAX}
            </p>
        </div>

        <p class="text-[15px] mb-2">Note: All messages are reviewed and approved before they show up in the guestbook.</p>

        <div id="guestbooks___pow-status" class="text-sm"></div>

        <div>
            <button type="submit" class="cursor-pointer border-2 border-primary bg-primary px-4 py-2 font-bold text-primary-content hover:bg-base-100 hover:text-primary">Sign Guestbook</button>
        </div>

        <div id="guestbooks___error-message" class="text-error"></div>
    </form>
</div>

<!-- Attribution -->
<div id="guestbooks___guestbook-made-with" class="text-right">
    <small>Powered by <a href="https://guestbooks.meadow.cafe" target="_blank" class="link">Guestbooks</a></small>
</div>

<!-- Messages Section -->
<hr class="my-3"/>
<h3 id="guestbooks___guestbook-messages-header" class="mb-2 text-xl">Messages</h3>
<div id="guestbooks___guestbook-messages-container" bind:this={messagesEl} class="flex flex-col gap-4"></div>

<style>
    /* each message becomes a mini panel */
    #guestbooks___guestbook-messages-container :global(.guestbook-message) {
        border: 2px solid currentColor;
    }
    /* name + date row = header bar */
    #guestbooks___guestbook-messages-container :global(.guestbook-message > p) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-height: 2rem;
        margin: 0;
        padding: 0 0.5rem;
        border-bottom: 2px solid currentColor;
    }
    #guestbooks___guestbook-messages-container :global(.guestbook-message > p::before) {
        content: '>';
    }
    #guestbooks___guestbook-messages-container :global(.guestbook-message:hover > p) {
        background: var(--color-base-content);
        color: var(--color-base-100);
    }
    #guestbooks___guestbook-messages-container :global(.guestbook-message small) {
        opacity: 0.7;
    }
    #guestbooks___guestbook-messages-container :global(.guestbook-message blockquote) {
        margin: 0;
        padding: 1rem;
        border: 0;
        font-style: normal;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font-style: italic;
    }
    #guestbooks___guestbook-messages-container :global(.guestbook-message a) {
        color: var(--color-primary);
        text-decoration: underline;
    }
    .guestbook-message:hover > p a {
        color: inherit;
    }
</style>