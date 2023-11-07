<script>
  export let results = {};
</script>

<div class="results-container">
  <div class="result-card  bg-white border dark:border-none  dark:bg-gray-600">
    <img src={results.album_cover} alt={results.song} class="cover-img" />
    <div class="song-details">
      <p class="song-name text-gray-800 dark:text-gray-100">{results.song}</p>
      <p class="artist-name text-gray-500 dark:text-gray-300">{results.artist}</p>
    </div>
  </div>
</div>

<style>
  .results-container {
    @apply flex items-center space-x-2;
  }
  .result-card {
    @apply flex items-center w-full mx-3 space-x-2 p-2 gap-3 rounded-lg;
  }
  .result-card:hover {
    @apply bg-slate-300;
  }

  .cover-img {
    @apply w-10 h-10 mx-2 object-cover rounded-lg;
  }

  .song-details {
    @apply px-3;
  }

  .song-name {
    @apply font-medium;
  }
</style>
