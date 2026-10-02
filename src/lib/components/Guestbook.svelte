<!-- src\lib\components\Guestbook.svelte -->
<svelte:head>
  <script async src="https://guestbooks.meadow.cafe/resources/js/embed_script/6605/script.js"></script>
</svelte:head>

<!-- Guestbook Form -->
<div id="guestbooks___guestbook-form-container">
  <form id="guestbooks___guestbook-form" action="https://guestbooks.meadow.cafe/guestbook/6605/submit" method="post">
    <div class="guestbooks___input-container">
      <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Your Name" 
          required 
          class="border-2 border-dotted p-2 mb-5 w-full">
    </div>

    <div class="guestbooks___input-container">
      <input 
          type="url" 
          id="website" 
          name="website" 
          placeholder="Website (optional)"
          class="border-2 border-dotted p-2 mb-5 w-full">
    </div>
    
    <div id="guestbooks___challenge-answer-container"></div>
    
    <div class="guestbooks___input-container">
      <textarea 
          class="border-2 border-dotted p-2"
          id="text" 
          name="text" 
          placeholder="Leave your message here... (plain text only)" 
          rows="4" style="width: 100%; box-sizing: border-box; resize: vertical;" 
          required></textarea>
    </div>

    <p class="my-3">Note: All messages are reviewed and manually approved before they show up in the guestbook. </p>
    
    <div id="guestbooks___pow-status"></div>
        <button type="submit" class="bg-white p-2 text-black shadow-[5px_5px_0px_0px_#000000] hover:shadow-none transition-shadow duration-200">Sign Guestbook</button>
    <div id="guestbooks___error-message"></div>
  </form>
</div>

<!-- Attribution -->
<div id="guestbooks___guestbook-made-with" style="text-align: right;">
  <small>Powered by <a href="https://guestbooks.meadow.cafe" target="_blank" class="link">Guestbooks</a></small>
</div>

<!-- Messages Section -->
<hr class="my-3">
<h3 id="guestbooks___guestbook-messages-header" class="mb-2 text-xl">Messages</h3>
<div id="guestbooks___guestbook-messages-container" class="flex flex-col gap-4"></div>

<style>
    #guestbooks___guestbook-messages-container :global(p) {
      color: white;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  
    #guestbooks___guestbook-messages-container :global(blockquote) {
      border-left: 4px solid white;
      padding-left: 1rem;
      font-style: italic;
      color: white;
    }
</style>