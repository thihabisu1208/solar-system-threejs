/**
 * ASTEROID BELT
 * Creates ring of asteroids between Mars and Jupiter
 */

import * as THREE from "three";
import { scene } from "../setup/scene.js";
import {
	ASTEROID_COUNT,
	ASTEROID_BELT_INNER_RADIUS,
	ASTEROID_BELT_OUTER_RADIUS,
	ASTEROID_SIZE_MIN,
	ASTEROID_SIZE_MAX,
	ASTEROID_COLOR,
} from "../config/constants.js";

/**
 * Create asteroid belt
 * @returns {Array} Array of asteroid objects with mesh and rotation speed
 */
export function createAsteroidBelt() {
	const asteroidGeometry = new THREE.SphereGeometry(1, 6, 6); // Low poly for performance
	const asteroidMaterial = new THREE.MeshStandardMaterial({
		color: ASTEROID_COLOR,
		roughness: 0.9,
		metalness: 0.1,
	});

	const asteroids = [];

	for (let i = 0; i < ASTEROID_COUNT; i++) {
		const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

		// Random position in ring
		const angle = Math.random() * Math.PI * 2;
		const distance =
			ASTEROID_BELT_INNER_RADIUS +
			Math.random() * (ASTEROID_BELT_OUTER_RADIUS - ASTEROID_BELT_INNER_RADIUS);
		const size =
			ASTEROID_SIZE_MIN +
			Math.random() * (ASTEROID_SIZE_MAX - ASTEROID_SIZE_MIN);

		asteroid.position.x = Math.cos(angle) * distance;
		asteroid.position.z = Math.sin(angle) * distance;
		asteroid.position.y = (Math.random() - 0.5) * 3; // Slight vertical variation

		asteroid.scale.set(size, size, size);

		// Random initial rotation
		asteroid.rotation.x = Math.random() * Math.PI * 2;
		asteroid.rotation.y = Math.random() * Math.PI * 2;
		asteroid.rotation.z = Math.random() * Math.PI * 2;

		scene.add(asteroid);

		asteroids.push({
			mesh: asteroid,
			rotationSpeed: (Math.random() - 0.5) * 0.02, // Random rotation speed
		});
	}

	return asteroids;
}
