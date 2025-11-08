# 🌌 Interactive Solar System Simulation

An interactive 3D solar system visualization built with Three.js, featuring realistic planetary orbits, educational information, and engaging visual effects. Explore our cosmic neighborhood with smooth animations, clickable planets, and mobile-friendly controls.

## ✨ Features

### Core Functionality

- **Interactive 3D Scene**: Fully navigable 3D solar system with drag-to-rotate and pinch-to-zoom controls
- **9 Celestial Bodies**: All 8 planets plus Pluto with realistic textures and proportions
- **Orbital Mechanics**: Accurate orbital speeds and hierarchical rotation systems
- **Moon Systems**: Earth's moon and Jupiter's 4 Galilean moons (Io, Europa, Ganymede, Callisto)
- **Saturn's Rings**: Iconic planetary rings with transparency effects
- **Asteroid Belt**: 500 procedurally-placed asteroids between Mars and Jupiter

### Visual Effects

- **Lens Flare**: Realistic sun flare with burst and ghost reflections
- **Planet Trails**: Colored comet-tail effects showing recent orbital paths
- **Atmosphere Glow**: Shader-based atmospheric halos on Earth, Mars, Venus, and gas giants
- **Constellation Lines**: 4 major constellations (Ursa Major, Orion, Cassiopeia, Crux)
- **Planet Labels**: Floating 3D text labels above each planet
- **Starfield**: 8K high-resolution Milky Way background with slow rotation

### Interactive Features

- **Planet Information Cards**: Click any planet to view real facts (mass, distance, fun trivia)
- **Camera Fly-To**: Smooth animated camera transitions to selected planets
- **Follow Mode**: Press F to orbit around a selected planet automatically
- **Speed Controls**: Adjust simulation speed from 0.1x to 10x
- **Pause/Resume**: Spacebar to pause orbital motion
- **Reset Camera**: Return to initial viewpoint instantly
- **Mini Solar System Map**: Top-down 2D overview showing planet positions
- **Simulation Time**: Track elapsed time in days and years

### Toggleable Views

- **Orbit Lines** (O key): Show/hide planetary orbital paths
- **Planet Scale** (S key): Switch between stylized and realistic planet sizes
- **Trails** (T key): Toggle planet trail visibility
- **Constellations** (C key): Show/hide constellation lines

### User Interface

- **Control Buttons**: Touch-friendly buttons for mobile devices
- **Help Panel** (H key): Comprehensive keyboard shortcuts and controls guide
- **Speed Display**: Real-time speed multiplier indicator
- **Time Display**: Shows simulated days/years elapsed

### Responsive Design

- **Mobile Optimized**: Touch controls, optimized UI layout, and larger buttons
- **Desktop Enhanced**: Full keyboard shortcuts
- **Adaptive Breakpoint**: 768px responsive design threshold
- **Landscape Support**: Special adjustments for phone landscape mode

---

## 🛠️ Tech Stack

### Core Technologies

- **Three.js** (v0.169.0): 3D rendering and WebGL abstraction
- **JavaScript (ES6+)**: Modular application architecture
- **HTML5 Canvas**: WebGL rendering target
- **CSS3**: Responsive styling with media queries

### Three.js Addons

- **OrbitControls**: Camera navigation controls
- **CSS2DRenderer**: 3D-positioned HTML labels
- **Lensflare**: Sun flare effects

### Development Approach

- **Vanilla JavaScript**: No frameworks (React/Vue/Angular)
- **ES6 Modules**: Clean import/export structure
- **Modular Architecture**: Separation of concerns by functionality
- **Mobile-First Responsive**: Progressive enhancement for desktop

---

## 📁 Project Structure

```
solar-system/
├── index.html                      # Main HTML entry point
├── textures/                       # Planet textures and assets
│   ├── 2k_sun.jpg
│   ├── 2k_mercury.jpg
│   ├── 2k_venus_surface.jpg
│   ├── 2k_earth_daymap.jpg
│   ├── 2k_mars.jpg
│   ├── 2k_jupiter.jpg
│   ├── 2k_saturn.jpg
│   ├── 2k_uranus.jpg
│   ├── 2k_neptune.jpg
│   ├── 2k_moon.jpg
│   ├── 8k_stars_milky_way.jpg
│   ├── lensflare0.png
│   └── lensflare3.png
├── css/                            # Stylesheets by functionality
│   ├── base.css                    # Reset, body, canvas, utilities
│   ├── ui-controls.css             # Buttons, speed display, info bar
│   ├── info-panels.css             # Planet info, help panel, time display
│   ├── minimap.css                 # Minimap styles
│   ├── labels.css                  # Floating planet labels
│   └── mobile.css                  # Mobile-specific overrides
└── js/                             # JavaScript modules
    ├── main.js                     # Entry point, initialization, animation loop
    ├── config/
    │   ├── constants.js            # All configuration constants
    │   └── constellations.js       # Constellation coordinate data
    ├── setup/
    │   ├── scene.js                # Scene, camera, renderer, lights
    │   ├── controls.js             # OrbitControls, keyboard/button handlers
    │   └── ui.js                   # Minimap canvas initialization
    ├── objects/
    │   ├── celestial.js            # Sun, planets, moons creation
    │   ├── asteroids.js            # Asteroid belt generation
    │   ├── environment.js          # Starfield, orbit lines
    │   ├── trails.js               # Planet trail system
    │   └── constellations.js       # Constellation line rendering
    ├── interactions/
    │   ├── camera.js               # Camera animations (flyTo, reset, follow)
    │   ├── raycaster.js            # Mouse/touch picking, hover effects
    │   └── info.js                 # Planet info card display
    └── utils/
        ├── toggles.js              # Toggle functions (orbits, scale, help)
        └── updates.js              # UI update functions (speed, time, buttons)
```

---

## 📄 File Descriptions

### Root Files

- **index.html**: Main HTML document with canvas element and UI containers
- **textures/**: Directory containing all 2K/8K planet textures from Solar System Scope

### CSS Files

- **base.css**: Global resets, body styles, canvas setup, utility classes (`.hidden`, `.desktop-only`, `.mobile-only`)
- **ui-controls.css**: Top info bar, help button, speed display, control buttons styling
- **info-panels.css**: Planet info cards, help panel, time display with close buttons and mobile actions
- **minimap.css**: Solar system overview map positioned bottom-right
- **labels.css**: CSS2D planet label styling with text shadows
- **mobile.css**: Media queries for screens ≤768px, touch-optimized UI adjustments

### JavaScript Modules

#### `js/main.js`

**Purpose**: Application entry point and main animation loop  
**Responsibilities**:

- Initialize all systems (environment, celestial bodies, UI)
- Set up event listeners and interactions
- Run 60fps animation loop updating all moving objects
- Coordinate between physics, rendering, and UI updates

#### `js/config/constants.js`

**Purpose**: Centralized configuration file  
**Contents**:

- Camera settings (FOV, position, clipping planes)
- Physics multipliers (orbit speeds, rotation speeds)
- Visual constants (colors, sizes, segments)
- Planet data array (all 9 celestial bodies with properties)
- Organized by which file uses each constant

#### `js/config/constellations.js`

**Purpose**: Constellation coordinate data  
**Contents**:

- Spherical-to-Cartesian conversion function
- 4 major constellations with real astronomical coordinates (RA/Dec)
- Star positions for Ursa Major, Orion, Cassiopeia, Crux

#### `js/setup/scene.js`

**Purpose**: Three.js scene initialization  
**Exports**:

- `scene`: Main Three.js scene object
- `camera`: Perspective camera
- `renderer`: WebGL renderer
- `labelRenderer`: CSS2D renderer for labels
- `textureLoader`: Shared texture loader
- `handleResize()`: Window resize handler

**Responsibilities**:

- Create scene, camera, and dual renderers
- Set up ambient and point lighting
- Configure renderer settings (antialiasing, pixel ratio)

#### `js/setup/controls.js`

**Purpose**: User input handling  
**Exports**:

- `controls`: OrbitControls instance
- `speedMultiplier`, `isPaused`: State getters/setters
- Mobile touch enhancements

**Responsibilities**:

- Configure OrbitControls with damping
- Handle keyboard events (space, +/-, F, O, S, T, C, R, H, ESC)
- Handle UI button clicks (slower, faster, pause, reset, help)
- Detect mobile devices and adjust control sensitivity
- Prevent pull-to-refresh on mobile

#### `js/setup/ui.js`

**Purpose**: UI canvas initialization  
**Exports**:

- `minimapCanvas`, `minimapCtx`: Canvas context
- `drawMinimap()`: Draw function for overhead map

**Responsibilities**:

- Initialize minimap 2D canvas (180x180px)
- Draw top-down view with sun (yellow), planets (blue), camera direction (red)
- Update every frame to show real-time positions

#### `js/objects/celestial.js`

**Purpose**: Create sun, planets, and moons  
**Exports**:

- `createSun()`: Sun with glow and lens flare
- `createPlanets()`: All 9 planets with properties
- Scale state management

**Responsibilities**:

- Load planet textures and create spheres
- Set up hierarchical groups (orbit groups → planets → moons)
- Create Saturn's rings
- Add atmosphere glow to applicable planets
- Create floating CSS2D labels
- Handle realistic vs stylized scaling

#### `js/objects/asteroids.js`

**Purpose**: Generate asteroid belt  
**Exports**:

- `createAsteroidBelt()`: 500 asteroids between Mars and Jupiter

**Responsibilities**:

- Create low-poly spheres (6 segments for performance)
- Randomly position in ring (radius 125-145 units)
- Randomize sizes (0.3-1.2 scale) and rotations
- Store rotation speeds for animation

#### `js/objects/environment.js`

**Purpose**: Background and orbit visualization  
**Exports**:

- `createStarfield()`: Milky Way sphere
- `createOrbitLines()`: Ring geometries for each planet

**Responsibilities**:

- Create 5000-unit sphere with stars on inside
- Generate semi-transparent orbit rings
- Position rings at each planet's orbital radius

#### `js/objects/trails.js`

**Purpose**: Planet trail effects  
**Exports**:

- `initTrails()`: Set up trail system
- `updateTrail()`: Update trail positions each frame
- `toggleTrails()`: Show/hide trails

**Responsibilities**:

- Store last 100 positions per planet
- Draw colored lines through position history
- Update geometry every frame (performance-sensitive)
- Assign planet-specific colors

#### `js/objects/constellations.js`

**Purpose**: Render constellation lines  
**Exports**:

- `createConstellations()`: Draw constellation geometry
- `toggleConstellations()`: Visibility toggle

**Responsibilities**:

- Convert constellation data to 3D lines
- Create semi-transparent blue lines
- Position on starfield sphere interior

#### `js/interactions/camera.js`

**Purpose**: Camera movement and animations  
**Exports**:

- `flyToPlanet()`: Smooth animated transition to planet
- `resetCamera()`: Return to initial position
- `toggleFollowPlanet()`: Enable/disable follow mode
- `updateFollowMode()`: Update camera position when following

**Responsibilities**:

- Eased camera interpolation (ease-in-out quadratic)
- Calculate optimal viewing distance per planet
- Orbit camera around followed planet
- Disable follow mode when clicking new planet
- Pause simulation during camera flights

#### `js/interactions/raycaster.js`

**Purpose**: Mouse/touch object picking  
**Exports**:

- `setupMouseClick()`: Handle planet clicks
- `setupMouseMove()`: Cursor hover effects
- Animation state management

**Responsibilities**:

- Convert screen coordinates to 3D ray
- Detect intersections with planet meshes
- Change cursor to pointer on hover
- Trigger planet info and camera flight on click
- Prevent clicks during animations

#### `js/interactions/info.js`

**Purpose**: Planet information display  
**Exports**:

- `showPlanetInfo()`: Display planet facts
- `hidePlanetInfo()`: Close info card

**Responsibilities**:

- Generate HTML with planet data (mass, distance, fun fact)
- Create close button and mobile action buttons dynamically
- Set up event listeners for Resume and Reset buttons
- Import control functions for mobile interactions

#### `js/utils/toggles.js`

**Purpose**: Feature toggle functions  
**Exports**:

- `initToggles()`: Initialize with planet/orbit references
- `toggleOrbitLines()`: Show/hide orbit paths
- `togglePlanetScale()`: Switch between realistic/stylized sizes
- `toggleHelpPanel()`: Show/hide help overlay
- `initHelpPanel()`: Set up help button listeners

**Responsibilities**:

- Manage visibility states
- Scale planet meshes without recreating geometry
- Log toggle states to console

#### `js/utils/updates.js`

**Purpose**: UI update functions  
**Exports**:

- `updateSpeedDisplay()`: Update speed indicator text
- `updatePauseButton()`: Change pause/play icon
- `updateTimeDisplay()`: Show simulation days/years
- `incrementSimulationDay()`: Advance time counter

**Responsibilities**:

- Reflect speed multiplier in UI (1.0x, PAUSED, etc.)
- Change button icon between ⏸ and ▶
- Format time as "Day N" or "Ny Nd"
- Calculate elapsed simulation time

---

## 🎮 Controls

### Mouse/Touch Controls

| Action            | Desktop       | Mobile           |
| ----------------- | ------------- | ---------------- |
| **Rotate View**   | Click + Drag  | One-finger drag  |
| **Zoom**          | Scroll wheel  | Pinch gesture    |
| **Select Planet** | Click planet  | Tap planet       |
| **Close Info**    | Click outside | Tap X or outside |

### Keyboard Shortcuts (Desktop Only)

| Key            | Action                                              |
| -------------- | --------------------------------------------------- |
| **Space**      | Pause/Resume simulation                             |
| **+** / **=**  | Increase speed (up to 10x)                          |
| **-** / **\_** | Decrease speed (down to 0.1x)                       |
| **F**          | Toggle follow mode on selected planet               |
| **O**          | Toggle orbit lines visibility                       |
| **S**          | Toggle between realistic and stylized planet scales |
| **T**          | Toggle planet trails                                |
| **C**          | Toggle constellation lines                          |
| **R**          | Reset camera to initial position                    |
| **H**          | Toggle help panel                                   |
| **ESC**        | Close help panel                                    |

### UI Buttons

- **? (Help)**: Open keyboard shortcuts guide
- **− (Slower)**: Decrease simulation speed
- **⏸ (Pause)**: Pause/resume simulation
- **+ (Faster)**: Increase simulation speed
- **⌂ (Reset)**: Reset camera view

### Mobile-Specific Features

When viewing a planet on mobile:

- **X Button**: Close info card (stays paused)
- **Resume Button**: Unpause simulation and close card
- **Reset View Button**: Return to starting camera position

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser with WebGL support (Chrome, Firefox, Safari, Edge)
- Local web server (required for CORS policy with textures)

### Installation

1. **Clone or download the repository**

```bash
git clone https://github.com/thihabisu1208/solar-system.git
cd solar-system
```

2. **Download planet textures**

   - Visit [Solar System Scope Textures](https://www.solarsystemscope.com/textures/)
   - Download 2K texture pack (free)
   - Place textures in `textures/` folder:
     - `2k_sun.jpg`
     - `2k_mercury.jpg`
     - `2k_venus_surface.jpg`
     - `2k_earth_daymap.jpg`
     - `2k_mars.jpg`
     - `2k_jupiter.jpg`
     - `2k_saturn.jpg`
     - `2k_uranus.jpg`
     - `2k_neptune.jpg`
     - `2k_moon.jpg`
     - `8k_stars_milky_way.jpg`

3. **Download lens flare textures**

   - [lensflare0.png](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/lensflare/lensflare0.png)
   - [lensflare3.png](https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/lensflare/lensflare3.png)
   - Place in `textures/` folder

4. **Start a local server**

   **Option A: Python (Python 3)**

```bash
   python3 -m http.server 8000
```

**Option B: Python (Python 2)**

```bash
   python -m SimpleHTTPServer 8000
```

**Option C: Node.js (http-server)**

```bash
   npx http-server -p 8000
```

**Option D: PHP**

```bash
   php -S localhost:8000
```

**Option E: VS Code Live Server**

- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

5. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Wait for textures to load (a few seconds)
   - Start exploring!

---

## 🎯 Usage Examples

### Basic Exploration

1. **Load the page** - The solar system appears with all planets orbiting
2. **Drag to rotate** - Click and drag anywhere to rotate your view
3. **Scroll to zoom** - Get closer or pull back to see the full system
4. **Click a planet** - View detailed information and watch the camera fly to it

### Advanced Features

1. **Speed Control**

   - Press `+` multiple times to speed up orbits
   - Press `-` to slow down for detailed observation
   - Press `Space` to pause and examine static positions

2. **Follow Mode**

   - Click Earth
   - Press `F` to start orbiting around Earth automatically
   - Press `F` again to stop

3. **Visual Toggles**

   - Press `T` to see planet trails appear behind each planet
   - Press `O` to toggle orbit lines for a cleaner view
   - Press `C` to view constellations in the background
   - Press `S` to see realistic planet size comparisons (Jupiter is huge!)

4. **Mobile Usage**
   - Tap any planet to view information
   - Use "Resume" button to continue simulation
   - Use "Reset View" to return to starting position
   - Pinch to zoom, drag to rotate

---

## 🔧 Customization

### Adjusting Planet Data

Edit `js/config/constants.js` to modify planet properties:

```javascript
{
    name: "Earth",
    radius: 10,                      // Visual size
    distanceFromSun: 85,             // Orbital radius
    orbitSpeed: 3.0,                 // Speed around sun
    rotationSpeed: 0.5,              // Spin speed
    texture: "2k_earth_daymap.jpg",
    realDistance: "149.6 million km",
    mass: "5.97 × 10²⁴ kg",
    funFact: "The only known planet with life!"
}
```

### Changing Visual Settings

Modify constants in `js/config/constants.js`:

```javascript
// Camera
const CAMERA_INITIAL_POSITION = { x: 0, y: 150, z: 300 };

// Speed
const ORBIT_SPEED_MULTIPLIER = 0.003; // Lower = slower orbits

// Trails
const TRAIL_LENGTH = 100; // Number of trail points
const TRAIL_OPACITY = 0.6; // Trail transparency

// Asteroids
const ASTEROID_COUNT = 500; // More = denser belt
```

### Adding New Features

The modular structure makes it easy to extend:

1. **New visual effects**: Add to `js/objects/`
2. **New interactions**: Add to `js/interactions/`
3. **New UI elements**: Add to `js/setup/`
4. **New toggles**: Add to `js/utils/toggles.js`

---

## 🎨 Visual Design Decisions

### Color Scheme

- **Primary**: `#4fc3f7` (Cyan blue) - UI highlights, borders, labels
- **Background**: `rgba(0, 0, 0, 0.7-0.95)` - Semi-transparent black panels
- **Text**: White with blue accents for important information

### Typography

- **System Font Stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Monospace** for technical values (speed, time)
- **Bold uppercase** for headers with letter-spacing

### Spacing & Layout

- **Consistent Padding**: 10-40px based on hierarchy
- **Border Radius**: 5-15px for rounded modern feel
- **Gaps**: 8-12px between related elements

### Visual Hierarchy

1. **Planet Info**: Center screen, largest, highest z-index
2. **Help Panel**: Full-screen modal when active
3. **Controls**: Bottom center, always accessible
4. **Indicators**: Corners, subtle presence

---

## 📱 Mobile Optimization

### Touch Interactions

- **55px minimum button size** for touch targets
- **Increased gaps** between interactive elements
- **Disabled pan controls** to prevent confusion
- **Adjusted zoom speed** for finger gestures

### Performance

- **Reduced particle counts** (kept at 500, but room for mobile optimization)
- **Disabled damping during follow mode** for smoother animation
- **Optimized trail updates** with BufferGeometry

### UI Adaptations

- **Speed display moved to top** (bottom reserved for controls)
- **Full-width info cards** on small screens
- **Larger labels and text** for readability
- **Modal help panel** with scrolling for small screens

### Landscape Mode

- **Time display hidden** on very short screens (< 500px height)
- **Smaller minimap** (120x120 vs 200x200)
- **Compact controls** with reduced spacing

---

## ⚡ Performance Considerations

### Optimizations

- **Low-poly asteroids**: 6 segments instead of 32 (reduces polygons by 80%)
- **Shared geometries**: Single asteroid geometry instance used 500 times
- **BufferGeometry**: Used for trails instead of regular geometry
- **Texture reuse**: Mercury texture reused for Pluto
- **Conditional rendering**: Desktop-only elements not rendered on mobile

### Performance Metrics

- **Target**: 60 FPS on desktop, 30-60 FPS on mobile
- **Polygon count**: ~50,000 triangles total
- **Draw calls**: ~20-25 per frame
- **Texture memory**: ~50MB (2K textures)

### Future Optimizations

- Level of Detail (LOD) for distant planets
- Instanced meshes for asteroid belt
- Texture atlas for multiple planets
- Frustum culling for off-screen objects

---

## 🐛 Known Issues & Limitations

### Current Limitations

1. **Orbital Planes**: All planets orbit on same plane (no inclination)
2. **Elliptical Orbits**: Orbits are perfect circles, not ellipses
3. **Axial Tilt**: Planets don't have rotational axis tilt
4. **Moon Count**: Only Earth's moon and Jupiter's 4 major moons included
5. **Realistic Distances**: Distances compressed for visibility (would be too far apart in reality)

### Browser Compatibility

- **Chrome**: Fully supported ✅
- **Firefox**: Fully supported ✅
- **Safari**: Fully supported ✅
- **Edge**: Fully supported ✅
- **Mobile Chrome**: Fully supported ✅
- **Mobile Safari**: Fully supported ✅
- **IE 11**: Not supported ❌ (no WebGL 2.0)

### Performance Notes

- **Low-end devices**: May experience reduced FPS with all effects enabled
- **High-DPI displays**: Pixel ratio capped at 2x for performance
- **Many tabs open**: WebGL context may be lost if too many 3D sites open

---

## 🔮 Future Enhancements

### Potential Features

- [ ] Planetary moons (add more moons to gas giants)
- [ ] Comet with dynamic tail
- [ ] Space station or satellite orbit
- [ ] Multiple camera presets (top view, side view, chase cam)
- [ ] Export screenshot/video functionality
- [ ] VR mode support
- [ ] Day/night cycle on Earth
- [ ] Planetary atmosphere effects (clouds, storms)
- [ ] Sound effects and ambient music
- [ ] Educational quiz mode
- [ ] Time-travel mode (see positions on specific dates)
- [ ] Spacecraft trajectory visualization
- [ ] Dwarf planets (Ceres, Eris, Makemake, Haumea)

### Code Improvements

- [ ] Add unit tests (Jest)
- [ ] TypeScript migration
- [ ] Performance profiling dashboard
- [ ] Loading progress indicator
- [ ] Error boundary handling
- [ ] Accessibility improvements (ARIA labels, keyboard nav)
- [ ] Internationalization (i18n)

---

## 📚 Learning Resources

### Three.js Documentation

- [Three.js Official Docs](https://threejs.org/docs/)
- [Three.js Examples](https://threejs.org/examples/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)

### Astronomical Data Sources

- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [Solar System Scope Textures](https://www.solarsystemscope.com/textures/)
- [JPL Horizons System](https://ssd.jpl.nasa.gov/horizons/) (orbital data)

### WebGL & Graphics

- [WebGL Fundamentals](https://webglfundamentals.org/)
- [The Book of Shaders](https://thebookofshaders.com/)
- [Shadertoy](https://www.shadertoy.com/) (shader examples)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if issue already exists
2. Provide browser/device information
3. Include steps to reproduce
4. Add screenshots if applicable

### Suggesting Features

1. Describe the feature clearly
2. Explain the use case
3. Consider performance impact
4. Check if it aligns with project goals

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Follow existing code style
4. Test on multiple browsers
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Code Style Guidelines

- Use ES6+ features
- Comment complex logic
- Keep functions small and focused
- Use descriptive variable names
- Follow existing file structure
- Add JSDoc comments for functions

---

## 📜 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Thiha Htun Naing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Assets

- **Planet Textures**: [Solar System Scope](https://www.solarsystemscope.com/textures/) - Free 2K/8K textures
- **Lens Flare Textures**: [Three.js Examples](https://github.com/mrdoob/three.js/tree/dev/examples/textures/lensflare)
- **Astronomical Data**: NASA and JPL for planetary facts

### Libraries

- **Three.js**: [mrdoob](https://github.com/mrdoob) and contributors - 3D rendering library
- **OrbitControls**: Three.js addon for camera navigation

### Inspiration

- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [Solar System Scope](https://www.solarsystemscope.com/)
- [Eyes on the Solar System](https://eyes.nasa.gov/apps/solar-system/)
- [WebGL Solar System](https://github.com/jeromeetienne/threex.planets) by Jerome Etienne

### Special Thanks

- Three.js community for documentation and examples
- Solar System Scope for high-quality free textures
- Stack Overflow community for WebGL solutions

---

## 📧 Contact

**Project Maintainer**: Thiha Htun Naing

- GitHub: [@thihabisu1208](https://github.com/thihabisu1208)
- Email: thihabisu1208@gmail.com

**Project Link**: [https://github.com/thihabisu1208/solar-system-threejs](https://github.com/thihabisu1208/solar-system-threejs)

**Live Demo**: [https://thihabisu1208.github.io/solar-system-threejs/](https://thihabisu1208.github.io/solar-system-threejs/)

---

**Made with ❤️ and Three.js**

_Exploring the cosmos, one line of code at a time_ 🚀🌍🪐
