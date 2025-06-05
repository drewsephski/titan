"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type ThreeDCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  hoverEffect?: 'distort' | 'float' | 'rotate';
  intensity?: number;
  speed?: number;
  color?: string;
};

function Box({
  hoverEffect = 'float',
  intensity = 0.5,
  speed = 1,
  color = '#4f46e5',
}: {
  hoverEffect: 'distort' | 'float' | 'rotate';
  intensity: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    if (hoverEffect === 'float') {
      meshRef.current.rotation.x = Math.sin(time * 0.5 * speed) * 0.1 * intensity;
      meshRef.current.rotation.y = Math.cos(time * 0.3 * speed) * 0.1 * intensity;
      meshRef.current.position.y = Math.sin(time * 0.7 * speed) * 0.1 * intensity;
    } else if (hoverEffect === 'rotate') {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
    }

    if (hovered) {
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        Math.sin(time * 2) * 0.1 * intensity,
        0.1
      );
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      scale={active ? 1.1 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <boxGeometry args={[2, 2, 2]} />
      {hoverEffect === 'distort' ? (
        <MeshDistortMaterial
          color={color}
          roughness={0.5}
          metalness={0.5}
          distort={hovered ? intensity : 0}
          speed={speed}
        />
      ) : (
        <meshStandardMaterial
          color={hovered ? color : '#3b82f6'}
          roughness={0.5}
          metalness={0.5}
        />
      )}
    </motion.mesh>
  );
}

export function ThreeDCard({
  title,
  description,
  icon,
  className = '',
  hoverEffect = 'float',
  intensity = 0.5,
  speed = 1,
  color = '#4f46e5',
}: ThreeDCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      className={`relative group/card rounded-2xl p-6 bg-card border border-border overflow-hidden ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Background Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
      
      {/* 3D Element */}
      <div className="w-full h-48 mb-6 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Box 
            hoverEffect={hoverEffect} 
            intensity={intensity} 
            speed={speed} 
            color={color} 
          />
          <Environment preset="city" />
          {hoverEffect === 'rotate' && <OrbitControls enableZoom={false} enablePan={false} />}
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        {/* Animated Arrow */}
        <motion.div 
          className="absolute bottom-4 right-4 text-primary"
          animate={{
            x: isHovered ? 4 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 20,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
