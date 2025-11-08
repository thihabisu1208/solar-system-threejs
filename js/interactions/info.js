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
        <button id="close-planet-info" aria-label="Close">&times;</button>
        <h2>${planet.name}</h2>
        <p><strong>Real Distance from Sun:</strong> ${planet.data.realDistance}</p>
        <p><strong>Mass:</strong> ${planet.data.mass}</p>
        ${moonInfo}
        <p class="fun-fact">${planet.data.funFact}</p>
        <p class="close-hint desktop-only">Click elsewhere to close</p>
        <div class="mobile-actions mobile-only">
            <button id="resume-sim" class="action-btn">Resume</button>
            <button id="reset-view" class="action-btn">Reset View</button>
        </div>
    `;

	infoDiv.classList.remove("hidden");

	// Add event listeners for new buttons
	setupInfoCardButtons();
}

/**
 * Setup event listeners for info card buttons
 */
function setupInfoCardButtons() {
	// Close button
	const closeBtn = document.getElementById("close-planet-info");
	if (closeBtn) {
		closeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			hidePlanetInfo();
		});
	}

	// Resume button (mobile)
	const resumeBtn = document.getElementById("resume-sim");
	if (resumeBtn) {
		resumeBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			import("../setup/controls.js").then(({ setPaused }) => {
				setPaused(false);
				import("../utils/updates.js").then(
					({ updateSpeedDisplay, updatePauseButton }) => {
						updateSpeedDisplay();
						updatePauseButton();
					}
				);
			});
			hidePlanetInfo();
		});
	}

	// Reset view button (mobile)
	const resetBtn = document.getElementById("reset-view");
	if (resetBtn) {
		resetBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			import("./camera.js").then(({ resetCamera }) => {
				resetCamera();
			});
			hidePlanetInfo();
		});
	}
}

/**
 * Hide planet information card
 */
export function hidePlanetInfo() {
	const infoDiv = document.getElementById("planet-info");
	infoDiv.classList.add("hidden");
}
