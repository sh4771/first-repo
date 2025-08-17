// Three.js Scene Setup
let scene, camera, renderer, sphere, cube;
let mouseX = 0, mouseY = 0;

function initThreeJS() {
    const container = document.getElementById('threejs-container');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x919191); // Gray background like p5 version
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, 720/400, 0.1, 1000);
    camera.position.z = 300;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(720, 400);
    container.appendChild(renderer.domElement);
    
    // Sphere
    const sphereGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sphereMaterial = new THREE.MeshNormalMaterial();
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Cube
    const cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
    const cubeMaterial = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 120;
    scene.add(cube);
    
    // Mouse move event
    container.addEventListener('mousemove', onMouseMove, false);
    
    // Start animation loop
    animate();
}

function onMouseMove(event) {
    const rect = event.target.getBoundingClientRect();
    mouseX = ((event.clientX - rect.left) / 720) * 2 - 1;
    mouseY = -((event.clientY - rect.top) / 400) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotation based on mouse (similar to p5 version)
    const rotX = mouseY * Math.PI;
    const rotY = mouseX * Math.PI;
    
    // Apply rotation to both objects
    sphere.rotation.x = rotX;
    sphere.rotation.y = rotY;
    cube.rotation.x = rotX;
    cube.rotation.y = rotY;
    
    // Movement based on mouse position
    const offsetX = mouseX * 100;
    const offsetY = mouseY * 100;
    
    sphere.position.x = offsetX;
    sphere.position.y = offsetY;
    
    cube.position.x = offsetX + 120;
    cube.position.y = offsetY;
    
    renderer.render(scene, camera);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure the tab system is ready
    setTimeout(initThreeJS, 100);
});