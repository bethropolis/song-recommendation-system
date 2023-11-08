<script>
  import { onMount } from "svelte";
  import { db } from "../static/js/db";
  import Uploadbtn from "./uploadbtn.svelte";

  let files = [];

  // Function to fetch files from the database
  async function fetchFiles() {
    // @ts-ignore
    const openFiles = await db.openFiles.toArray();
    files = openFiles;
  }


  const refresh = (()=>{
    fetchFiles();
  })
  async function deleteFile(id){
    // @ts-ignore
    await db.openFiles.delete(id);
    await fetchFiles();
  }

  onMount(fetchFiles); // Fetch the files when the component is mounted
</script>

<div>
  <h2 class="heading">Playlist Files</h2>

  <div class="list mt-8 space-y-4">
    {#if files.length > 0}
    {#each files as file (file.id)}
      <div class="file-item hover:bg-gray-200 dark:hover:bg-gray-600">
        <div class="">
          <button class="dl-button bg-transparent outline-none border-none" on:click={()=>deleteFile(file.id)}>
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
        </div>
        <div class="w-full">
          <span class="file-name  text-gray-500 dark:text-gray-300">{file.fileName}</span>
        </div>
      </div>
    {/each}
    {:else}
      <div class="text-center">
        <span class="text-gray-500 dark:text-gray-300 font-small">
          No files found
        </span>
      </div>
    {/if}
  </div>
  <Uploadbtn {refresh}/>
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
    @apply text-sm select-none;
  }

  .dl-button {
    @apply fill-red-400;
  }
</style>
