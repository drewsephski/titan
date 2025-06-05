"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkle } from 'lucide-react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// 3D Model Component
function Model() {
  const { scene } = useGLTF('/models/hero-model.glb');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return <primitive object={scene} ref={meshRef} scale={0.8} />;
}

// Floating Elements
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  className = ''
}) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface AnimatedHeroProps {
  title?: string;
  subtitle?: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  show3DModel?: boolean;
}

export function AnimatedHero({
  title = "Build Better Products",
  subtitle = "Accelerate your development with our all-in-one platform. Build, deploy, and scale your applications faster than ever.",
  primaryAction = {
    text: "Get Started",
    href: "#"
  },
  secondaryAction,
  show3DModel = true
}: AnimatedHeroProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title characters
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('span');
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: 'back.out(1.7)',
      });
    }

    // Parallax effect
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: 50,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </div>

      {/* 3D Model - Conditionally rendered */}
      {show3DModel && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full hidden lg:block">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Model />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-2xl">
          <FloatingElement delay={0.2}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Sparkle className="w-4 h-4 mr-2" />
              Documentation
            </span>
          </FloatingElement>

          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mt-6 mb-8"
          >
            {title.split('').map((char, i) => (
              <span key={i} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <FloatingElement delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              {subtitle}
            </p>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryAction && (
                <Button asChild size="lg" className="group">
                  <a href={primaryAction.href}>
                    {primaryAction.text}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
              {secondaryAction && (
                <Button asChild variant="outline" size="lg">
                  <a href={secondaryAction.href} className="flex items-center">
                    {secondaryAction.text}
                    {secondaryAction.icon}
                  </a>
                </Button>
              )}
            </div>
          </FloatingElement>
        </div>
      </div>

      {/* ... rest of the component remains the same ... */}
    </div>
  );
}
