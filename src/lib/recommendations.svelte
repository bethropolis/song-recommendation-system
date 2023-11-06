<script>
  import SearchResults from "./SearchResults.svelte";
  import Song from "./song.svelte";

  export let recommendations = [];
</script>

<div class="top">
  {#await recommendations}
    <p>Loading...</p>
  {:then results}
    {#if results.length > 0}
      <h3 class="text-lg font-medium mb-2">
        song Recommendations similar to above:
      </h3>
      {#each results as result}
      <div class="item">
        <Song results={result}/></div>
      {/each}
    {/if}
  {/await}
</div>

<style>
.top{
 @apply  mt-4;
}
.item{
    @apply mt-1;
}
</style>