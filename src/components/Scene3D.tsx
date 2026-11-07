import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  Sparkles,
  RoundedBox,
} from '@react-three/drei';
import * as THREE from 'three';

/* ── 3D "</>" logo drawn locally so the symbol always stays exact ── */
function CodeLogo() {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 500;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '900 260px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.shadowColor = '#f16e4c';
    context.shadowBlur = 22;
    context.fillStyle = '#f16e4c';
    context.fillText('</>', canvas.width / 2, canvas.height / 2 + 12);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
    ref.current.position.y = 1.75 + Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={ref}>
        <RoundedBox args={[2.9, 1.45, 0.22]} radius={0.12} smoothness={5} position={[0, 0, -0.12]}>
          <meshStandardMaterial color="#24292b" roughness={0.2} metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[2.74, 1.28]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </group>
    </Float>
  );
}

/* ── 3D laptop / computer ── */
function Laptop3D() {
  const screenRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!screenRef.current) return;
    screenRef.current.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 0.4) * 0.04;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={[0, -1.3, 0]} scale={1.08}>
        {/* Screen */}
        <group ref={screenRef} position={[0, 0.6, 0]} rotation={[-0.35, 0, 0]}>
          <RoundedBox args={[3.8, 2.3, 0.16]} radius={0.1} smoothness={5}>
            <meshStandardMaterial color="#2a2d2f" roughness={0.3} metalness={0.7} />
          </RoundedBox>
          {/* Screen display */}
          <mesh position={[0, 0, 0.07]}>
            <planeGeometry args={[3.55, 2.05]} />
            <meshStandardMaterial
              color="#0d0e10"
              emissive="#f16e4c"
              emissiveIntensity={0.12}
              roughness={0.1}
              metalness={0.2}
            />
          </mesh>
          {/* Code lines on screen */}
          <mesh position={[-1.1, 0.58, 0.08]}>
            <planeGeometry args={[1.3, 0.08]} />
            <meshBasicMaterial color="#77b7d3" />
          </mesh>
          <mesh position={[-0.85, 0.34, 0.08]}>
            <planeGeometry args={[2.0, 0.08]} />
            <meshBasicMaterial color="#a7c99b" />
          </mesh>
          <mesh position={[-1.0, 0.10, 0.08]}>
            <planeGeometry args={[1.7, 0.08]} />
            <meshBasicMaterial color="#f5f0e8" opacity={0.7} transparent />
          </mesh>
          <mesh position={[-0.72, -0.14, 0.08]}>
            <planeGeometry args={[2.35, 0.08]} />
            <meshBasicMaterial color="#f16e4c" />
          </mesh>
          <mesh position={[-1.1, -0.38, 0.08]}>
            <planeGeometry args={[1.35, 0.08]} />
            <meshBasicMaterial color="#77b7d3" />
          </mesh>
          <mesh position={[-0.88, -0.62, 0.08]}>
            <planeGeometry args={[1.9, 0.08]} />
            <meshBasicMaterial color="#a7c99b" />
          </mesh>
        </group>
        {/* Base / keyboard deck */}
        <mesh ref={baseRef} position={[0, -0.15, 0.3]}>
          <boxGeometry args={[4.2, 0.1, 2.6]} />
          <meshStandardMaterial color="#3a3d3f" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, -0.09, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.15, 0.68]} />
          <meshStandardMaterial color="#1a1c1e" roughness={0.5} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function FloatingCode({
  position,
  code,
  color = '#a7c99b',
  scale = 1,
}: {
  position: [number, number, number];
  code: string;
  color?: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 180;
    const context = canvas.getContext('2d');
    if (!context) return new THREE.CanvasTexture(canvas);
    context.fillStyle = '#111619';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#3b4649';
    context.lineWidth = 5;
    context.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
    context.font = 'bold 42px monospace';
    context.fillStyle = color;
    context.fillText(code, 38, 112);
    return new THREE.CanvasTexture(canvas);
  }, [code, color]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45 + position[0]) * 0.12;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.12;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.15} floatIntensity={0.25}>
      <group ref={ref} position={position} scale={scale}>
        <mesh>
          <planeGeometry args={[2.9, 0.58]} />
          <meshBasicMaterial map={texture} transparent />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Floating code symbols made from simple 3D bars ── */
function FloatingBracket({
  position,
  scale = 1,
  color = '#77b7d3',
  speed = 1.5,
  char = '{',
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  char?: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={1.0}>
      <group ref={ref} position={position} scale={scale}>
        {char === ';' ? (
          <>
            <mesh position={[0, 0.3, 0]}><sphereGeometry args={[0.12, 16, 16]} /><meshStandardMaterial color={color} roughness={0.2} metalness={0.8} /></mesh>
            <mesh position={[0, -0.25, 0]} rotation={[0, 0, 0.25]}><boxGeometry args={[0.16, 0.75, 0.18]} /><meshStandardMaterial color={color} roughness={0.2} metalness={0.8} /></mesh>
          </>
        ) : (
          <mesh rotation={[0, 0, char === '}' ? -0.55 : 0.55]}>
            <boxGeometry args={[0.16, 1.2, 0.22]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
          </mesh>
        )}
      </group>
    </Float>
  );
}

/* ── Particle starfield ── */
function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    ref.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1500}
          array={points}
          itemSize={3}
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#f5f0e8" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#77b7d3" />
      <spotLight position={[0, 4, 3]} intensity={0.6} angle={0.5} penumbra={0.5} color="#f16e4c" />

      {/* Central 3D "</>" logo */}
      <CodeLogo />

      {/* 3D laptop below the logo */}
      <Laptop3D />

      {/* Floating readable code */}
      <FloatingCode position={[-4.35, 1.15, -1.2]} scale={0.78} color="#77b7d3" code="C" />
      <FloatingCode position={[4.3, 0.75, -1.4]} scale={0.78} color="#a7c99b" code="PYTHON" />
      <FloatingCode position={[4.1, -2.15, -1.5]} scale={0.78} color="#f16e4c" code="JAVA" />
      <FloatingCode position={[-4.0, -2.15, -1.1]} scale={0.64} color="#f5f0e8" code={'printf("HELLO WORLD");'} />

      {/* Floating code brackets and symbols */}
      <FloatingBracket position={[-5.0, 2.55, -1]} scale={0.55} color="#77b7d3" speed={1.2} char="{" />
      <FloatingBracket position={[5.0, 2.15, -0.5]} scale={0.52} color="#a7c99b" speed={1.8} char="}" />
      <FloatingBracket position={[5.0, -2.8, -2]} scale={0.45} color="#f16e4c" speed={1.5} char=";" />
      <FloatingBracket position={[-5.0, -2.8, -1.5]} scale={0.5} color="#f5f0e8" speed={1.6} char="/" />

      <ParticleField />

      <Sparkles count={60} scale={12} size={2} speed={0.3} color="#f16e4c" opacity={0.4} />

      <Environment preset="city" />
    </Canvas>
  );
}
