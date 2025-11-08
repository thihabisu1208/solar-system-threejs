/**
 * CONSTELLATION DATA
 * Star positions for major constellations
 * Positions are in 3D space on the starfield sphere
 */

import * as THREE from "three";

const STARFIELD_RADIUS = 4800; // Slightly inside starfield

/**
 * Convert spherical coordinates (RA, Dec) to 3D cartesian
 * @param {number} ra - Right Ascension in hours (0-24)
 * @param {number} dec - Declination in degrees (-90 to 90)
 * @returns {THREE.Vector3} 3D position
 */
function sphericalToCartesian(ra, dec) {
	const raRad = (ra / 24) * Math.PI * 2; // Convert hours to radians
	const decRad = (dec * Math.PI) / 180; // Convert degrees to radians

	const x = STARFIELD_RADIUS * Math.cos(decRad) * Math.cos(raRad);
	const y = STARFIELD_RADIUS * Math.sin(decRad);
	const z = STARFIELD_RADIUS * Math.cos(decRad) * Math.sin(raRad);

	return new THREE.Vector3(x, y, z);
}

// Define major constellations with actual star coordinates
export const CONSTELLATIONS = {
	"Ursa Major (Big Dipper)": [
		sphericalToCartesian(11.06, 61.75), // Dubhe
		sphericalToCartesian(11.03, 56.38), // Merak
		sphericalToCartesian(11.9, 53.7), // Phecda
		sphericalToCartesian(12.25, 57.03), // Megrez
		sphericalToCartesian(12.9, 55.96), // Alioth
		sphericalToCartesian(13.4, 54.93), // Mizar
		sphericalToCartesian(13.79, 49.31), // Alkaid
	],
	Orion: [
		sphericalToCartesian(5.92, 7.41), // Betelgeuse
		sphericalToCartesian(5.24, -8.2), // Rigel
		sphericalToCartesian(5.6, -1.2), // Alnitak
		sphericalToCartesian(5.6, -1.94), // Alnilam
		sphericalToCartesian(5.59, -2.6), // Mintaka
		sphericalToCartesian(5.42, -5.91), // Saiph
	],
	Cassiopeia: [
		sphericalToCartesian(0.15, 59.15), // Caph
		sphericalToCartesian(0.41, 56.54), // Schedar
		sphericalToCartesian(0.95, 60.72), // Gamma Cas
		sphericalToCartesian(1.43, 60.24), // Ruchbah
		sphericalToCartesian(1.91, 63.67), // Segin
	],
	"Crux (Southern Cross)": [
		sphericalToCartesian(12.44, -63.1), // Acrux
		sphericalToCartesian(12.53, -57.11), // Mimosa
		sphericalToCartesian(12.08, -59.69), // Gacrux
		sphericalToCartesian(12.25, -60.4), // Delta Crucis
	],
};
