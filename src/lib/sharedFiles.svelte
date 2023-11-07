<script>
  import { onMount } from "svelte";
  import { db } from "../static/js/db";
  import Toasty from "./toasty.svelte";

  let files = [];

  let dataLoad = false;
  let refreshing = false;
  // Function to fetch files from the database
  async function fetchFiles() {
    // @ts-ignore
    const openFiles = await db.sharedData.toArray();
    files = openFiles;
    files.reverse();
  }

  const refresh = () => {
    refreshing = true;
    console.log("refreshing");
    fetchFiles();

    setTimeout(() => {
      refreshing = false;
    }, 1000);
  };

  async function deleteFile(id) {
    // @ts-ignore
    await db.sharedData.delete(id);
    await fetchFiles();
  }

  async function loadData(id) {
    dataLoad = true;
    // @ts-ignore
    await db.openFiles.clear();
    // @ts-ignore
    let storedData = await db.sharedData.get(id);

    let data = storedData.data;
    console.log("🚀 ~ file: sharedFiles.svelte:32 ~ loadData ~ data:", data);

    // @ts-ignore
    db.openFiles.bulkPut(data);

    setTimeout(() => {
      dataLoad = false;
    }, 1000);
  }

  onMount(fetchFiles); // Fetch the files when the component is mounted
</script>

<div>
  <div class="flex">
    <h2 class="heading">Shared Files</h2>
    <div class="icons">
      <button
        class=" hover:bg-gray-100 rounded-full hover:dark:bg-gray-600"
        on:click={refresh}
        title="refresh data"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class:spin={refreshing}
          ><path
            fill="currentColor"
            d="M12 20q-3.35 0-5.675-2.325T4 12q0-3.35 2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.713T19 4q.425 0 .713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.713-.288T13 10q0-.425.288-.713T14 9h3.2q-.8-1.4-2.188-2.2T12 6Q9.5 6 7.75 7.75T6 12q0 2.5 1.75 4.25T12 18q1.7 0 3.113-.863t2.187-2.312q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20Z"
          /></svg
        ></button
      >
    </div>
  </div>

  <Toasty bind:show={dataLoad} message="Data has been loaded."/>
  <div class="list mt-8 space-y-4">
    {#each files as file (file.id)}
      <div class="file-item hover:bg-gray-200 dark:hover:bg-gray-600">
        <div class="flex flex-col justify-between">
          <button
            class="load-button bg-transparent outline-none border-none"
            on:click={() => loadData(file.id)}
          >
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
          <span class="file-name text-gray-500 dark:text-gray-300"
            >{file.userId}</span
          >
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
    @apply text-lg select-none w-full;
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
  .icons {
    @apply text-slate-400;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
