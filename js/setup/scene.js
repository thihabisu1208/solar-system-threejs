/**
 * SCENE SETUP
 * Creates Three.js scene, camera, renderers, and lighting
 */

import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import {
	CAMERA_FOV,
	CAMERA_NEAR,
	CAMERA_FAR,
	CAMERA_INITIAL_POSITION,
	COLOR_AMBIENT_LIGHT,
	COLOR_SUN_LIGHT,
	AMBIENT_LIGHT_INTENSITY,
	SUN_LIGHT_INTENSITY,
} from "../config/constants.js";

// Create the 3D scene
export const scene = new THREE.Scene();

// Create perspective camera
export const camera = new THREE.PerspectiveCamera(
	CAMERA_FOV,
	window.innerWidth / window.innerHeight,
	CAMERA_NEAR,
	CAMERA_FAR
);
camera.position.set(
	CAMERA_INITIAL_POSITION.x,
	CAMERA_INITIAL_POSITION.y,
	CAMERA_INITIAL_POSITION.z
);

// Create WebGL renderer
export const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById("canvas"),
	antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create CSS2D renderer for labels
export const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
labelRenderer.domElement.style.pointerEvents = "none";
document.body.appendChild(labelRenderer.domElement);

// Create ambient light (soft overall illumination)
const ambientLight = new THREE.AmbientLight(
	COLOR_AMBIENT_LIGHT,
	AMBIENT_LIGHT_INTENSITY
);
scene.add(ambientLight);

// Create point light at sun's position
const sunLight = new THREE.PointLight(
	COLOR_SUN_LIGHT,
	SUN_LIGHT_INTENSITY,
	0,
	0
);
scene.add(sunLight);

// Create texture loader (shared across all objects)
export const textureLoader = new THREE.TextureLoader();

/**
 * Handle window resize
 * Updates camera aspect ratio and renderer sizes
 */
export function handleResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", handleResize);
