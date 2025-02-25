// Load map
fetch('map.json')
    .then(response => response.json())
    .then(data => {
        const mapDiv = document.getElementById("map");
        mapDiv.style.display = "grid";
        mapDiv.style.gridTemplateColumns = `repeat(${data.grid[0].length}, 50px)`;

        data.grid.flat().forEach(tile => {
            let div = document.createElement("div");
            div.className = `tile ${tile}`;
            div.innerText = tile[0].toUpperCase();
            mapDiv.appendChild(div);
        });
    });

// Load player data
fetch('players/playerX.json')
    .then(response => response.json())
    .then(player => {
        document.getElementById("player-info").innerHTML = `
            <p>Name: ${player.name}</p>
            <p>Money: ${player.money}</p>
            <p>Wood: ${player.inventory.wood}</p>
            <p>Stone: ${player.inventory.stone}</p>
        `;
    });
