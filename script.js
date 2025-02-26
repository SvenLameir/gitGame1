window.onload = function() {
    console.log("Loading Git MMO...");

    // Fetch the last commit date from the GitHub API
    fetch('https://api.github.com/repos/SvenLameir/gitGame1/commits/main') 
        .then(response => response.json())
        .then(data => {
            const commitDate = new Date(data.commit.author.date);
            document.getElementById("commit-date").innerText = commitDate.toLocaleString();
        })
        .catch(error => {
            console.error("Error fetching commit date:", error);
            document.getElementById("commit-date").innerText = "Error loading commit date";
        });

    // Fetch the map data from map.json
    fetch('map.json')  // Make sure this file is in the same directory
        .then(response => response.json())
        .then(data => {
            const mapGrid = data.grid;
            const mapDiv = document.getElementById("map");

            // Set grid columns based on map size
            mapDiv.style.gridTemplateColumns = `repeat(${mapGrid[0].length}, 40px)`;

            // Render the map tiles
            mapGrid.forEach(row => {
                row.forEach(tile => {
                    let div = document.createElement("div");
                    div.className = `tile ${tile}`;
                    div.innerText = tile[0].toUpperCase();  // Display first letter
                    mapDiv.appendChild(div);
                });
            });
        })
        .catch(error => console.error("Error loading map:", error));
};
