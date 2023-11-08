<script>
  import { DB } from "../static/js/db";
  import { checkIfDataAvailable } from "../static/js/extra";
  import { userColors } from "../store";

  
  // function to add a new color to the store
  function addColor() {
    // generate a random hex color
    let hex = Math.floor(Math.random() * 16777215).toString(16);
    // pad with zeros if needed
    hex.length < 6 ? hex.padStart(6, "0") : hex;
    // prepend the # symbol
    hex = "#" + hex;
    // push the new color to the store
    userColors.update((colors) => [...colors, hex]);
    // save the updated store to the database
    DB.set("colors", $userColors);
  }
</script>

<div class="main h-full w-full p-2">
  {#await checkIfDataAvailable() then result}
    {#if result}
      <h2
        class="text-gray-700 dark:text-slate-100 uppercase text-lg font-medium mb-2"
      >
        Chart colors
      </h2>

      <div class="grid grid-cols-3 gap-4 items-center justify-center mb-4">
        {#each $userColors as color (color)}
          <div class="item">
            <label
              for={color}
              class="border-0 block rounded-full w-8 h-8 mr-2 mb-2"
              style:background={color}
            />
            <input
              type="color"
              id={color}
              bind:value={color}
              on:change={() => DB.set("colors", $userColors)}
              hidden
            />
          </div>
        {/each}
      </div>
      <!-- button to add a new color -->
      <button
        class="bg-green-500 text-white px-4 py-2 mt-4 mx-auto rounded"
        on:click={addColor}>Add color</button>
      {:else}
      <div class="msg text-center">
        <span class="text-gray-500 dark:text-gray-300 font-small">No data</span>
      </div>
    {/if}
  {/await}
</div>
