# **Interactive Solar System Simulation**  

## **Overview**  
This project is a **3D interactive solar system simulation** built using **Three.js**. The simulation allows users to adjust the size, speed, and distance of planets dynamically. The configuration settings persist using `localStorage`, ensuring a customizable experience.  

## **Features**  
- Real-time adjustment of **planet size, orbital speed, and distance** from the Sun.  
- **Smooth orbiting animation** using `requestAnimationFrame`.  
- **Visible orbit paths** for a clear representation of planetary motion.  
- **Persistent settings** stored in `localStorage` for a consistent user experience.  

## **Technologies Used**  
- **HTML, CSS, JavaScript**  
- **Three.js** for 3D rendering  
- **WebGLRenderer** for optimized graphics rendering  

## **Setup Instructions**  

### **1. Prerequisites**  
Ensure you have the following installed:  
- A modern web browser (Chrome, Firefox, Edge)  
- A local development server (optional but recommended for module imports)  

### **2. Installation**  
1. Clone this repository:  
   ```bash
   git clone https://github.com/your-repository/solar-system.git
   cd solar-system
   ```
2. Open `index.html` in a browser, or start a local server:  
   ```bash
   npx http-server
   ```
3. The simulation will be accessible at `http://localhost:8080` (or your local server's address).  

## **Project Structure**  
```
/solar-system
│── index.html           # Main HTML file  
│── script.js            # JavaScript for Three.js simulation  
│── style.css            # Styling for UI components  
│── firebase-config.js   # Firebase configuration
└── README.md            # Project documentation  
```

## **Implementation Details**  
- **Three.js Rendering:** The `WebGLRenderer` is used for efficient rendering.  
- **Planetary Motion:** Planets orbit the Sun using trigonometric calculations (`cos` and `sin`).  
- **Orbit Paths:** Circular lines are drawn using `THREE.LineBasicMaterial` to represent planetary orbits.  
- **User Controls:** Sliders update planet size, speed, and distance dynamically.  
- **Persistence:** `localStorage` is used to save settings between sessions.  


## **License**  
This project is licensed under the **MIT License**.  

