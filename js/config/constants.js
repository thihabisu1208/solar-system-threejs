/**
 * CONFIGURATION FILE
 * Constants organized by the files that use them
 */

// ============================================
// setup/scene.js
// ============================================
export const CAMERA_FOV = 75;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 10000;
export const CAMERA_INITIAL_POSITION = { x: 0, y: 150, z: 300 };

export const COLOR_WHITE = 0xffffff;
export const COLOR_AMBIENT_LIGHT = COLOR_WHITE;
export const COLOR_SUN_LIGHT = COLOR_WHITE;
export const AMBIENT_LIGHT_INTENSITY = 0.1;
export const SUN_LIGHT_INTENSITY = 3;

// ============================================
// setup/controls.js
// ============================================
export const CONTROLS_DAMPING_FACTOR = 0.05;
export const SPEED_CHANGE_FACTOR = 1.5;
export const MIN_SPEED = 0.1;
export const MAX_SPEED = 10;

// ============================================
// objects/environment.js
// ============================================
export const STARFIELD_RADIUS = 5000;
export const STARFIELD_SEGMENTS = 64;
export const STARFIELD_ROTATION_SPEED = 0.00003;

export const ORBIT_LINE_COLOR = 0x444444;
export const ORBIT_LINE_OPACITY = 1;
export const ORBIT_LINE_SEGMENTS = 128;

// ============================================
// objects/celestial.js
// ============================================
export const SUN_TEXTURE = "2k_sun.jpg";
export const SUN_RADIUS = 15;
export const SUN_SEGMENTS = 32;
export const SUN_ROTATION_SPEED = 0.001;

export const PLANET_SEGMENTS = 32;
export const ORBIT_SPEED_MULTIPLIER = 0.003;
export const PLANET_ROTATION_MULTIPLIER = 0.005;
export const REALISTIC_SCALE_MULTIPLIER = 0.3;

export const MOON_TEXTURE = "2k_moon.jpg";
export const MOON_SEGMENTS = 16;
export const MOON_ORBIT_MULTIPLIER = 0.005;
export const MOON_ROTATION_MULTIPLIER = 0.003;

export const RING_SEGMENTS = 64;

export const LABEL_FONT_SIZE = 14;
export const LABEL_COLOR = "#4fc3f7";
export const LABEL_OFFSET_Y = 5;

export const PLANET_DATA = [
	{
		name: "Mercury",
		radius: 3.8,
		distanceFromSun: 40,
		orbitSpeed: 4.7,
		rotationSpeed: 0.5,
		texture: "2k_mercury.jpg",
		hasMoon: false,
		realDistance: "57.9 million km",
		mass: "3.3 × 10²³ kg",
		funFact: "One day on Mercury is 59 Earth days long!",
	},
	{
		name: "Venus",
		radius: 9.5,
		distanceFromSun: 60,
		orbitSpeed: 3.5,
		rotationSpeed: 0.5,
		texture: "2k_venus_surface.jpg",
		hasMoon: false,
		realDistance: "108.2 million km",
		mass: "4.87 × 10²⁴ kg",
		funFact: "Venus rotates backwards compared to other planets!",
	},
	{
		name: "Earth",
		radius: 10,
		distanceFromSun: 85,
		orbitSpeed: 3.0,
		rotationSpeed: 0.5,
		texture: "2k_earth_daymap.jpg",
		hasMoon: true,
		moon: {
			radius: 2.7,
			distanceFromPlanet: 15,
			orbitSpeed: 1.0,
		},
		realDistance: "149.6 million km",
		mass: "5.97 × 10²⁴ kg",
		funFact: "The only known planet with life!",
	},
	{
		name: "Mars",
		radius: 5.3,
		distanceFromSun: 110,
		orbitSpeed: 2.4,
		rotationSpeed: 0.5,
		texture: "2k_mars.jpg",
		hasMoon: false,
		realDistance: "227.9 million km",
		mass: "6.42 × 10²³ kg",
		funFact: "Home to the largest volcano in the solar system - Olympus Mons!",
	},
	{
		name: "Jupiter",
		radius: 20,
		distanceFromSun: 160,
		orbitSpeed: 1.3,
		rotationSpeed: 0.5,
		texture: "2k_jupiter.jpg",
		hasMoon: true,
		moons: [
			{
				name: "Io",
				radius: 1.8,
				distance: 25,
				orbitSpeed: 2.0,
				color: 0xffff00,
			},
			{
				name: "Europa",
				radius: 1.6,
				distance: 30,
				orbitSpeed: 1.5,
				color: 0xcccccc,
			},
			{
				name: "Ganymede",
				radius: 2.6,
				distance: 35,
				orbitSpeed: 1.2,
				color: 0x8b7355,
			},
			{
				name: "Callisto",
				radius: 2.4,
				distance: 40,
				orbitSpeed: 1.0,
				color: 0x696969,
			},
		],
		realDistance: "778.5 million km",
		mass: "1.90 × 10²⁷ kg",
		funFact: "Jupiter is so big, 1,300 Earths could fit inside it!",
	},
	{
		name: "Saturn",
		radius: 18,
		distanceFromSun: 210,
		orbitSpeed: 0.9,
		rotationSpeed: 0.5,
		texture: "2k_saturn.jpg",
		hasMoon: false,
		hasRings: true,
		rings: {
			innerRadius: 24,
			outerRadius: 40,
			texture: "2k_saturn_ring_alpha.png",
		},
		realDistance: "1.43 billion km",
		mass: "5.68 × 10²⁶ kg",
		funFact: "Saturn would float in water because it's less dense!",
	},
	{
		name: "Uranus",
		radius: 14,
		distanceFromSun: 260,
		orbitSpeed: 0.7,
		rotationSpeed: 0.5,
		texture: "2k_uranus.jpg",
		hasMoon: false,
		realDistance: "2.87 billion km",
		mass: "8.68 × 10²⁵ kg",
		funFact: "Uranus rotates on its side at a 98° angle!",
	},
	{
		name: "Neptune",
		radius: 13,
		distanceFromSun: 310,
		orbitSpeed: 0.5,
		rotationSpeed: 0.5,
		texture: "2k_neptune.jpg",
		hasMoon: false,
		realDistance: "4.50 billion km",
		mass: "1.02 × 10²⁶ kg",
		funFact:
			"Neptune has the fastest winds in the solar system - up to 2,100 km/h!",
	},
	{
		name: "Pluto",
		radius: 2.3,
		distanceFromSun: 360,
		orbitSpeed: 0.4,
		rotationSpeed: 0.5,
		texture: "2k_mercury.jpg",
		hasMoon: false,
		realDistance: "5.91 billion km",
		mass: "1.31 × 10²² kg",
		funFact: "Pluto was reclassified as a dwarf planet in 2006.",
	},
];

export const TRAIL_LENGTH = 100;
export const TRAIL_OPACITY = 0.6;

export const ATMOSPHERE_DATA = {
	Earth: { color: [0.3, 0.6, 1.0], scale: 1.05 },
	Mars: { color: [0.9, 0.4, 0.2], scale: 1.03 },
	Venus: { color: [0.9, 0.8, 0.5], scale: 1.06 },
	Jupiter: { color: [0.8, 0.7, 0.6], scale: 1.03 },
	Saturn: { color: [0.9, 0.8, 0.6], scale: 1.03 },
	Uranus: { color: [0.5, 0.8, 0.9], scale: 1.04 },
	Neptune: { color: [0.3, 0.5, 0.9], scale: 1.04 },
};

// ============================================
// objects/asteroids.js
// ============================================
export const ASTEROID_COUNT = 500;
export const ASTEROID_BELT_INNER_RADIUS = 125;
export const ASTEROID_BELT_OUTER_RADIUS = 145;
export const ASTEROID_SIZE_MIN = 0.3;
export const ASTEROID_SIZE_MAX = 1.2;
export const ASTEROID_COLOR = 0x8b7355;

// ============================================
// interactions/camera.js
// ============================================
export const CAMERA_FLY_DURATION = 2000;
export const CAMERA_DISTANCE_MULTIPLIER = 3;

// ============================================
// utils/updates.js
// ============================================
export const DAYS_PER_FRAME = 0.1;
