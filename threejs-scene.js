// Dual Three.js Scenes
console.log('Loading threejs-scene.js with dual scenes');

let scene1Initialized = false;
let scene2Initialized = false;

// Scene 1: Rotating geometric shapes
function initThreeJSScene1() {
    if (scene1Initialized) {
        console.log('Three.js Scene 1 already initialized');
        return;
    }
    
    console.log('Initializing Three.js Scene 1...');
    
    const container = document.getElementById('threejs-container');
    if (!container) {
        console.error('threejs-container not found');
        return;
    }
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        container.innerHTML = '<div style="color: red; padding: 20px;">THREE.js failed to load</div>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    try {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, 720 / 400, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(720, 400);
        container.appendChild(renderer.domElement);
        
        // Create a rotating cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            wireframe: false
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        // Create a second object - a sphere
        const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);
        const sphereMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff0000,
            wireframe: true
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 2.5;
        scene.add(sphere);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate both objects
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
            sphere.rotation.x += 0.02;
            sphere.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        // Start animation
        animate();
        
        scene1Initialized = true;
        console.log('Three.js Scene 1 initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing Three.js Scene 1:', error);
        container.innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
    }
}

// Scene 2: Interactive scene with mouse controls
function initThreeJSScene2() {
    if (scene2Initialized) {
        console.log('Three.js Scene 2 already initialized');
        return;
    }
    
    console.log('Initializing Three.js Scene 2...');
    
    const container = document.getElementById('threejs-container-2');
    if (!container) {
        console.error('threejs-container-2 not found');
        return;
    }
    
    // Check if THREE is available
    if (typeof THREE === 'undefined') {
        console.error('THREE.js not loaded');
        container.innerHTML = '<div style="color: red; padding: 20px;">THREE.js failed to load</div>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    try {
        // Create scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x444466);
        
        // Add fog effect
        scene.fog = new THREE.Fog(0x444466, 1, 10);
        
        // Create camera
        const camera = new THREE.PerspectiveCamera(75, 720 / 400, 0.1, 1000);
        camera.position.z = 5;
        
        // Create renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(720, 400);
        container.appendChild(renderer.domElement);
        
        // Create multiple objects
        const objects = [];
        
        // Create torus
        const torusGeometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ffff,
            wireframe: true,
            fog: true
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.x = -2;
        torus.position.z = -1; // Move slightly back for fog effect
        scene.add(torus);
        objects.push(torus);
        
        // Create octahedron
        const octaGeometry = new THREE.OctahedronGeometry(1);
        const octaMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            wireframe: false,
            fog: true
        });
        const octa = new THREE.Mesh(octaGeometry, octaMaterial);
        scene.add(octa);
        objects.push(octa);
        
        // Create cone
        const coneGeometry = new THREE.ConeGeometry(0.8, 1.5, 8);
        const coneMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff00ff,
            wireframe: true,
            fog: true
        });
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.x = 2;
        cone.position.z = -0.5; // Move slightly back for fog effect
        scene.add(cone);
        objects.push(cone);
        
        // Mouse interaction variables
        let mouseX = 0;
        let mouseY = 0;
        
        // Mouse move handler
        function onMouseMove(event) {
            const rect = container.getBoundingClientRect();
            mouseX = ((event.clientX - rect.left) / 720) * 2 - 1;
            mouseY = -((event.clientY - rect.top) / 400) * 2 + 1;
        }
        
        container.addEventListener('mousemove', onMouseMove, false);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Rotate objects based on mouse position
            objects.forEach((obj, index) => {
                obj.rotation.x += 0.01 + mouseY * 0.02;
                obj.rotation.y += 0.01 + mouseX * 0.02;
                
                // Add some individual movement
                obj.rotation.z += 0.005 * (index + 1);
                
                // Add subtle z-axis movement for fog effect
                obj.position.z += Math.sin(Date.now() * 0.001 + index) * 0.01;
            });
            
            // Move camera slightly based on mouse
            camera.position.x = mouseX * 0.5;
            camera.position.y = mouseY * 0.5;
            camera.lookAt(0, 0, 0);
            
            renderer.render(scene, camera);
        }
        
        // Start animation
        animate();
        
        scene2Initialized = true;
        console.log('Three.js Scene 2 initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing Three.js Scene 2:', error);
        container.innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
    }
}

// Initialize both scenes when the assignment tab becomes visible
function initBothScenes() {
    console.log('Initializing both Three.js scenes...');
    setTimeout(() => {
        initThreeJSScene1();
        initThreeJSScene2();
    }, 100);
}

// Initialize when the assignment tab becomes visible
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded for dual Three.js scenes');
    
    // Get the assignment tab
    const assignmentTab = document.getElementById('assignmentTab');
    if (assignmentTab) {
        assignmentTab.addEventListener('click', function() {
            console.log('Assignment tab clicked - initializing both Three.js scenes');
            initBothScenes();
        });
    }
    
    // Also check if assignment section is already visible
    setTimeout(function() {
        const assignmentSection = document.getElementById('assignmentSection');
        if (assignmentSection && assignmentSection.classList.contains('visible')) {
            console.log('Assignment section already visible');
            initBothScenes();
        }
    }, 500);
});