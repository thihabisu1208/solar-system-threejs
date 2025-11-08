/**
 * RAYCASTER & MOUSE INTERACTIONS
 * Handles clicking and hovering over planets
 */

import * as THREE from "three";
import { camera } from "../setup/scene.js";
import { flyToPlanet } from "./camera.js";
import { showPlanetInfo, hidePlanetInfo } from "./info.js";

// Raycaster for mouse picking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Animation state
let isAnimating = false;

/**
 * Get animation state
 * @returns {boolean} Is camera animating
 */
export function getIsAnimating() {
	return isAnimating;
}

/**
 * Set animation state
 * @param {boolean} value - New animation state
 */
export function setIsAnimating(value) {
	isAnimating = value;
}

/**
 * Setup mouse click handler
 * @param {Array} planets - Array of planet objects
 */
export function setupMouseClick(planets) {
	window.addEventListener("click", (event) => {
		// Check if click is on planet info card or its children
		const infoCard = document.getElementById("planet-info");
		if (infoCard && !infoCard.classList.contains("hidden")) {
			if (infoCard.contains(event.target)) {
				return; // Don't process click if it's on the info card
			}
		}

		// Convert mouse position to normalized device coordinates (-1 to +1)
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const clickableMeshes = planets.map((p) => p.mesh);
		const intersects = raycaster.intersectObjects(clickableMeshes);

		if (intersects.length > 0) {
			// Clicked on a planet
			const clickedMesh = intersects[0].object;
			const clickedPlanet = planets.find((p) => p.mesh === clickedMesh);
			window.lastClickedPlanet = clickedPlanet;
			flyToPlanet(clickedPlanet);
			showPlanetInfo(clickedPlanet);
		} else {
			// Clicked on empty space
			hidePlanetInfo();
		}
	});
}

/**
 * Setup mouse move handler for cursor changes
 * @param {Array} planets - Array of planet objects
 */
export function setupMouseMove(planets) {
	window.addEventListener("mousemove", (event) => {
		if (isAnimating) return;

		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);

		const clickableMeshes = planets.map((p) => p.mesh);
		const intersects = raycaster.intersectObjects(clickableMeshes);

		// Change cursor to pointer when hovering over planet
		document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
	});
}
