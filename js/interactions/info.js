/**
 * PLANET INFO DISPLAY
 * Shows/hides planet information cards
 */

/**
 * Show planet information card
 * @param {Object} planet - Planet object
 */
export function showPlanetInfo(planet) {
	const infoDiv = document.getElementById("planet-info");

	const moonInfo =
		planet.moons.length > 0
			? `<p><strong>Moons:</strong> ${planet.moons.length}</p>`
			: "";

	infoDiv.innerHTML = `
        <h2>${planet.name}</h2>
        <p><strong>Real Distance from Sun:</strong> ${planet.data.realDistance}</p>
        <p><strong>Mass:</strong> ${planet.data.mass}</p>
        ${moonInfo}
        <p class="fun-fact">${planet.data.funFact}</p>
        <p class="close-hint">Click elsewhere to close</p>
    `;

	infoDiv.classList.remove("hidden");
}

/**
 * Hide planet information card
 */
export function hidePlanetInfo() {
	const infoDiv = document.getElementById("planet-info");
	infoDiv.classList.add("hidden");
}
