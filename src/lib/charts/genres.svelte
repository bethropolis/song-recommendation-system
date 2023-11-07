<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { DB, db } from "../../static/js/db";
  import { userColors } from "../../store";

  let genreData = {};

  onMount(async () => {
    // Fetch data from the Dexie database
    const files = await db.openFiles.toArray();

    // Loop through the files and extract genre data
    files.forEach((file) => {
      // Parse the JSON data from fileData
      const jsonFile = JSON.parse(JSON.parse(file.fileData));

      const genre = file.fileName.split(".")[0];

      jsonFile.forEach((data) => {
        if (!genreData[genre]) {
          genreData[genre] = 0; // Initialize the genre count if it doesn't exist
        }
        genreData[genre]++;
      });
    });

    // Get the canvas element for the chart
    const canvas = document.getElementById("genrePieChart");
    let borderColor = DB.get("darkMode") ? "#ffffff" : "#cccccc";

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(genreData), // Genres
        datasets: [
          {
            data: Object.values(genreData),
            backgroundColor: $userColors,
            borderColor: borderColor,
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "Genre Distribution",
          fontSize: 18,
        },
      },
    });
  });
</script>

<canvas id="genrePieChart" />

<style>
  canvas {
    @apply mx-auto;
    /* Responsive canvas size */
    max-width: 350px;
    width: 100%;

    max-height: 350px;
    height: 100%;

    /* Set a fixed width for larger screens */
    @media (min-width: 1024px) {
      max-width: 350px;
      max-height: 350px;
    }
  }
</style>
