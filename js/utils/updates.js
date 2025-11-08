/**
 * UPDATE FUNCTIONS
 * Functions that update UI displays
 */

import { getSpeedMultiplier, getIsPaused } from "../setup/controls.js";
import { DAYS_PER_FRAME } from "../config/constants.js";

// Simulation time tracking
let simulationDay = 0;

/**
 * Get current simulation day
 * @returns {number} Current day
 */
export function getSimulationDay() {
	return simulationDay;
}

/**
 * Increment simulation time
 * @param {number} multiplier - Speed multiplier
 */
export function incrementSimulationDay(multiplier) {
	simulationDay += DAYS_PER_FRAME * multiplier;
}

/**
 * Update speed display UI
 */
export function updateSpeedDisplay() {
	const display = document.getElementById("speed-display");
	if (getIsPaused()) {
		display.textContent = "PAUSED";
		display.classList.add("paused");
	} else {
		display.textContent = `Speed: ${getSpeedMultiplier().toFixed(1)}x`;
		display.classList.remove("paused");
	}
}

/**
 * Update pause button UI
 */
export function updatePauseButton() {
	const btn = document.getElementById("btn-pause");
	if (getIsPaused()) {
		btn.textContent = "▶";
		btn.classList.add("paused");
	} else {
		btn.textContent = "⏸";
		btn.classList.remove("paused");
	}
}

/**
 * Update time display UI
 */
export function updateTimeDisplay() {
	const timeValue = document.getElementById("time-value");

	if (simulationDay < 365) {
		timeValue.textContent = `Day ${Math.floor(simulationDay)}`;
	} else {
		const years = Math.floor(simulationDay / 365);
		const days = Math.floor(simulationDay % 365);
		timeValue.textContent = `${years}y ${days}d`;
	}
}
