<script>
  import SearchResults from "./SearchResults.svelte";
  import { db } from "../static/js/db";
  import Recommendations from "./recommendations.svelte";

  let searchTerm = "";
  let searchResults = [];
  let recommendations = [];

  async function search() {
    recommendations = [];
    searchResults = [];
    // @ts-ignore
    const files = await db.openFiles.toArray();

    // Use a flag to track if a result has been found
    let resultFound = false;

    for (const file of files) {
      if (resultFound) {
        break; // If a result has already been found, exit the loop
      }

      const json_file = JSON.parse(JSON.parse(file.fileData));

      for (const data of json_file) {
        if (resultFound) {
          break; // If a result has already been found, exit the inner loop
        }

        const { song, artist } = data;
        if (
          song.toLowerCase() === searchTerm.toLowerCase() ||
          artist.toLowerCase() === searchTerm.toLowerCase()
        ) {
          searchResults = data;
          resultFound = true; // Set the flag to true

          // If the song/artist is found, recommend three random songs from the same playlist
          const samePlaylistSongs = json_file.filter((f) => f.no !== data.no);
          const randomRecommendations = shuffleArray(samePlaylistSongs).slice(
            0,
            3
          );
          recommendations = recommendations.concat(randomRecommendations);
        }
      }
    }
  }

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
</script>

<div class="search-container">
  <h2 class="search-heading">Search</h2>

  <div class="input-group">
    <input
      type="text"
      class="search-input"
      bind:value={searchTerm}
      placeholder="Search for a song or artist..."
      on:input={search}
    />

    <button class="search-button" on:click={search}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m21 21l-6-6m2-5a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z"
        /></svg
      >
    </button>
  </div>

  <div class="search-result">
    <h3 class="text-lg font-medium mb-2">Search Results:</h3>
    <SearchResults bind:searchResults />
  </div>

  <div class="recomendations">
    <Recommendations bind:recommendations />
  </div>
</div>

<style>
  .search-container {
    @apply p-4;
  }

  .search-heading {
    @apply text-2xl font-bold text-gray-800;
  }
  .input-group {
    @apply flex;
  }

  .search-input {
    @apply w-full p-2 mt-2 border rounded-l-lg text-gray-800;
  }

  .search-input:focus {
    @apply outline-none border-blue-400;
  }

  .search-button {
    @apply p-2 mt-2 items-center bg-green-400 text-white rounded-r-lg cursor-pointer;
  }

  .search-icon {
    @apply fill-current w-6 h-6;
  }
</style>
