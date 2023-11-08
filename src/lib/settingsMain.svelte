<script>
  import { DB, db } from "../static/js/db";
  import showToast from "../static/js/toast";
  import { userSettings } from "../store";
  import { get } from "svelte/store"; // import the get method

  // create a function to handle the input changes
  function handleChange(event) {
    // get the name and value of the input element
    const { name, value } = event.target;
    // update the store with the new value
    userSettings.update((settings) => {
      settings[name] = value;
      return settings;
    });


   

    // use the get method to get the current value of the store
    const currentSettings = get(userSettings);
    // save the current settings to the DB
    DB.set("storedSettings", currentSettings);
  }

  async function ChangeUsername(event) {
    await db.users.update(1, { username: event.target.value });

    handleChange(event);
  }

  // clear the DB and db
  function clearDB() {
    DB.clear();
    db.tables.forEach((table) => {
      table.clear();
    });

    showToast("Data cleared successfully", "success");
  }
</script>

<div class="container">
  <h1 class="title dark:text-gray-100">Settings</h1>
  <!-- use the $store syntax to access the store values -->
  <div class="option">
    <label for="username" class="label text-sm md:text-lg dark:text-gray-100"
      >Username</label
    >
    <input
      id="username"
      name="username"
      type="text"
      class="input"
      value={$userSettings.username}
      on:input={ChangeUsername}
    />
  </div>
  <div class="option">
    <label
      for="max-recommendation"
      class="label text-sm md:text-lg dark:text-gray-100"
      >Max Recommendation</label
    >
    <input
      id="max-recommendation"
      name="maxRecommendation"
      type="number"
      class="input"
      value={$userSettings.maxRecommendation}
      on:input={handleChange}
    />
  </div>

  <!-- clear the DB -->
  <div class="option">
    <label for="clear-db" class="label text-sm md:text-lg dark:text-gray-100"
      >Clear stored data</label
    >
    <button
      id="clear-db"
      on:click={clearDB}
      class="clear-button text-sm md:text-lg bg-red-500 hover:bg-red-600 dark:bg-red-400 text-gray-100"
    >
      Clear
    </button>
  </div>

  <div class="mt-20">
    <a
      href="https://github.com/bethropolis/song-recommendation-system/issues"
      target="_blank"
      rel="noopener noreferrer"
      class="text-green-500 dark:text-green-300"
    >
      Do you have any suggestions? Make an issue here.
    </a>
  </div>
</div>

<p
  class="absolute text-center w-full bottom-0 py-3 text-gray-500 dark:text-slate-100"
>
  Made with 💜 by <a
    href="http://github.com/bethropolis/"
    class="text-purple-500 underline"
    target="_blank"
    rel="noopener noreferrer">bethropolis</a
  >
</p>

<style>
  /* use Tailwind utility classes to style the page */
  .container {
    @apply max-w-3xl mx-auto p-4;
  }

  .title {
    @apply text-3xl font-bold mb-4;
  }

  .option {
    @apply flex items-center justify-between mb-2;
  }

  .input {
    @apply border rounded px-2 py-1;
  }

  .clear-button {
    @apply rounded px-4 py-2;
  }
</style>
