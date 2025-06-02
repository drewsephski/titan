'use client';

import Particles from '@/components/ui/particles/particles';

export function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        particleCount={150}
        particleSpread={15}
        speed={0.2}
        particleColors={['#ffffff', '#e0e0e0', '#c0c0c0']}
        moveParticlesOnHover={true}
        particleHoverFactor={1.5}
        alphaParticles={true}
        particleBaseSize={80}
        sizeRandomness={0.8}
        cameraDistance={25}
        disableRotation={false}
        className="w-full h-full opacity-20 dark:opacity-10"
      />
    </div>
  );
}
