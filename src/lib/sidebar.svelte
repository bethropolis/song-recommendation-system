<script>
  import { onMount } from "svelte";
  import page from "page";
  import FilesList from "./filesList.svelte";
  import SharedFiles from "./sharedFiles.svelte";
  import Charts from "./charts.svelte";
  import Settings from "./settings.svelte";
  import { active_tab } from "../store";

  const routes = [
    { path: "/", component: FilesList },
    { path: "/shared", component: SharedFiles },
    { path: "/charts", component: Charts },
    { path: "/settings", component: Settings }
  ];

  let Page;

  function handleRouteChange({ path }) {
    $active_tab = path;
    Page = routes.find((route) => route.path === path).component;
  }

  page(handleRouteChange);

  onMount(() => {
    page.start();
  });
</script>

<main class="h-screen py-8 relative overflow-y-auto bg-white border-l border-r sm:w-64 w-60">
  <!-- Render the current page component -->
  <svelte:component this={Page} />
</main>


