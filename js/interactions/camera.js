/**
 * CAMERA ANIMATIONS
 * Smooth camera movements to planets and reset
 */

import * as THREE from "three";
import { camera } from "../setup/scene.js";
import { controls } from "../setup/controls.js";
import {
	CAMERA_INITIAL_POSITION,
	CAMERA_FLY_DURATION,
	CAMERA_DISTANCE_MULTIPLIER,
} from "../config/constants.js";
import { getIsAnimating, setIsAnimating } from "./raycaster.js";
import { setPaused } from "../setup/controls.js";
import { updateSpeedDisplay, updatePauseButton } from "../utils/updates.js";
import { hidePlanetInfo } from "./info.js";

/**
 * Easing function for smooth animation
 * @param {number} t - Progress (0 to 1)
 * @returns {number} Eased value
 */
function easeInOutQuad(t) {
	return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Fly camera to planet
 * @param {Object} planet - Planet object to fly to
 */
export function flyToPlanet(planet) {
	// Check if already animating
	const animating = getIsAnimating();
	if (animating) return;

	// Stop follow mode when flying to planet
	if (followingPlanet) {
		followingPlanet = null;
		console.log("Follow mode disabled");
	}

	setIsAnimating(true);
	setPaused(true);
	updateSpeedDisplay();

	// Get planet's world position
	const planetWorldPos = new THREE.Vector3();
	planet.mesh.getWorldPosition(planetWorldPos);

	// Calculate target camera position (offset from planet)
	const distance =
		planet.mesh.geometry.parameters.radius * CAMERA_DISTANCE_MULTIPLIER;
	const targetPos = planetWorldPos
		.clone()
		.add(new THREE.Vector3(distance, distance * 0.5, distance));

	const startPos = camera.position.clone();
	const startTarget = controls.target.clone();

	let progress = 0;
	const startTime = Date.now();

	function animateCamera() {
		const elapsed = Date.now() - startTime;
		progress = Math.min(elapsed / CAMERA_FLY_DURATION, 1);

		const eased = easeInOutQuad(progress);

		camera.position.lerpVectors(startPos, targetPos, eased);
		controls.target.lerpVectors(startTarget, planetWorldPos, eased);

		if (progress < 1) {
			requestAnimationFrame(animateCamera);
		} else {
			setIsAnimating(false);
			updatePauseButton();
		}
	}

	animateCamera();
}

// Track follow mode
let followingPlanet = null;
let followAngle = 0;

/**
 * Toggle follow mode for a planet
 * @param {Object} planet - Planet to follow (null to disable)
 */
export function toggleFollowPlanet(planet) {
	if (followingPlanet === planet) {
		// Already following this planet, disable follow mode
		followingPlanet = null;
		controls.enableDamping = true; // Re-enable damping
		console.log("Follow mode disabled");
	} else {
		// Start following new planet
		followingPlanet = planet;
		followAngle = 0; // Reset angle
		if (planet) {
			console.log(`Following ${planet.name} - Press F to stop`);
		}
	}
}

/**
 * Update camera if in follow mode
 * Call this every frame in animate loop
 */
export function updateFollowMode() {
	if (!followingPlanet) return;

	// Get planet's current world position
	const planetWorldPos = new THREE.Vector3();
	followingPlanet.mesh.getWorldPosition(planetWorldPos);

	// Orbit around planet
	followAngle += 0.005;
	const distance = followingPlanet.mesh.geometry.parameters.radius * 4;

	const offsetX = Math.cos(followAngle) * distance;
	const offsetZ = Math.sin(followAngle) * distance;
	const offsetY = distance * 0.3;

	// Update camera position
	camera.position.set(
		planetWorldPos.x + offsetX,
		planetWorldPos.y + offsetY,
		planetWorldPos.z + offsetZ
	);

	// Update controls target
	controls.target.copy(planetWorldPos);

	// Disable controls damping during follow mode to prevent drift
	controls.enableDamping = false;
}

/**
 * Get current followed planet
 * @returns {Object|null} Currently followed planet
 */
export function getFollowingPlanet() {
	return followingPlanet;
}

/**
 * Reset camera to initial position
 */
export function resetCamera() {
	const startPos = camera.position.clone();
	const startTarget = controls.target.clone();
	const targetPos = new THREE.Vector3(
		CAMERA_INITIAL_POSITION.x,
		CAMERA_INITIAL_POSITION.y,
		CAMERA_INITIAL_POSITION.z
	);
	const targetLookAt = new THREE.Vector3(0, 0, 0);

	let progress = 0;
	const duration = 1500;
	const startTime = Date.now();

	function animateReset() {
		const elapsed = Date.now() - startTime;
		progress = Math.min(elapsed / duration, 1);

		const eased = easeInOutQuad(progress);

		camera.position.lerpVectors(startPos, targetPos, eased);
		controls.target.lerpVectors(startTarget, targetLookAt, eased);

		if (progress < 1) {
			requestAnimationFrame(animateReset);
		}
	}

	animateReset();
	hidePlanetInfo();
}
