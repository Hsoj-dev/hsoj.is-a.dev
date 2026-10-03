<!-- src\lib\components\SiteButton.svelte -->
<script lang="ts">
    import { page } from '$app/state';

    let copied = $state(false);
    let timer: ReturnType<typeof setTimeout>;

    const code = $derived(
        `<a href="${page.url.origin}/"><img src="${page.url.origin}/images/button.svg" width="88" height="31" alt="Hsoj-Dev"></a>`
    );

    async function copy() {
        try {
            await navigator.clipboard.writeText(code);
            copied = true;
            clearTimeout(timer);
            timer = setTimeout(() => (copied = false), 2000);
        } catch {
            /* clipboard blocked: the textarea is still selectable by hand */
        }
    }
</script>

<div class="flex flex-col items-center gap-4 md:flex-row md:items-center">
    <img src="/images/button.svg" width="88" height="31" alt="Hsoj-Dev 88x31 button" class="shrink-0" />
    <div class="flex w-full flex-col gap-2">
        <p class="flex self-center md:self-start text-sm">Copy this into your site:</p>
        <textarea
            readonly
            rows="3"
            value={code}
            onfocus={(e) => e.currentTarget.select()}
            class="bg-base-200 w-full resize-none border-2 border-dotted p-2 text-sm focus:border-primary focus:border-solid focus:outline-none"
        ></textarea>
        <div class="flex self-center md:self-start">
            <button
                onclick={copy}
                class="hover:bg-base-content hover:text-base-100 cursor-pointer border-2 px-3 py-1 text-sm font-bold"
            >
                {copied ? 'COPIED!' : 'COPY'}
            </button>
        </div>
    </div>
</div>