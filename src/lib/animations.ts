import { Variants } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer = (staggerChildren: number = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
});

export const textVariant = (delay: number = 0) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', delay: number = 0) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    opacity: 0,
  },
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      delay,
    },
  },
});

export const scaleIn = (scale: number = 0.9, delay: number = 0) => ({
  hidden: {
    scale,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      delay,
    },
  },
});

export const hoverEffect = {
  scale: 1.02,
  transition: { type: 'spring', stiffness: 300, damping: 15 },
};

export const tapEffect = {
  scale: 0.98,
};

export const transition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};

// For use with useInView from framer-motion
export const viewport = {
  once: true,
  margin: '0px 0px -100px 0px',
};

// For staggered children animations
export const staggerChildren = (delay: number = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
});
