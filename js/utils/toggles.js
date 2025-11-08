/**
 * TOGGLE FUNCTIONS
 * Functions to toggle visual features on/off
 */

import { REALISTIC_SCALE_MULTIPLIER } from "../config/constants.js";
import {
	getUseRealisticScale,
	setUseRealisticScale,
} from "../objects/celestial.js";

// Store references (set from main.js)
let orbitLines = [];
let planets = [];

/**
 * Initialize toggle system with references
 * @param {Array} orbitLinesRef - Array of orbit line meshes
 * @param {Array} planetsRef - Array of planet objects
 */
export function initToggles(orbitLinesRef, planetsRef) {
	orbitLines = orbitLinesRef;
	planets = planetsRef;
}

/**
 * Toggle orbit lines visibility
 */
export function toggleOrbitLines() {
	const visible = orbitLines[0].visible;
	orbitLines.forEach((line) => {
		line.visible = !visible;
	});
	console.log(`Orbit lines: ${!visible ? "ON" : "OFF"}`);
}

/**
 * Toggle between realistic and stylized planet scales
 */
export function togglePlanetScale() {
	const useRealisticScale = !getUseRealisticScale();
	setUseRealisticScale(useRealisticScale);

	planets.forEach((planet) => {
		const newRadius = useRealisticScale
			? planet.originalRadius * REALISTIC_SCALE_MULTIPLIER
			: planet.originalRadius;

		planet.mesh.scale.set(
			newRadius / planet.originalRadius,
			newRadius / planet.originalRadius,
			newRadius / planet.originalRadius
		);
	});

	console.log(`Scale: ${useRealisticScale ? "REALISTIC" : "STYLIZED"}`);
}

/**
 * Toggle help panel visibility
 */
export function toggleHelpPanel() {
	const panel = document.getElementById("help-panel");
	panel.classList.toggle("hidden");
}

/**
 * Initialize help panel button listeners
 */
export function initHelpPanel() {
	document.getElementById("btn-help").addEventListener("click", () => {
		toggleHelpPanel();
	});

	document.getElementById("help-panel").addEventListener("click", () => {
		toggleHelpPanel();
	});
}
