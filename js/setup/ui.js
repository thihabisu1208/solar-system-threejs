/**
 * UI SETUP
 * Minimap canvas and time display initialization
 */

import * as THREE from "three";

// Initialize minimap canvas
export const minimapCanvas = document.getElementById("minimap-canvas");
export const minimapCtx = minimapCanvas.getContext("2d");
minimapCanvas.width = 180;
minimapCanvas.height = 180;

/**
 * Draw minimap showing top-down view of solar system
 * @param {Array} planets - Array of planet objects
 * @param {Object} camera - Three.js camera
 */
export function drawMinimap(planets, camera) {
	const centerX = minimapCanvas.width / 2;
	const centerY = minimapCanvas.height / 2;
	const scale = 0.4;

	// Clear canvas
	minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);

	// Draw sun (yellow dot at center)
	minimapCtx.fillStyle = "#ffff00";
	minimapCtx.beginPath();
	minimapCtx.arc(centerX, centerY, 3, 0, Math.PI * 2);
	minimapCtx.fill();

	// Draw planets (blue dots)
	planets.forEach((planet) => {
		const worldPos = new THREE.Vector3();
		planet.mesh.getWorldPosition(worldPos);

		const x = centerX + worldPos.x * scale;
		const y = centerY + worldPos.z * scale;

		minimapCtx.fillStyle = "#4fc3f7";
		minimapCtx.beginPath();
		minimapCtx.arc(x, y, 2, 0, Math.PI * 2);
		minimapCtx.fill();
	});

	// Draw camera direction (red line from center)
	const camDir = camera.position.clone().normalize();
	const camX = centerX + camDir.x * 30;
	const camY = centerY + camDir.z * 30;

	minimapCtx.strokeStyle = "#ff0000";
	minimapCtx.lineWidth = 2;
	minimapCtx.beginPath();
	minimapCtx.moveTo(centerX, centerY);
	minimapCtx.lineTo(camX, camY);
	minimapCtx.stroke();
}
