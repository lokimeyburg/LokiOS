import * as dat from "lil-gui";
import Head from "next/head";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const VaporWave = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI();
    gui.hide();

    // Canvas
    const canvas = document.querySelector("canvas.webgl");

    // Textures
    const textureLoader = new THREE.TextureLoader();
    const gridTexture = textureLoader.load("/grid-6.png");
    const heightTexture = textureLoader.load("/displacement-7.png");

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fefefe");

    // Fog
    const fog = new THREE.Fog("#fefefe", 1, 2.5);
    scene.fog = fog;

    // Objects
    const geometry = new THREE.PlaneGeometry(1, 2, 24, 24);
    const material = new THREE.MeshPhongMaterial({
        // Add the texture to the material
        color: "#ffffff",
        map: gridTexture,
        displacementMap: heightTexture,
        displacementScale: 0.4,
    });

    const plane = new THREE.Mesh(geometry, material);
    const plane2 = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI * 0.5;
    plane2.rotation.x = -Math.PI * 0.5;

    plane.position.y = 0.0;
    plane.position.z = 0.15;
    plane2.position.y = 0.0;
    plane2.position.z = -1.85;
    scene.add(plane);
    scene.add(plane2);

    scene.add(plane);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.01,
      20
    );
    camera.position.x = 0;
    camera.position.y = 0.06;
    camera.position.z = 1.1;

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Lights
    const ambientLight = new THREE.AmbientLight("#fefefe", 1);
    scene.add(ambientLight);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Event listener to handle screen resize
    window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Animate
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update plane position
      plane.position.z = (elapsedTime * 0.15) % 2;
      plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };
    tick();

    // const tick = () => {
    // // Update controls
    // controls.update();

    // // Update the rendered scene
    // renderer.render(scene, camera);

    // // Call tick again on the next frame
    // window.requestAnimationFrame(tick);
    // };

    // tick();
  }, []);

  return (
    <canvas ref={mountRef} className="webgl" style={{position: "absolute"}}></canvas>
  );
};

export default VaporWave;
