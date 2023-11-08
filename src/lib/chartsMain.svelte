<script>
  import { onMount } from "svelte";
  import { checkIfDataAvailable } from "../static/js/extra";
  import Genres from "./charts/genres.svelte";
  import TopArtist from "./charts/topArtist.svelte";

  let dataAvailable = false;
  async function check() {
    dataAvailable = await checkIfDataAvailable();
  }


  onMount(check);
</script>

<main>
<h2 class="search-heading text-gray-500 dark:text-slate-100">data analysis</h2>
<div class="main flex-col md:flex-row relative my-8 md:mt-0">
  {#if dataAvailable}
    <div>
      <Genres />
    </div>
    <div>
      <TopArtist />
    </div>
  {:else}
  <div class="msg">
    <h3 class="text-lg text-center font-medium mb-2 text-red-500 dark:text-red-200">
      No playlist files available, please upload.
    </h3>
  </div>
  {/if}
</div>

<div class="mt-60"></div>
</main>
<style>
  main{
    min-height: 83vh;
    @apply h-fit;
  }
  .main {
    @apply h-full w-full flex justify-evenly;
  }
  .search-heading {
    @apply mx-4 text-2xl font-bold uppercase;
  }

  div:not(.main) {
    @apply flex-1 justify-center items-center;
  }
</style>
