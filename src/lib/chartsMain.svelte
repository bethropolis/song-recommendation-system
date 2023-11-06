<script>
    import Genres from "./charts/genres.svelte";
    import TopArtist from "./charts/topArtist.svelte";
  </script>
  
  <main>
    <div>
      <Genres />
    </div>
    <div>
      <TopArtist />
    </div>
  </main>

  <style>
    main {
      @apply h-fit flex justify-evenly;
    }

    div{
      @apply flex-1 justify-center items-center;
    }
  </style>