"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "./Chrome";

type Palette = { core: string; emissive: string; wire: string; wireOpacity: number; ringA: string; ringB: string; points: string; sparkle: string };
const PALETTES: Record<"light" | "dark", Palette> = {
  dark: { core: "#4338ca", emissive: "#1e1b4b", wire: "#22d3ee", wireOpacity: 0.28, ringA: "#a78bfa", ringB: "#60a5fa", points: "#c7d2fe", sparkle: "#67e8f9" },
  light: { core: "#6366f1", emissive: "#312e81", wire: "#0891b2", wireOpacity: 0.45, ringA: "#7c3aed", ringB: "#2563eb", points: "#6366f1", sparkle: "#0891b2" },
};

/** Glowing distorted core with a wireframe shell — the "knowledge core". */
function Core({ calm, pal }: { calm: boolean; pal: Palette }) {
  const shell = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, dt) => {
    if (!group.current || !shell.current) return;
    shell.current.rotation.y += dt * 0.12;
    shell.current.rotation.x += dt * 0.05;
    // ease toward the pointer for a subtle parallax tilt
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.45, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.3, 3, dt);
  });

  return (
    <group ref={group}>
      <Float speed={calm ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.25, 24]} />
          <MeshDistortMaterial
            color={pal.core}
            emissive={pal.emissive}
            emissiveIntensity={0.6}
            roughness={0.22}
            metalness={0.35}
            distort={calm ? 0 : 0.38}
            speed={1.6}
          />
        </mesh>
        <mesh ref={shell} scale={1.62}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={pal.wire} wireframe transparent opacity={pal.wireOpacity} />
        </mesh>
      </Float>
      <Rings calm={calm} pal={pal} />
    </group>
  );
}

function Rings({ calm, pal }: { calm: boolean; pal: Palette }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (calm) return;
    if (a.current) a.current.rotation.z += dt * 0.25;
    if (b.current) b.current.rotation.z -= dt * 0.18;
  });
  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 160]} />
        <meshBasicMaterial color={pal.ringA} transparent opacity={0.7} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.5, 0.4]}>
        <torusGeometry args={[2.85, 0.008, 16, 160]} />
        <meshBasicMaterial color={pal.ringB} transparent opacity={0.5} />
      </mesh>
    </>
  );
}

/** Particle field that slowly drifts and leans away from the pointer. */
function Field({ count, calm, color }: { count: number; calm: boolean; color: string }) {
  const points = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 5;
      const t = Math.random() * Math.PI * 2;
      const u = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(u) * Math.cos(t);
      p[i * 3 + 1] = r * Math.sin(u) * Math.sin(t) * 0.6;
      p[i * 3 + 2] = r * Math.cos(u) - 2;
    }
    return p;
  }, [count]);

  useFrame((_, dt) => {
    if (!points.current) return;
    if (!calm) points.current.rotation.y += dt * 0.02;
    points.current.position.x = THREE.MathUtils.damp(points.current.position.x, -pointer.x * 0.4, 2, dt);
    points.current.position.y = THREE.MathUtils.damp(points.current.position.y, -pointer.y * 0.25, 2, dt);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={color} transparent opacity={0.75} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/** Keeps the core to the right of the headline on wide screens and above it on narrow ones. */
function Placement({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const wide = viewport.aspect > 1.15;
  const x = wide ? viewport.width * 0.27 : 0;
  const y = wide ? 0 : viewport.height * 0.24;
  const s = wide ? Math.min(1, viewport.width / 10.5) : Math.min(0.72, viewport.width / 6.5);
  return (
    <group position={[x, y, 0]} scale={s}>
      {children}
    </group>
  );
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [calm, setCalm] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pal = PALETTES[useTheme()];

  useEffect(() => {
    setCalm(matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMobile(matchMedia("(max-width: 768px)").matches);
    // Stop rendering when the hero scrolls out of view to save battery/GPU.
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={visible && !calm ? "always" : "demand"}
        dpr={[1, mobile ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} color="#e0f2fe" />
        <pointLight position={[5, 2, 3]} intensity={60} color="#22d3ee" />
        <pointLight position={[-2, -3, 3]} intensity={45} color="#c084fc" />
        <Placement>
          <Core calm={calm} pal={pal} />
        </Placement>
        <Field count={mobile ? 700 : 1600} calm={calm} color={pal.points} />
        {!calm && <Sparkles count={mobile ? 30 : 60} scale={[12, 6, 4]} size={2.2} speed={0.35} color={pal.sparkle} opacity={0.6} />}
      </Canvas>
    </div>
  );
}
