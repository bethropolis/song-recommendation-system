<script>
  import Navmain from "./navmain.svelte";
  import About from "./about.svelte";
  import ChartsMain from "./chartsMain.svelte";
  import { onMount } from "svelte";
  import PlaylistMain from "./playlistMain.svelte";
  import { active_tab } from "../store";
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
  class="h-full relative overflow-y-auto bg-white border-l border-r w-full"
>
  <Navmain />

  <svelte:component this={Page} />
</main>

<style>
</style>
