import React, { useRef, useEffect, useState } from 'react';

const WordEmbeddingCanvas = () => {
  const containerRef = useRef(null);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    // Load Three.js from Cloudflare CDN
    if (window.THREE && window.THREE.OrbitControls) {
      setThreeLoaded(true);
      return;
    }

    const loadThree = () => {
      if (window.THREE) {
        loadOrbitControls();
        return;
      }
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = loadOrbitControls;
      document.head.appendChild(script);
    };

    const loadOrbitControls = () => {
      if (window.THREE.OrbitControls) {
        setThreeLoaded(true);
        return;
      }
      // Use unpkg CDN for OrbitControls
      const controlsScript = document.createElement('script');
      controlsScript.src =
        'https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js';
      controlsScript.onload = () => {
        // OrbitControls from examples/js/controls/OrbitControls.js attaches to THREE
        if (window.THREE && window.THREE.OrbitControls) {
          setThreeLoaded(true);
        } else {
          // Fallback: try to access it directly
          console.warn('OrbitControls not found, using fallback');
          setThreeLoaded(true);
        }
      };
      controlsScript.onerror = () => {
        // If OrbitControls fails to load, we'll implement a simple fallback
        console.warn('Failed to load OrbitControls, using basic controls');
        setThreeLoaded(true);
      };
      document.head.appendChild(controlsScript);
    };

    loadThree();
  }, []);

  useEffect(() => {
    if (!threeLoaded || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 600;

    // Scene setup
    const scene = new window.THREE.Scene();
    scene.background = new window.THREE.Color(0xf5f5f5);

    // Camera setup
    const camera = new window.THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000,
    );
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new window.THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // OrbitControls - with fallback to basic mouse controls
    let controls;
    if (window.THREE.OrbitControls) {
      controls = new window.THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.enablePan = true;
    } else {
      // Fallback: implement basic orbit controls
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const onMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        const spherical = new window.THREE.Spherical();
        spherical.setFromVector3(camera.position);
        spherical.theta -= deltaMove.x * 0.01;
        spherical.phi += deltaMove.y * 0.01;
        spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

        camera.position.setFromSpherical(spherical);
        camera.lookAt(0, 0, 0);

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onWheel = (e) => {
        e.preventDefault();
        const scale = e.deltaY > 0 ? 1.1 : 0.9;
        camera.position.multiplyScalar(scale);
      };

      renderer.domElement.addEventListener('mousedown', onMouseDown);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
      renderer.domElement.addEventListener('mouseup', onMouseUp);
      renderer.domElement.addEventListener('wheel', onWheel);

      controls = {
        update: () => {},
        dispose: () => {
          renderer.domElement.removeEventListener('mousedown', onMouseDown);
          renderer.domElement.removeEventListener('mousemove', onMouseMove);
          renderer.domElement.removeEventListener('mouseup', onMouseUp);
          renderer.domElement.removeEventListener('wheel', onWheel);
        },
      };
    }

    // Helper function to create arrow
    const createArrow = (direction, color, length = 1) => {
      const origin = new window.THREE.Vector3(0, 0, 0);
      const dir = new window.THREE.Vector3(...direction).normalize();
      const arrowHelper = new window.THREE.ArrowHelper(
        dir,
        origin,
        length,
        color,
        length * 0.2,
        length * 0.1,
      );
      return arrowHelper;
    };

    // Helper function to create text sprite
    const createTextSprite = (text, color) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = color;
      context.font = 'Bold 20px Arial';
      context.fillText(text, 10, 40);
      const texture = new window.THREE.CanvasTexture(canvas);
      const spriteMaterial = new window.THREE.SpriteMaterial({ map: texture });
      const sprite = new window.THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.5, 0.25, 1);
      return sprite;
    };

    // Draw base axes with black arrows
    const axisLength = 1.5;
    const axisColor = 0x000000; // Black

    // X-axis (red in standard, but user wants black)
    const xAxisArrow = new window.THREE.ArrowHelper(
      new window.THREE.Vector3(1, 0, 0),
      new window.THREE.Vector3(0, 0, 0),
      axisLength,
      axisColor,
      axisLength * 0.15,
      axisLength * 0.08,
    );
    scene.add(xAxisArrow);

    // Y-axis (green in standard, but user wants black)
    const yAxisArrow = new window.THREE.ArrowHelper(
      new window.THREE.Vector3(0, 1, 0),
      new window.THREE.Vector3(0, 0, 0),
      axisLength,
      axisColor,
      axisLength * 0.15,
      axisLength * 0.08,
    );
    scene.add(yAxisArrow);

    // Z-axis (blue in standard, but user wants black)
    const zAxisArrow = new window.THREE.ArrowHelper(
      new window.THREE.Vector3(0, 0, 1),
      new window.THREE.Vector3(0, 0, 0),
      axisLength,
      axisColor,
      axisLength * 0.15,
      axisLength * 0.08,
    );
    scene.add(zAxisArrow);

    // Add axis labels
    const xLabel = createTextSprite('X', '#000000');
    xLabel.position.set(axisLength * 1.2, 0, 0);
    scene.add(xLabel);

    const yLabel = createTextSprite('Y', '#000000');
    yLabel.position.set(0, axisLength * 1.2, 0);
    scene.add(yLabel);

    const zLabel = createTextSprite('Z', '#000000');
    zLabel.position.set(0, 0, axisLength * 1.2);
    scene.add(zLabel);

    // Word vectors
    const vectors = {
      man: { vec: [-0.3, 0.85, 0.45], color: '#4B77BE' },
      woman: { vec: [0.3, 0.48, 0.29], color: '#AF7AC5' },
      king: { vec: [0.2, 0.72, 0.35], color: '#E74C3C' },
      queen: { vec: [0.89, 0.41, 0.2], color: '#73C6B6' },
    };

    // Create arrows and labels
    const arrowGroups = [];
    Object.entries(vectors).forEach(([label, { vec, color }]) => {
      const length = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);
      const arrow = createArrow(vec, color, length);
      scene.add(arrow);

      // Add label
      const labelSprite = createTextSprite(
        `${label} [${vec.map((v) => v.toFixed(2)).join(', ')}]`,
        color,
      );
      const labelPosition = new window.THREE.Vector3(...vec).multiplyScalar(
        1.1,
      );
      labelSprite.position.copy(labelPosition);
      scene.add(labelSprite);

      arrowGroups.push({ arrow, label: labelSprite });
    });

    // Grid helper
    const gridHelper = new window.THREE.GridHelper(3, 10, 0x888888, 0xcccccc);
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (controls && controls.dispose) {
        controls.dispose();
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();

      // Cleanup axis arrows and labels
      scene.remove(xAxisArrow);
      scene.remove(yAxisArrow);
      scene.remove(zAxisArrow);
      scene.remove(xLabel);
      scene.remove(yLabel);
      scene.remove(zLabel);
      if (xAxisArrow.dispose) xAxisArrow.dispose();
      if (yAxisArrow.dispose) yAxisArrow.dispose();
      if (zAxisArrow.dispose) zAxisArrow.dispose();
      if (xLabel.material) xLabel.material.dispose();
      if (yLabel.material) yLabel.material.dispose();
      if (zLabel.material) zLabel.material.dispose();

      arrowGroups.forEach(({ arrow, label }) => {
        scene.remove(arrow);
        scene.remove(label);
        if (arrow.dispose) arrow.dispose();
        if (label.material) label.material.dispose();
        if (label.geometry) label.geometry.dispose();
      });
    };
  }, [threeLoaded]);

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: '1140px',
        width: '100%',
        height: '600px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    />
  );
};

export default WordEmbeddingCanvas;
