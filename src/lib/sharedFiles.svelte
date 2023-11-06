<script>
  import { onMount } from "svelte";
  import { db } from "../static/js/db";

  let files = [];

  // Function to fetch files from the database
  async function fetchFiles() {
    // @ts-ignore
    const openFiles = await db.sharedData.toArray();
    files = openFiles;
  }

  const refresh = () => {
    console.log("refreshing");
    fetchFiles();
  };

  async function deleteFile(id) {
    // @ts-ignore
    await db.sharedData.delete(id);
    await fetchFiles();
  }

  onMount(fetchFiles); // Fetch the files when the component is mounted
</script>

<div>
  <h2 class="heading">Playlist Files</h2>

  <div class="list mt-8 space-y-4">
    {#each files as file (file.id)}
      <div class="file-item hover:bg-gray-100">
        <div class="flex flex-col justify-between">
          <button class="load-button bg-transparent outline-none border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              ><path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 6v12m-6-6h12"
              /></svg
            >
            <button
              class="dl-button bg-transparent outline-none border-none"
              on:click={() => deleteFile(file.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </button>
          </button>
        </div>
        <div class="w-full flex flex-col justify-between">
          <span class="file-name">{file.userId}</span>
          <span class="time">{new Date(file.timestamp).toLocaleString()}</span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .heading {
    @apply px-5 text-lg font-medium text-gray-800 text-slate-500 uppercase;
  }

  .list {
    max-height: 75vh;
    overflow-y: auto;
  }

  .file-item {
    @apply p-3 flex flex-row-reverse justify-between;
  }

  .file-name {
    @apply text-lg text-gray-500 select-none w-full;
  }

  .time {
    @apply text-xs text-gray-400 select-none;
  }

  .dl-button {
    @apply fill-red-400;
  }
  .load-button {
    @apply text-green-600;
  }
</style>
