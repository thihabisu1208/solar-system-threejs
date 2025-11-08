/**
 * MAIN ENTRY POINT
 * Initializes everything and runs animation loop
 */

import { controls, getSpeedMultiplier, getIsPaused } from "./setup/controls.js";
import { scene, camera, renderer, labelRenderer } from "./setup/scene.js";
import { drawMinimap } from "./setup/ui.js";
import { createAsteroidBelt } from "./objects/asteroids.js";
import { createSun, createPlanets } from "./objects/celestial.js";
import { createConstellations } from "./objects/constellations.js";
import { createStarfield, createOrbitLines } from "./objects/environment.js";
import { initTrails, updateTrail } from "./objects/trails.js";
import { updateFollowMode } from "./interactions/camera.js";
import { setupMouseClick, setupMouseMove } from "./interactions/raycaster.js";
import { initToggles, initHelpPanel } from "./utils/toggles.js";
import {
	updateSpeedDisplay,
	updatePauseButton,
	updateTimeDisplay,
	incrementSimulationDay,
} from "./utils/updates.js";
import {
	SUN_ROTATION_SPEED,
	STARFIELD_ROTATION_SPEED,
	ORBIT_SPEED_MULTIPLIER,
	PLANET_ROTATION_MULTIPLIER,
	MOON_ORBIT_MULTIPLIER,
	MOON_ROTATION_MULTIPLIER,
} from "./config/constants.js";

// ============================================
// INITIALIZATION
// ============================================

// Create environment
const starfield = createStarfield();
createConstellations();
const orbitLines = createOrbitLines();

// Create celestial objects
const sun = createSun();
const planets = createPlanets();
initTrails(planets);
const asteroids = createAsteroidBelt();

// Setup interactions
setupMouseClick(planets);
setupMouseMove(planets);

// Initialize toggles with references
initToggles(orbitLines, planets);
initHelpPanel();

// Initialize UI
updateSpeedDisplay();
updatePauseButton();

// ============================================
// ANIMATION LOOP
// ============================================

/**
 * Main animation loop
 * Updates all objects and renders scene every frame
 */
function animate() {
	requestAnimationFrame(animate);

	// Rotate sun
	sun.rotation.y += SUN_ROTATION_SPEED;
	starfield.rotation.y += STARFIELD_ROTATION_SPEED;

	// Update planets, moons, and asteroids if not paused
	if (!getIsPaused()) {
		const speed = getSpeedMultiplier();

		// Increment simulation time
		incrementSimulationDay(speed);

		// Update planets
		planets.forEach((planet) => {
			// Orbital rotation (planet moves around sun)
			planet.orbitGroup.rotation.y +=
				planet.orbitSpeed * ORBIT_SPEED_MULTIPLIER * speed;

			// Planet self-rotation
			planet.mesh.rotation.y +=
				planet.rotationSpeed * PLANET_ROTATION_MULTIPLIER * speed;

			// Update trails
			updateTrail(planet);

			// Update moons
			planet.moons.forEach((moon) => {
				moon.orbitGroup.rotation.y +=
					moon.orbitSpeed * MOON_ORBIT_MULTIPLIER * speed;
				moon.mesh.rotation.y += MOON_ROTATION_MULTIPLIER * speed;
			});
		});

		// Update asteroids
		asteroids.forEach((asteroid) => {
			asteroid.mesh.rotation.x += asteroid.rotationSpeed * speed;
			asteroid.mesh.rotation.y += asteroid.rotationSpeed * speed;
		});

		// Update time display
		updateTimeDisplay();
	}

	updateFollowMode();

	// Update controls and render
	controls.update();

	drawMinimap(planets, camera);
	renderer.render(scene, camera);
	labelRenderer.render(scene, camera);
}

// Start animation loop
animate();
