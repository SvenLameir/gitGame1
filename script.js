// Fetch the map.json file and display it
fetch('map.json')
    .then(response => response.json())
    .then(data => {
        const mapDiv = document.getElementById("map");
        mapDiv.style.gridTemplateColumns = `repeat(${data.grid[0].length}, 40px)`;

        data.grid.forEach(row => {
            row.forEach(tile => {
                let div = document.createElement("div");
                div.className = `tile ${tile}`;
                div.innerText = tile[0].toUpperCase(); // First letter for quick identification
                mapDiv.appendChild(div);
            });
        });
    })
    .catch(error => console.error("Error loading map:", error));
