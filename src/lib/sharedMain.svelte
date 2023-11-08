<script>
  import {
    handleExportButtonClick,
    handleSharedDataUpload,
  } from "../static/js/share";
  import showToast from "../static/js/toast";

  // Function to trigger file input click
  function triggerFileInputClick() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  }

  async function handleUpload(event) {
    const uploadResult = await handleSharedDataUpload(event);
    console.log("🚀 ~ file: sharedMain.svelte:16 ~ handleUpload ~ uploadResult:", uploadResult)

    if (uploadResult.success) {
      showToast(uploadResult.message, "success");
    } else {
      showToast(uploadResult.message, "error");
    }
  }
</script>

<main>
  <div>
    <input
      type="file"
      accept=".json"
      on:change={handleUpload}
      id="fileInput"
      hidden
    />
    <button on:click={triggerFileInputClick}>Import Data</button>
    <button on:click={handleExportButtonClick}>Export data</button>
  </div>
</main>

<style>
  main {
    @apply h-5/6 w-full grid place-content-center;
  }

  div {
    @apply flex justify-between gap-4;
  }
  button {
    @apply p-3 px-5 text-white bg-green-500 rounded-full;
  }
  button:hover {
    @apply bg-green-800;
  }
</style>
