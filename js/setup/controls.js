/**
 * CONTROLS SETUP
 * OrbitControls and all user input handlers (keyboard, mouse, buttons)
 */

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { camera, renderer } from "./scene.js";
import {
	CONTROLS_DAMPING_FACTOR,
	SPEED_CHANGE_FACTOR,
	MIN_SPEED,
	MAX_SPEED,
} from "../config/constants.js";
import {
	toggleOrbitLines,
	togglePlanetScale,
	toggleHelpPanel,
} from "../utils/toggles.js";
import { updateSpeedDisplay, updatePauseButton } from "../utils/updates.js";
import {
	resetCamera,
	toggleFollowPlanet,
	getFollowingPlanet,
} from "../interactions/camera.js";
import { toggleConstellations } from "../objects/constellations.js";
import { toggleTrails } from "../objects/trails.js";

// Create orbit controls
export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = CONTROLS_DAMPING_FACTOR;

// State variables
export let speedMultiplier = 1;
export let isPaused = false;

/**
 * Set speed multiplier
 * @param {number} value - New speed value
 */
export function setSpeedMultiplier(value) {
	speedMultiplier = value;
}

/**
 * Set pause state
 * @param {boolean} value - New pause state
 */
export function setPaused(value) {
	isPaused = value;
}

/**
 * Get current speed multiplier
 * @returns {number} Current speed
 */
export function getSpeedMultiplier() {
	return speedMultiplier;
}

/**
 * Get current pause state
 * @returns {boolean} Is paused
 */
export function getIsPaused() {
	return isPaused;
}

// Keyboard controls
window.addEventListener("keydown", (event) => {
	if (event.key === "+" || event.key === "=") {
		speedMultiplier = Math.min(
			speedMultiplier * SPEED_CHANGE_FACTOR,
			MAX_SPEED
		);
		updateSpeedDisplay();
	} else if (event.key === "-" || event.key === "_") {
		speedMultiplier = Math.max(
			speedMultiplier / SPEED_CHANGE_FACTOR,
			MIN_SPEED
		);
		updateSpeedDisplay();
	} else if (event.key === " ") {
		event.preventDefault();
		isPaused = !isPaused;
		updateSpeedDisplay();
		updatePauseButton();
	} else if (event.key === "o" || event.key === "O") {
		toggleOrbitLines();
	} else if (event.key === "r" || event.key === "R") {
		resetCamera();
	} else if (event.key === "s" || event.key === "S") {
		togglePlanetScale();
	} else if (event.key === "f" || event.key === "F") {
		const currentlyFollowing = getFollowingPlanet();
		if (currentlyFollowing) {
			// Stop following
			toggleFollowPlanet(null);
		} else {
			// Start following last clicked planet if exists
			if (window.lastClickedPlanet) {
				toggleFollowPlanet(window.lastClickedPlanet);
			} else {
				console.log("Click a planet first, then press F to follow it");
			}
		}
	} else if (event.key === "t" || event.key === "T") {
		toggleTrails();
	} else if (event.key === "c" || event.key === "C") {
		toggleConstellations();
	} else if (event.key === "h" || event.key === "H") {
		toggleHelpPanel(); // Keep this
	} else if (event.key === "Escape") {
		const panel = document.getElementById("help-panel");
		if (!panel.classList.contains("hidden")) {
			toggleHelpPanel(); // Keep this
		}
	}
});

// Button controls
document.getElementById("btn-slower").addEventListener("click", () => {
	speedMultiplier = Math.max(speedMultiplier / SPEED_CHANGE_FACTOR, MIN_SPEED);
	updateSpeedDisplay();
});

document.getElementById("btn-faster").addEventListener("click", () => {
	speedMultiplier = Math.min(speedMultiplier * SPEED_CHANGE_FACTOR, MAX_SPEED);
	updateSpeedDisplay();
});

document.getElementById("btn-pause").addEventListener("click", () => {
	isPaused = !isPaused;
	updateSpeedDisplay();
	updatePauseButton();
});

document.getElementById("btn-reset").addEventListener("click", () => {
	resetCamera();
});

// ============================================
// MOBILE TOUCH ENHANCEMENTS
// ============================================

/**
 * Detect if device is mobile
 * @returns {boolean} Is mobile device
 */
function isMobile() {
	return (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		) || window.innerWidth <= 768
	);
}

// Adjust controls for mobile
if (isMobile()) {
	// Increase damping for smoother mobile experience
	controls.dampingFactor = 0.08;

	// Enable rotation with one finger
	controls.enableRotate = true;

	// Disable pan (two-finger drag moves camera, which can be confusing)
	controls.enablePan = false;

	// Adjust zoom speed for touch
	controls.zoomSpeed = 0.5;

	console.log("Mobile controls enabled");
}

// Prevent context menu on long press (mobile)
window.addEventListener("contextmenu", (e) => {
	if (isMobile()) {
		e.preventDefault();
	}
});

// Prevent pull-to-refresh on mobile
let lastTouchY = 0;
let preventPullToRefresh = false;

document.body.addEventListener(
	"touchstart",
	(e) => {
		if (e.touches.length !== 1) return;
		lastTouchY = e.touches[0].clientY;
		preventPullToRefresh = window.pageYOffset === 0;
	},
	{ passive: false }
);

document.body.addEventListener(
	"touchmove",
	(e) => {
		const touchY = e.touches[0].clientY;
		const touchYDelta = touchY - lastTouchY;
		lastTouchY = touchY;

		if (preventPullToRefresh) {
			// Prevent pull-to-refresh when at top and pulling down
			if (touchYDelta > 0) {
				e.preventDefault();
			}
		}
	},
	{ passive: false }
);
