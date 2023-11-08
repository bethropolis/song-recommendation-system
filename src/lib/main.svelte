<script>
  import Navmain from "./navmain.svelte";
  import About from "./settingsMain.svelte";
  import ChartsMain from "./chartsMain.svelte";
  import { onMount } from "svelte";
  import PlaylistMain from "./playlistMain.svelte";
  import { active_tab, sidebarIsopen } from "../store";
  import SharedMain from "./sharedMain.svelte";

  const routes = [
    { path: "/", component: PlaylistMain },
    { path: "/shared", component: SharedMain },
    { path: "/charts", component: ChartsMain },
    { path: "/settings", component: About },
  ];

  let Page;

  function handleRouteChange(path) {
    Page = routes.find((route) => route.path === path).component;
  }

  onMount(() => {
    handleRouteChange($active_tab);
  });

  $: $active_tab && handleRouteChange($active_tab);
</script>

<main
  class="bg-white overflow-y-auto dark:border-gray-600 bg-transition border-l dark:bg-gray-700 darK:text-white {$sidebarIsopen ? "w-1/2 overflow-y-hidden":"w-full"} md:w-full"
>
  <Navmain />

  {#if !$sidebarIsopen}
  <svelte:component this={Page} />
  {:else}

  <div class="h-full w-full grid place-content-center">
    <button on:click={() => ($sidebarIsopen = !$sidebarIsopen)}
      class="text-gray-500 dark:text-gray-300 bg-transparent outline-none border p-3 border-gray-200 dark:border-gray-600 uppercase"
      >close</button>
  </div>
  {/if}
</main>

<style>
main{
  @apply h-screen relative overflow-x-hidden border-r ;
}
</style>
