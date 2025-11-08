/**
 * CELESTIAL OBJECTS
 * Sun, planets, moons creation with labels and rings
 */

import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";
import { scene, textureLoader } from "../setup/scene.js";
import {
	SUN_TEXTURE,
	SUN_RADIUS,
	SUN_SEGMENTS,
	PLANET_DATA,
	PLANET_SEGMENTS,
	MOON_TEXTURE,
	MOON_SEGMENTS,
	RING_SEGMENTS,
	LABEL_FONT_SIZE,
	LABEL_COLOR,
	LABEL_OFFSET_Y,
	REALISTIC_SCALE_MULTIPLIER,
	ATMOSPHERE_DATA,
} from "../config/constants.js";

// Track if using realistic scale
let useRealisticScale = false;

/**
 * Get realistic scale state
 * @returns {boolean} Is using realistic scale
 */
export function getUseRealisticScale() {
	return useRealisticScale;
}

/**
 * Set realistic scale state
 * @param {boolean} value - New scale state
 */
export function setUseRealisticScale(value) {
	useRealisticScale = value;
}

/**
 * Create the sun with glow and lens flare
 * @returns {Object} Sun mesh
 */
export function createSun() {
	const sunGeometry = new THREE.SphereGeometry(
		SUN_RADIUS,
		SUN_SEGMENTS,
		SUN_SEGMENTS
	);
	const sunMaterial = new THREE.MeshBasicMaterial({
		map: textureLoader.load(`textures/${SUN_TEXTURE}`),
	});
	const sun = new THREE.Mesh(sunGeometry, sunMaterial);

	// Add glow layer
	const glowGeometry = new THREE.SphereGeometry(
		SUN_RADIUS * 1.1,
		SUN_SEGMENTS,
		SUN_SEGMENTS
	);
	const glowMaterial = new THREE.MeshBasicMaterial({
		color: 0xffaa00,
		transparent: true,
		opacity: 0.3,
		side: THREE.BackSide,
	});
	const glow = new THREE.Mesh(glowGeometry, glowMaterial);
	sun.add(glow);

	// Add lens flare
	const textureFlare0 = textureLoader.load("textures/lensflare0.png");
	const textureFlare3 = textureLoader.load("textures/lensflare3.png");

	const lensflare = new Lensflare();
	lensflare.addElement(
		new LensflareElement(textureFlare0, 700, 0, new THREE.Color(0xffffff))
	);
	lensflare.addElement(
		new LensflareElement(textureFlare3, 60, 0.6, new THREE.Color(0xffaa00))
	);
	lensflare.addElement(
		new LensflareElement(textureFlare3, 70, 0.7, new THREE.Color(0xffaa00))
	);
	lensflare.addElement(
		new LensflareElement(textureFlare3, 120, 0.9, new THREE.Color(0xffaa00))
	);
	lensflare.addElement(
		new LensflareElement(textureFlare3, 70, 1.0, new THREE.Color(0xffaa00))
	);

	sun.add(lensflare);

	scene.add(sun);
	return sun;
}

/**
 * Create label for celestial body
 * @param {string} name - Name to display
 * @param {number} radius - Body radius (for positioning)
 * @returns {Object} CSS2DObject label
 */
function createLabel(name, radius) {
	const labelDiv = document.createElement("div");
	labelDiv.className = "planet-label";
	labelDiv.textContent = name;
	labelDiv.style.color = LABEL_COLOR;
	labelDiv.style.fontSize = `${LABEL_FONT_SIZE}px`;
	const label = new CSS2DObject(labelDiv);
	label.position.set(0, radius + LABEL_OFFSET_Y, 0);
	return label;
}

/**
 * Create Saturn's rings
 * @param {Object} ringsData - Ring configuration from planet data
 * @returns {Object} Ring mesh
 */
function createRings(ringsData) {
	const ringGeometry = new THREE.RingGeometry(
		ringsData.innerRadius,
		ringsData.outerRadius,
		RING_SEGMENTS
	);
	const ringMaterial = new THREE.MeshBasicMaterial({
		color: 0xccccaa,
		side: THREE.DoubleSide,
		transparent: true,
		opacity: 0.8,
	});
	const rings = new THREE.Mesh(ringGeometry, ringMaterial);
	rings.rotation.x = Math.PI / 2; // Lay flat
	return rings;
}

/**
 * Create a single moon
 * @param {Object} moonData - Moon configuration
 * @param {Object} planetMesh - Parent planet mesh
 * @returns {Object} Moon data with orbitGroup and mesh
 */
function createMoon(moonData, planetMesh) {
	const moonOrbitGroup = new THREE.Group();
	planetMesh.add(moonOrbitGroup);

	const moonGeometry = new THREE.SphereGeometry(
		moonData.radius,
		MOON_SEGMENTS,
		MOON_SEGMENTS
	);

	// Use texture for Earth's moon, color for Jupiter's moons
	const moonMaterial = new THREE.MeshStandardMaterial(
		moonData.color
			? { color: moonData.color }
			: { map: textureLoader.load(`textures/${MOON_TEXTURE}`) }
	);

	const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
	moonMesh.position.x = moonData.distance || moonData.distanceFromPlanet;
	moonOrbitGroup.add(moonMesh);

	return {
		name: moonData.name,
		orbitGroup: moonOrbitGroup,
		mesh: moonMesh,
		orbitSpeed: moonData.orbitSpeed,
	};
}

/**
 * Create atmosphere glow for planet
 * @param {string} planetName - Name of planet
 * @param {number} radius - Planet radius
 * @returns {Object|null} Atmosphere mesh or null
 */
function createAtmosphere(planetName, radius) {
	const atmosphereData = ATMOSPHERE_DATA[planetName];
	if (!atmosphereData) return null;

	const atmosphereGeometry = new THREE.SphereGeometry(
		radius * atmosphereData.scale,
		PLANET_SEGMENTS,
		PLANET_SEGMENTS
	);

	// Custom shader for atmosphere glow
	const atmosphereMaterial = new THREE.ShaderMaterial({
		transparent: true,
		side: THREE.BackSide,
		uniforms: {
			atmosphereColor: {
				value: new THREE.Color(
					atmosphereData.color[0],
					atmosphereData.color[1],
					atmosphereData.color[2]
				),
			},
		},
		vertexShader: `
			varying vec3 vNormal;
			void main() {
				vNormal = normalize(normalMatrix * normal);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			uniform vec3 atmosphereColor;
			varying vec3 vNormal;
			void main() {
				float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
				gl_FragColor = vec4(atmosphereColor, 1.0) * intensity;
			}
		`,
	});

	const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
	return atmosphere;
}

/**
 * Create all planets with moons, rings, and labels
 * @returns {Array} Array of planet objects
 */
export function createPlanets() {
	const planets = [];

	PLANET_DATA.forEach((planetData) => {
		// Create orbit group (rotates to make planet orbit)
		const orbitGroup = new THREE.Group();
		scene.add(orbitGroup);

		// Calculate planet radius (realistic or stylized)
		const originalRadius = planetData.radius;
		const currentRadius = useRealisticScale
			? planetData.radius * REALISTIC_SCALE_MULTIPLIER
			: planetData.radius;

		// Create planet geometry and material
		const geometry = new THREE.SphereGeometry(
			currentRadius,
			PLANET_SEGMENTS,
			PLANET_SEGMENTS
		);
		const material = new THREE.MeshStandardMaterial({
			map: textureLoader.load(`textures/${planetData.texture}`),
		});
		const planetMesh = new THREE.Mesh(geometry, material);

		// Position planet at distance from sun
		planetMesh.position.x = planetData.distanceFromSun;
		orbitGroup.add(planetMesh);

		// Add atmosphere if planet has one
		const atmosphere = createAtmosphere(planetData.name, currentRadius);
		if (atmosphere) {
			planetMesh.add(atmosphere);
		}

		// Add label
		const label = createLabel(planetData.name, planetData.radius);
		planetMesh.add(label);

		// Add rings if planet has them (Saturn)
		if (planetData.hasRings) {
			const rings = createRings(planetData.rings);
			planetMesh.add(rings);
		}

		// Create moons
		let moonMeshes = [];

		// Single moon (Earth)
		if (planetData.hasMoon && planetData.moon) {
			moonMeshes.push(createMoon(planetData.moon, planetMesh));
		}

		// Multiple moons (Jupiter)
		if (planetData.moons) {
			planetData.moons.forEach((moonData) => {
				moonMeshes.push(createMoon(moonData, planetMesh));
			});
		}

		// Store planet data
		planets.push({
			name: planetData.name,
			orbitGroup: orbitGroup,
			mesh: planetMesh,
			orbitSpeed: planetData.orbitSpeed,
			rotationSpeed: planetData.rotationSpeed,
			data: planetData,
			moons: moonMeshes,
			originalRadius: originalRadius,
		});
	});

	return planets;
}
