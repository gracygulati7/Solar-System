import * as THREE from "https://unpkg.com/three@0.128.0/build/three.module.js";
import { db } from "./firebase-config.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("solarCanvas") });

renderer.setSize(window.innerWidth, 500);
document.body.appendChild(renderer.domElement);

// Add Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(ambientLight, directionalLight);

// Create Sun
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet Data
const planets = [];
const planetData = {
    Mercury: { color: 0xaaaaaa, distance: 20, size: 1, speed: 0.04 },
    Venus: { color: 0xff9900, distance: 30, size: 1.5, speed: 0.02 },
    Earth: { color: 0x0000ff, distance: 40, size: 2, speed: 0.015 },
    Mars: { color: 0xff0000, distance: 50, size: 1.8, speed: 0.01 },
    Jupiter: { color: 0xffa500, distance: 70, size: 4, speed: 0.007 },
    Saturn: { color: 0xffcc66, distance: 90, size: 3.5, speed: 0.005 },
    Uranus: { color: 0x66ccff, distance: 110, size: 3, speed: 0.003 },
    Neptune: { color: 0x3333ff, distance: 130, size: 2.8, speed: 0.002 }
};

// Create Planets
for (const planet in planetData) {
    const geometry = new THREE.SphereGeometry(planetData[planet].size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: planetData[planet].color });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.x = planetData[planet].distance;
    scene.add(mesh);

    planets.push({ name: planet, mesh, ...planetData[planet], angle: Math.random() * Math.PI * 2 });
}

// Camera Position
camera.position.set(0, 30, 150);
camera.lookAt(sun.position);

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time difference for smooth animation

    // Rotate Planets Around Sun
    planets.forEach(planet => {
        planet.angle += planet.speed * delta * 10; // Adjusting speed factor
        planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
    });

    renderer.render(scene, camera);
}
animate();

// UI Event Listeners for Sliders
document.getElementById("sizeSlider").addEventListener("input", (event) => {
    const scaleFactor = parseFloat(event.target.value);
    planets.forEach(planet => {
        planet.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    });
});

document.getElementById("speedSlider").addEventListener("input", (event) => {
    const speedFactor = parseFloat(event.target.value);
    planets.forEach(planet => {
        planet.speed = planetData[planet.name].speed * speedFactor;
    });
});

document.getElementById("orbitSlider").addEventListener("input", (event) => {
    const orbitFactor = parseFloat(event.target.value);
    planets.forEach(planet => {
        planet.distance = planetData[planet.name].distance * orbitFactor;
    });
});

// ✅ Save and Load Configuration
document.getElementById("saveConfig").addEventListener("click", async () => {
    const config = {};
    planets.forEach(planet => config[planet.name] = { 
        size: planet.mesh.scale.x, 
        speed: planet.speed, 
        distance: planet.distance 
    });

    await setDoc(doc(db, "solarConfigurations", "userConfig"), config);
    alert("Configuration Saved!");
});

document.getElementById("loadConfig").addEventListener("click", async () => {
    const docSnap = await getDoc(doc(db, "solarConfigurations", "userConfig"));
    if (docSnap.exists()) {
        const config = docSnap.data();
        planets.forEach(planet => {
            if (config[planet.name]) {
                planet.mesh.scale.set(config[planet.name].size, config[planet.name].size, config[planet.name].size);
                planet.speed = config[planet.name].speed;
                planet.distance = config[planet.name].distance;
            }
        });
        alert("Configuration Loaded!");
    } else {
        alert("No saved configuration found!");
    }
});
