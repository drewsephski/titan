'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function BackgroundBeams({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      // Calculate the position as a percentage
      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;
      
      // Update the animation controls
      controls.start({
        backgroundPosition: `${xPercent}% ${yPercent}%`,
        transition: { type: 'spring', damping: 30, stiffness: 300 }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  return (
    <motion.div
      ref={containerRef}
      className={`absolute inset-0 -z-10 h-full w-full overflow-hidden bg-neutral-950 ${className}`}
      initial={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(39, 39, 42, 0.1) 0%, rgba(39, 39, 42, 0) 100%)',
      }}
      animate={controls}
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_110%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/0 to-zinc-900" />
    </motion.div>
  );
}
