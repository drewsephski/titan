"use client";

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type ScrollAnimateProps = {
  children: ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
  toggleActions?: string;
};

export function ScrollAnimate({
  children,
  className,
  from = { y: 50, opacity: 0 },
  to = { y: 0, opacity: 1 },
  start = 'top 85%',
  end = 'top 20%',
  scrub = false,
  markers = false,
  once = true,
  toggleActions = 'play none none none',
}: ScrollAnimateProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animation = gsap.fromTo(
      element,
      { ...from, opacity: from.opacity ?? 0 },
      {
        ...to,
        opacity: to.opacity ?? 1,
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
          markers,
          toggleActions: once ? 'play none none none' : toggleActions,
          onEnter: () => {
            if (once) {
              gsap.to(element, { clearProps: 'all' });
            }
          },
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [from, to, start, end, scrub, markers, once, toggleActions]);

  return (
    <div ref={elementRef} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

type ScrollRevealProps = Omit<ScrollAnimateProps, 'from' | 'to'> & {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
};

export function ScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  delay = 0,
  ...props
}: ScrollRevealProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <ScrollAnimate
      from={{ ...directionMap[direction], opacity: 0 }}
      to={{ x: 0, y: 0, opacity: 1 }}
      {...props}
    >
      {children}
    </ScrollAnimate>
  );
}

type ScrollFadeInProps = Omit<ScrollAnimateProps, 'from' | 'to'> & {
  delay?: number;
};

export function ScrollFadeIn({ children, delay = 0, ...props }: ScrollFadeInProps) {
  return (
    <ScrollAnimate
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      start={`top ${85 + (delay * 5)}%`}
      {...props}
    >
      {children}
    </ScrollAnimate>
  );
}

type ScrollScaleInProps = Omit<ScrollAnimateProps, 'from' | 'to'> & {
  scale?: number;
  delay?: number;
};

export function ScrollScaleIn({
  children,
  scale = 0.9,
  delay = 0,
  ...props
}: ScrollScaleInProps) {
  return (
    <ScrollAnimate
      from={{ scale, opacity: 0 }}
      to={{ scale: 1, opacity: 1 }}
      start={`top ${85 + (delay * 5)}%`}
      {...props}
    >
      {children}
    </ScrollAnimate>
  );
}
