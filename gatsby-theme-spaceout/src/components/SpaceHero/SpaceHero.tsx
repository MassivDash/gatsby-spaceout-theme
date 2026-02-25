import React, { FC, useState, useEffect, useRef } from 'react';
import logo from './logo.png';
import { useColorMode } from 'theme-ui';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Theme } from 'src/gatsby-plugin-theme-ui';
import mediaqueries from '@styles/media';
import * as THREE from 'three';
import OrbitControls from './three/orbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import lambdaShuttleGlb from './LambdaShuttle.glb';
import imperialStarGlb from './imperialStar.glb';
import tieGlb from './tie.glb';
import snowspeaderGlb from './snowspeader.glb';

/** Per-model settings for hero 3D scene. Add entries here to support more models. */
export interface HeroModelConfig {
  id: string;
  /** Bundled GLB URL (from static import) */
  url: string;
  scale: number;
  /** Model position offset [x, y, z]. Negative x = left. */
  modelPosition?: [number, number, number];
  /** Camera distance on Z axis */
  cameraDistance: number;
  /** Camera height (positive = more from top). */
  cameraY?: number;
  /** Camera horizontal offset (negative = camera more to the left). */
  cameraX?: number;
  /** Ambient light: color (hex) and intensity */
  ambient: { color: number; intensity: number };
  /** Directional light: position [x,y,z] and intensity */
  directional: {
    position: [number, number, number];
    intensity: number;
    color?: number;
  };
  /** OrbitControls min zoom distance */
  minDistance: number;
}

const HERO_MODELS: HeroModelConfig[] = [
  {
    id: 'lambdaShuttle',
    url: lambdaShuttleGlb,
    scale: 0.1,
    cameraDistance: 2.2,
    cameraY: 0,
    ambient: { color: 0xffffff, intensity: 0.5 },
    directional: { position: [5, 5, 5], intensity: 2 },
    minDistance: 1.2,
  },
  {
    id: 'imperialStar',
    url: imperialStarGlb,
    scale: 0.1,
    modelPosition: [-0.55, 0, 0],
    cameraDistance: 80.5,
    cameraY: 15,
    cameraX: -9,
    ambient: { color: 0xffffff, intensity: 0.6 },
    directional: { position: [5, 5, 5], intensity: 2.2 },
    minDistance: 30.2,
  },
  {
    id: 'tie',
    url: tieGlb,
    scale: 1,
    modelPosition: [0, 0, 0],
    cameraDistance: 1.5,
    cameraY: 0.5,
    cameraX: 0,
    ambient: { color: 0xffffff, intensity: 0.6 },
    directional: { position: [5, 5, 5], intensity: 2.2 },
    minDistance: 1.2,
  },
  {
    id: 'snowspeader',
    url: snowspeaderGlb,
    scale: 0.01,
    modelPosition: [0, 0, 0],
    cameraDistance: 50.5,
    cameraY: 15.5,
    cameraX: 0,
    ambient: { color: 0xffffff, intensity: 0.6 },
    directional: { position: [5, 5, 5], intensity: 2.2 },
    minDistance: 1.2,
  },
];

function pickRandomModel(): HeroModelConfig {
  return HERO_MODELS[Math.floor(Math.random() * HERO_MODELS.length)];
}

function MyThree() {
  const refContainer = useRef(null);
  const [colorMode] = useColorMode();
  const [initialized, setInitialised] = useState(false);
  const isDark = colorMode === `dark`;
  const OrControls = OrbitControls(THREE);

  useEffect(() => {
    if (initialized) {
      (refContainer?.current as unknown as HTMLElement)?.removeChild(
        (refContainer?.current as unknown as HTMLElement).childNodes[0],
      );
    }

    try {
      const modelConfig = pickRandomModel();
      const objects: THREE.Object3D[] = [];
      let model: THREE.Group | null = null;
      let lightFadeProgress = 0;
      const FADE_DURATION = 0.9;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(isDark ? 0x111216 : 0xfafafa);
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      (refContainer.current as unknown as HTMLElement) &&
        (refContainer.current as unknown as HTMLElement).appendChild(
          renderer.domElement,
        );

      const { ambient, directional } = modelConfig;
      const ambientLight = new THREE.AmbientLight(ambient.color, 0);
      const directionalLight = new THREE.DirectionalLight(
        directional.color ?? 0xffffff,
        0,
      );
      directionalLight.position.set(...directional.position);
      scene.add(ambientLight);
      scene.add(directionalLight);

      camera.position.z = modelConfig.cameraDistance;
      camera.position.y = modelConfig.cameraY ?? 0;
      camera.position.x = modelConfig.cameraX ?? 0;

      const loader = new GLTFLoader();
      loader.load(
        modelConfig.url,
        (gltf) => {
          model = gltf.scene;
          model.scale.setScalar(modelConfig.scale);
          const pos = modelConfig.modelPosition;
          if (pos) {
            model.position.set(pos[0], pos[1], pos[2]);
          }
          lightFadeProgress = 0;
          scene.add(model);
          objects.push(model);
        },
        undefined,
        (err) => console.error('Hero GLB load error:', err),
      );

      const render = () => {
        renderer.render(scene, camera);
      };

      let lastTime = performance.now() / 1000;
      let reqId: number;
      const animate = function () {
        reqId = requestAnimationFrame(animate);
        const now = performance.now() / 1000;
        const dt = now - lastTime;
        lastTime = now;
        if (model) {
          model.rotation.y += 0.001;
          if (lightFadeProgress < 1) {
            lightFadeProgress = Math.min(
              1,
              lightFadeProgress + dt / FADE_DURATION,
            );
            const t = lightFadeProgress;
            ambientLight.intensity = modelConfig.ambient.intensity * t;
            directionalLight.intensity = modelConfig.directional.intensity * t;
          }
        }
        render();
      };
      animate();

      const controls = new OrControls(camera, renderer.domElement);
      controls.minDistance = modelConfig.minDistance;

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        render();
      };
      window.addEventListener('resize', onWindowResize, false);
      onWindowResize();

      setInitialised(true);

      return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('resize', onWindowResize, false);
        renderer.dispose();
      };
    } catch (e) {
      console.warn('WebGL setup failed, falling back:', e);
      return undefined;
    }
  }, [isDark]);
  return <div ref={refContainer}></div>;
}

const SpaceHero: FC = () => {
  return (
    <Hero>
      <ThreeContainer>
        <MyThree />
      </ThreeContainer>
      <SpaceoutBox>
        <City src={logo} alt="" />
        <AnimatedSpace>
          <svg
            onClick={() =>
              document
                .getElementById('Articles')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <title>{'spaceout.pl'}</title>
            <text fontFamily="Paytone one" fillRule="evenodd">
              <tspan x={3} y={109}>
                {[...'spaceout'].map((letter) => (
                  <tspan key={letter + Math.random()}>{letter}</tspan>
                ))}
              </tspan>
            </text>
          </svg>
        </AnimatedSpace>

        <AnimatedStellar>
          <svg
            onClick={() =>
              document
                .getElementById('Articles')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <title>{'spaceout.pl'}</title>
            <text fontFamily="Satisfy" fillRule="evenodd">
              <tspan x={3} y={109}>
                {[...'beyond excelsior'].map((letter) => (
                  <tspan key={letter + Math.random()}>{letter}</tspan>
                ))}
              </tspan>
            </text>
          </svg>
        </AnimatedStellar>
      </SpaceoutBox>
    </Hero>
  );
};

const Hero = styled.div`
  overflow: hidden;
  background-color: transparent;
  min-height: 90vh;
  height: 900px;
  margin-top: 40px;
  min-width: 67vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;

  ${mediaqueries.desktop`
    margin: 40px 0 0 10px;
    
    `}
`;

const animationDelayTime = 300;

const draw = keyframes`
	0% {
    opacity: 0
    fill-opacity: 0;
    z-index: 5;
	}
	90% {
		opacity: 0.7;
    fill-opacity: 0.7;
    z-index: 5;
	}

	100% {
    opacity: 1;
		stroke-dashoffset: 0;
		fill-opacity: 1;
    z-index: 5;
	}
`;

const moveCity = keyframes`
	0% {
		z-index: 5;
    transform: translate(134px, -83px)
    	}

  25% {
    z-index: 5;
    transform: translate(139px, -53px)
  }

	50% {
		z-index: 0;
    transform: translate(134px, -83px)
	}

  75% {
    z-index: 0;
    transform: translate(129px, -53px)
  }

	100% {
		z-index: 0;
    transform: translate(134px, -83px)
	}
`;

const AnimatedSpace = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 5;
  left: 10vw;
  width: 100%;
  opacity: 0.8;
  min-height: 300px;
  svg {
    width: 100%;
    height: auto;

    stroke: none;
    fill: ${(p) => p.theme.colors.primary};
    stroke-width: 4;
    tspan > tspan {
      stroke-dasharray: 1500;
      stroke-dashoffset: -1500;
      opacity: 0;
      font-size: 160px;
      &:nth-of-type(1) {
        animation: ${draw} 600ms ${1 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(2) {
        animation: ${draw} 600ms ${2 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(3) {
        animation: ${draw} 600ms ${3 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(4) {
        animation: ${draw} 600ms ${4 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(5) {
        animation: ${draw} 600ms ${5 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(6) {
        animation: ${draw} 600ms ${6 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(7) {
        animation: ${draw} 600ms ${7 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(8) {
        animation: ${draw} 600ms ${8 * animationDelayTime}ms forwards;
      }
    }
  }

  @media (max-width: 767px) {
    transform: rotate(90deg) scale(0.8);
    left: -90vw;
    top: -10vh;
    width: 800px;
    height: 100%;
  }
`;

const AnimatedStellar = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 30%;
  z-index: 5;
  margin-top: 100px;
  width: 100%;
  min-height: 300px;
  @media (max-width: 767px) {
    top: -130px;
  }
  svg {
    width: 100%;
    height: auto;
    stroke: ${(p) => p.theme.colors.grey};
    fill: ${(p) => p.theme.colors.grey};
    stroke-width: 2;
    tspan > tspan {
      stroke-dasharray: 1500;
      stroke-dashoffset: -1500;
      opacity: 0;
      font-size: 67px;
      font-weight: normal;

      @media (max-width: 767px) {
        font-size: 34px;
        top: -130px;
      }

      &:nth-of-type(1) {
        animation: ${draw} 600ms ${8 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(2) {
        animation: ${draw} 600ms ${9 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(3) {
        animation: ${draw} 600ms ${10 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(4) {
        animation: ${draw} 600ms ${11 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(5) {
        animation: ${draw} 600ms ${12 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(6) {
        animation: ${draw} 600ms ${13 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(7) {
        animation: ${draw} 600ms ${14 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(8) {
        animation: ${draw} 600ms ${15 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(9) {
        animation: ${draw} 600ms ${16 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(10) {
        animation: ${draw} 600ms ${17 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(11) {
        animation: ${draw} 600ms ${18 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(12) {
        animation: ${draw} 600ms ${19 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(13) {
        animation: ${draw} 600ms ${20 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(14) {
        animation: ${draw} 600ms ${21 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(15) {
        animation: ${draw} 600ms ${22 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(16) {
        animation: ${draw} 600ms ${23 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(17) {
        animation: ${draw} 600ms ${24 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(18) {
        animation: ${draw} 600ms ${25 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(19) {
        animation: ${draw} 600ms ${26 * animationDelayTime}ms forwards;
      }
      &:nth-of-type(20) {
        animation: ${draw} 600ms ${27 * animationDelayTime}ms forwards;
      }
    }
  }
`;

const SpaceoutBox = styled.div`
  display: flex;
  z-index: 4;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  transition: 0.8s ease-out;
  ${mediaqueries.phone`
   margin-left: 20px;
   margin-top: 0px;
  `}
`;

const City = styled.img`
  align-self: flex-start;
  position: absolute;
  left: 0;
  animation: ${moveCity} 38s linear infinite;
  @media (max-width: 767px) {
    left: -40px;
    top: 100px;
  }
`;

const ThreeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export default SpaceHero;
