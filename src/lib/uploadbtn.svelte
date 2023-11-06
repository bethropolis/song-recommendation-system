<script>
  import { handleFileUpload } from "../static/js/upload";

  export let refresh;

  function triggerFileUpload() {
    const fileInput = document.getElementById("file");
    fileInput.click();
  }

  async function makeUpload(e) {
    let isUploaded = await handleFileUpload(e);
    await refresh();
  }
</script>

<div class="foot">
  <input
    type="file"
    name="file"
    id="file"
    hidden
    accept=".json"
    on:change={makeUpload}
  />
  <button class="upload-btn" on:click={triggerFileUpload}>
    <span>upload</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2h-16v-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  </button>
</div>

<style>
  .foot {
    @apply absolute flex w-full justify-center p-3 bottom-0 z-10;
  }
  .upload-btn {
    @apply px-4 py-2 m-3 bg-green-300 text-white rounded-full flex justify-center items-center fill-white;
  }
  .upload-btn:hover {
    @apply bg-green-400;
  }
</style>
