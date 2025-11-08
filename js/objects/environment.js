/**
 * ENVIRONMENT OBJECTS
 * Starfield and orbit lines
 */

import * as THREE from "three";
import { scene, textureLoader } from "../setup/scene.js";
import {
	STARFIELD_RADIUS,
	STARFIELD_SEGMENTS,
	ORBIT_LINE_COLOR,
	ORBIT_LINE_OPACITY,
	ORBIT_LINE_SEGMENTS,
	PLANET_DATA,
} from "../config/constants.js";

/**
 * Create starfield background
 * Giant sphere with stars texture on inside
 */
export function createStarfield() {
	const starTexture = textureLoader.load("textures/8k_stars_milky_way.jpg");
	const starGeometry = new THREE.SphereGeometry(
		STARFIELD_RADIUS,
		STARFIELD_SEGMENTS,
		STARFIELD_SEGMENTS
	);
	const starMaterial = new THREE.MeshBasicMaterial({
		map: starTexture,
		side: THREE.BackSide, // Render inside of sphere
	});
	const starfield = new THREE.Mesh(starGeometry, starMaterial);
	scene.add(starfield);

	return starfield;
}

/**
 * Create orbit lines for all planets
 * @returns {Array} Array of orbit line meshes
 */
export function createOrbitLines() {
	const orbitLines = [];

	PLANET_DATA.forEach((planetData) => {
		const orbitLineGeometry = new THREE.RingGeometry(
			planetData.distanceFromSun - 0.2,
			planetData.distanceFromSun + 0.2,
			ORBIT_LINE_SEGMENTS
		);
		const orbitLineMaterial = new THREE.MeshBasicMaterial({
			color: ORBIT_LINE_COLOR,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: ORBIT_LINE_OPACITY,
		});
		const orbitLine = new THREE.Mesh(orbitLineGeometry, orbitLineMaterial);
		orbitLine.rotation.x = Math.PI / 2; // Lay flat
		scene.add(orbitLine);
		orbitLines.push(orbitLine);
	});

	return orbitLines;
}
