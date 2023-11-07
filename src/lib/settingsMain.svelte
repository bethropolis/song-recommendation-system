<script>
  import { DB, db } from "../static/js/db";
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
</script>

<div class="container">
  <h1 class="title dark:text-gray-100">Settings</h1>
  <!-- use the $store syntax to access the store values -->
  <div class="option">
    <label for="username" class="label dark:text-gray-100">Username</label>
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
    <label for="max-recommendation" class="label dark:text-gray-100"
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

  <div class="mt-8">
    <a
      href="https://github.com/bethropolis/recommendation-system/issues"
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

  .label {
    @apply text-lg;
  }

  .input {
    @apply border rounded px-2 py-1;
  }

  .toggle {
    @apply relative inline-flex items-center h-6 rounded-full w-11;
  }

  .toggle input {
    @apply opacity-0 w-0 h-0;
  }

  .toggle-slider {
    @apply absolute h-4 w-4 rounded-full bg-white shadow inset-y-0 left-0 transition;
  }

  .toggle-slider:before {
    @apply absolute inset-0 h-full w-full flex items-center justify-center text-xs font-medium uppercase;
    content: "Off";
  }

  .toggle input:checked + .toggle-slider {
    @apply transform translate-x-full;
  }

  .toggle input:checked + .toggle-slider:before {
    @apply text-green-500;
    content: "On";
  }
</style>
