/**
 * CONSTELLATION LINES
 * Draws lines connecting stars in constellations
 */

import * as THREE from "three";
import { scene } from "../setup/scene.js";
import { CONSTELLATIONS } from "../config/constellations.js";

const constellationLines = [];
let constellationsVisible = true;

/**
 * Create constellation lines
 */
export function createConstellations() {
	Object.keys(CONSTELLATIONS).forEach((name) => {
		const points = CONSTELLATIONS[name];

		// Create line geometry
		const geometry = new THREE.BufferGeometry().setFromPoints(points);

		// Create material (subtle blue-white)
		const material = new THREE.LineBasicMaterial({
			color: 0x4488ff,
			transparent: true,
			opacity: 0.3,
		});

		// Create line
		const line = new THREE.Line(geometry, material);
		line.name = name; // Store constellation name
		scene.add(line);

		constellationLines.push(line);
	});

	console.log(`Created ${constellationLines.length} constellations`);
}

/**
 * Toggle constellation visibility
 */
export function toggleConstellations() {
	constellationsVisible = !constellationsVisible;
	constellationLines.forEach((line) => {
		line.visible = constellationsVisible;
	});
	console.log(`Constellations: ${constellationsVisible ? "ON" : "OFF"}`);
}
