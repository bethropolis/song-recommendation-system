<script>
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";
  import { DB, db } from "../../static/js/db";
  import { userColors } from "../../store"; // import userColors as a writable store

  let genreData = {};
  let chart; // declare chart variable

  async function createChart() {
    // make the function async
    // Fetch data from the Dexie database
    const files = await db.openFiles.toArray(); // use await to get the files

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

    // Destroy the existing chart if it exists
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: Object.keys(genreData), // Genres
        datasets: [
          {
            data: Object.values(genreData),
            backgroundColor: $userColors, // Use $userColors directly
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
  }

  onMount(createChart);

  // Subscribe to userColors changes
  userColors.subscribe(() => {
    createChart();
  });
</script>

<div class="w-full">
<canvas id="genrePieChart" />
</div>
<style>
  canvas {
    @apply mx-auto;
    /* Responsive canvas size */
    max-width: 350px;
    width: 100%;

    max-height: 350px;
    height: 100%;

    @media screen and (min-width: 1024px) {
      max-width: 350px;
      max-height: 350px;
    }

    @media screen and (max-width: 768px) {
      max-width: 300px;
      max-height: 300px;
    }

    @media screen and (max-width: 480px) {
      max-width: 250px;
      max-height: 250px;
    }

    @media screen and (max-width: 320px) {
      max-width: 200px;
      max-height: 200px;
    }

  }
</style>
