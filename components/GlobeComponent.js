import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GlobeComponent = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append renderer to the ref
    if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
    }

    // Globe geometry and material
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const globeTexture = textureLoader.load('https://i.imgur.com/Z07J9i2.jpeg'); // Replace with your texture path
    const material = new THREE.MeshBasicMaterial({ map: globeTexture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 15;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.001; // Rotate the globe
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    let currentMountRef = mountRef.current
    return () => {
        if (currentMountRef) {
            currentMountRef.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={mountRef} />;
};


export default GlobeComponent;