<script>
  export let results = {};
</script>

<div class="results-container">
  <div class="result-card">
    <img src={results.album_cover} alt={results.song} class="cover-img" />
    <div class="song-details">
      <p class="song-name">{results.song}</p>
      <p class="artist-name">{results.artist}</p>
    </div>
  </div>
</div>

<style>
  .results-container {
    @apply flex items-center space-x-2;
  }
  .result-card {
    @apply flex items-center w-full mx-3 space-x-2 p-2 gap-3 border rounded-lg bg-white;
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
    @apply font-medium text-gray-800;
  }

  .artist-name {
    @apply text-gray-500;
  }
</style>
