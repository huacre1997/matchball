import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Text3D, Center } from "@react-three/drei";
import HeartBubble from "./HeartBubble";

interface LetterProps {
  font?: string;
  text: string;
}

export default function Letter({
  font = "/Inter_Medium_Regular.json",
  text,
  ...props
}: LetterProps) {
  const ref = useRef<THREE.Group>(null);

  const orbitRadius = 3; // Radio de la órbita
  const orbitSpeed = 0.8; // Velocidad de la órbita

  // Usamos un array de refs para las burbujas
  const bubbleRefs = useRef<THREE.Group[]>([]);

  // Definir fases y velocidades
  const bubbles = Array.from({ length: 4 }).map((_, i) => ({
    phaseOffset: (i * Math.PI * 2) / 4, // Distribuir órbitas en 360°
    selfRotationSpeed: Math.random() * 1 + 0.5, // Velocidad de rotación propia
  }));

  // Inicializar refs
  useEffect(() => {
    bubbleRefs.current = bubbleRefs.current.slice(0, bubbles.length);
  }, [bubbles.length]);
  const HeartBubbleMemo = React.memo(HeartBubble);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * orbitSpeed;

    // Movimiento del texto 3D
    ref.current.position.y = Math.sin(t * 1.5) * 0.3;
    ref.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    ref.current.rotation.y = Math.sin(t * 0.8) * 0.4;

    // Movimiento de las burbujas en una órbita esférica y rotación propia
    bubbles.forEach(({ phaseOffset, selfRotationSpeed }, i) => {
      const bubble = bubbleRefs.current[i];
      if (!bubble) return;

      const angle = t + phaseOffset; // Ángulo de la órbita

      // Posición en una órbita esférica
      const x = orbitRadius * Math.cos(angle);
      const y = orbitRadius * Math.sin(angle * 1.2); // Variación en Y para hacerlo más esférico
      const z = orbitRadius * Math.sin(angle);

      bubble.position.set(x, y, z);

      // Rotación sobre su propio eje
      bubble.rotation.x += delta * selfRotationSpeed;
      bubble.rotation.y += delta * selfRotationSpeed;
      bubble.rotation.z += delta * selfRotationSpeed;
    });
  });

  return (
    <group>
      <Center {...props} ref={ref}>
        <Text3D
          castShadow
          bevelEnabled
          font={font}
          scale={7}
          letterSpacing={-0.03}
          height={0.25}
          bevelSize={0.01}
          bevelSegments={110}
          curveSegments={128}
          bevelThickness={0.01}
        >
          {text}
          <meshStandardMaterial color={"rgba(140,140,140)"} />
        </Text3D>
      </Center>

      {/* Renderizar burbujas con movimiento esférico y rotación propia */}
      {bubbles.map((_, i) => (
        <HeartBubbleMemo
          key={i}
          ref={(el) => (bubbleRefs.current[i] = el!)}
          position={[0, 0, 0]}
        />
      ))}
    </group>
  );
}
