import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSphere = ({ count = 200 }) => {
  const mesh = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25
        ),
        scale: Math.random() * 0.4 + 0.1,
        color: new THREE.Color(
          `hsl(${Math.random() * 360}, 70%, 60%)`
        ),
        speed: Math.random() * 0.002 + 0.0005,
        floatOffset: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, [count]);

  // Animate particles
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001; // slow rotation
      mesh.current.position.x += (mouse.x * 3 - mesh.current.position.x) * 0.05; //  parallax
      mesh.current.position.y += (mouse.y * 3 - mesh.current.position.y) * 0.05;

      mesh.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 1 + particles[i].floatOffset) * 0.002;
        child.rotation.x += particles[i].speed;
        child.rotation.y += particles[i].speed;
      });
    }
  });

  return (
    <group ref={mesh}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.scale, 32, 32]} />
          <meshStandardMaterial
            color={p.color}
            metalness={0.6}
            roughness={0.2}
            emissive={p.color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default ParticleSphere;
