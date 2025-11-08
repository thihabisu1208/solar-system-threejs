/**
 * PLANET TRAILS
 * Shows recent path traveled by planets
 */

import * as THREE from "three";
import { scene } from "../setup/scene.js";
import { TRAIL_LENGTH, TRAIL_OPACITY } from "../config/constants.js";

// Store trail data for each planet
const planetTrails = new Map();

// Planet colors for trails
const PLANET_COLORS = {
	Mercury: 0x8c7853,
	Venus: 0xffc649,
	Earth: 0x4a90e2,
	Mars: 0xe27b58,
	Jupiter: 0xc88b3a,
	Saturn: 0xfad5a5,
	Uranus: 0x4fd0e7,
	Neptune: 0x4166f5,
	Pluto: 0xcccccc,
};

/**
 * Initialize trails for all planets
 * @param {Array} planets - Array of planet objects
 */
export function initTrails(planets) {
	planets.forEach((planet) => {
		const positions = [];
		const geometry = new THREE.BufferGeometry();

		const material = new THREE.LineBasicMaterial({
			color: PLANET_COLORS[planet.name] || 0xffffff,
			transparent: true,
			opacity: TRAIL_OPACITY,
			linewidth: 2, // Note: linewidth > 1 only works on Windows
		});

		const line = new THREE.Line(geometry, material);
		scene.add(line);

		planetTrails.set(planet.name, {
			positions: positions,
			line: line,
			geometry: geometry,
		});
	});
}

/**
 * Update trail for a planet
 * @param {Object} planet - Planet object
 */
export function updateTrail(planet) {
	const trailData = planetTrails.get(planet.name);
	if (!trailData) return;

	// Get current world position
	const worldPos = new THREE.Vector3();
	planet.mesh.getWorldPosition(worldPos);

	// Add to positions array
	trailData.positions.push(worldPos.clone());

	// Keep only last N positions
	if (trailData.positions.length > TRAIL_LENGTH) {
		trailData.positions.shift();
	}

	// Update geometry
	if (trailData.positions.length > 1) {
		trailData.geometry.setFromPoints(trailData.positions);
		trailData.line.visible = true;
	}
}

/**
 * Toggle trail visibility
 */
let trailsVisible = true;

export function toggleTrails() {
	trailsVisible = !trailsVisible;
	planetTrails.forEach((trailData) => {
		trailData.line.visible = trailsVisible;
	});
	console.log(`Trails: ${trailsVisible ? "ON" : "OFF"}`);
}

export function getTrailsVisible() {
	return trailsVisible;
}
