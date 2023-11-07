<script>
  import { onMount } from "svelte";
  import { checkIfDataAvailable } from "../static/js/extra";
  import Genres from "./charts/genres.svelte";
  import TopArtist from "./charts/topArtist.svelte";

  let dataAvailable = false;
  async function check() {
    dataAvailable = await checkIfDataAvailable();
    console.log("🚀 ~ file: chartsMain.svelte:8 ~ check ~ d:", dataAvailable);
  }


  onMount(check);
</script>

<h2 class="search-heading text-gray-700 dark:text-slate-100">data analysis</h2>
<main class="flex-col md:flex-row">
  {#if dataAvailable}
    <div>
      <Genres />
    </div>
    <div>
      <TopArtist />
    </div>
  {:else}{/if}
</main>

<style>
  main {
    @apply h-5/6 w-full flex justify-evenly;
  }
  .search-heading {
    @apply mx-4 text-2xl font-bold uppercase;
  }

  div {
    @apply flex-1 justify-center items-center;
  }
</style>
