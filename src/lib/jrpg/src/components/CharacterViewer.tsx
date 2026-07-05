import React, { Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import modelUrl from '../../assets/rivaiamin.glb?url';

export type CharacterAnimState = 'idle' | 'buffing' | 'attacking' | 'resting';

interface CharacterViewerProps {
  animationState: CharacterAnimState;
}

function CharacterModel({ animationState }: CharacterViewerProps) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const attackPhase = useRef(0);

  const model = useMemo(() => scene.clone(true), [scene]);

  const fitScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.2 / maxDim;
  }, [scene]);

  useLayoutEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((mat) => {
          if (mat && 'emissive' in mat) {
            const std = mat as THREE.MeshStandardMaterial;
            if (std.emissive && std.emissive.getHex() === 0x000000) {
              std.emissive = new THREE.Color('#1a1a1a');
            }
            std.emissiveIntensity = Math.max(std.emissiveIntensity ?? 0, 0.2);
            std.envMapIntensity = 1.15;
            std.needsUpdate = true;
          }
        });
      }
    });
  }, [model]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    let spin = 0.35;
    let bob = Math.sin(t * 1.2) * 0.03;
    let scale = 1;

    if (animationState === 'buffing') {
      spin = 1.4;
      scale = 1 + Math.sin(t * 10) * 0.04;
      bob = Math.sin(t * 4) * 0.05;
    } else if (animationState === 'attacking') {
      attackPhase.current += delta * 18;
      group.rotation.y += Math.sin(attackPhase.current) * 0.08;
      spin = 2.2;
      scale = 1.05;
    } else if (animationState === 'resting') {
      spin = 0.12;
      bob = Math.sin(t * 0.8) * 0.05;
    } else {
      attackPhase.current = 0;
    }

    group.rotation.y += delta * spin;
    group.position.y = bob;
    group.scale.setScalar(scale);

    const radius = 3.15;
    const camY = 1.05 + Math.sin(t * 0.35) * 0.12;
    const angle = t * 0.18;
    state.camera.position.x = Math.sin(angle) * radius * 0.35;
    state.camera.position.y = camY;
    state.camera.position.z = radius;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={fitScale} />
      </Center>
    </group>
  );
}

function SceneLights({ animationState }: CharacterViewerProps) {
  const keyRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!keyRef.current) return;
    const pulse =
      animationState === 'buffing'
        ? 1.4 + Math.sin(state.clock.elapsedTime * 8) * 0.35
        : animationState === 'attacking'
        ? 1.6
        : 1;
    keyRef.current.intensity = 2.2 * pulse;
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#f0f4ff" />
      <directionalLight position={[3, 5, 2]} intensity={1.4} color="#ffffff" />
      <pointLight ref={keyRef} position={[-1.5, 2.2, 2]} intensity={2.2} color="#ff6b5a" distance={8} />
      <pointLight position={[2, 1.5, -1]} intensity={1.1} color="#5ab0ff" distance={7} />
      <spotLight position={[0, 4, 2]} angle={0.45} penumbra={0.6} intensity={1.2} color="#fff5e6" />
    </>
  );
}

function PostFX({ animationState }: CharacterViewerProps) {
  const intensity =
    animationState === 'buffing' ? 1.35 : animationState === 'attacking' ? 1.2 : 0.85;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.45}
        mipmapBlur
        radius={0.55}
      />
    </EffectComposer>
  );
}

export const CharacterViewer: React.FC<CharacterViewerProps> = ({ animationState }) => {
  return (
    <div
      id="character-avatar-image"
      className="relative z-10 w-full h-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
        WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%)',
      }}
      aria-label="3D developer avatar"
      role="img"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.05, 3.15], fov: 32, near: 0.1, far: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <SceneLights animationState={animationState} />
          <CharacterModel animationState={animationState} />
          <PostFX animationState={animationState} />
        </Suspense>
      </Canvas>
    </div>
  );
};

useGLTF.preload(modelUrl);
