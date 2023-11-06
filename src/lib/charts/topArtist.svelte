<script>
    import { onMount } from "svelte";
    import { db } from "../../static/js/db";
  
    let topArtists = []; // Initialize an empty array to store top artists
  
    onMount(async () => {
      // Fetch data from the Dexie database
      const files = await db.openFiles.toArray();
  
      // Initialize an object to count artist occurrences
      const artistCounts = {};
  
      // Loop through the files and extract artist data
      files.forEach((file) => {
        // Parse the JSON data from fileData
        const jsonFile = JSON.parse(JSON.parse(file.fileData));
  
        jsonFile.forEach((data) => {
          const artist = data.artist;
  
          // Count the artist occurrences
          if (!artistCounts[artist]) {
            artistCounts[artist] = 0;
          }
          artistCounts[artist]++;
        });
      });
  
      // Convert the artist counts into an array of objects
      const artistArray = Object.keys(artistCounts).map((artist) => ({
        name: artist,
        count: artistCounts[artist],
      }));
  
      // Sort the artists by count in descending order
      artistArray.sort((a, b) => b.count - a.count);
  
      // Take the top 10 artists
      topArtists = artistArray.slice(0, 10);
    });
  </script>
  
    <h2>Top 10 Artists</h2>
    <table>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Song Count</th>
        </tr>
      </thead>
      <tbody>
        {#each topArtists as artist (artist.name)}
          <tr>
            <td>{artist.name}</td>
            <td>{artist.count}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  
  <style>
    table {
      @apply mx-auto border-collapse w-5/6;
    }
    h2{
      @apply text-center text-2xl font-bold text-gray-800;
    }
  
    th, td {
      @apply p-2 border border-gray-200 text-center;
    }
  
    th {
      @apply bg-gray-200;
    }
  </style>
  