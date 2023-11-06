<!-- SearchResults.svelte -->
<script>
  import Song from "./song.svelte";

  export let searchResults = {};
</script>

<div class="top">
  {#await searchResults}
    <p>Loading...</p>
  {:then results}
    {#if results.no}
      <Song {results}/>
    {:else}
      <p class="no-results-text">No results found.</p>
    {/if}
  {/await}
</div>

<style>
  .top {
    @apply mt-1;
  }
 

  .no-results-text {
    @apply text-gray-500;
  }
</style>
