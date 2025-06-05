import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element | null;
  start?: ScrollTrigger.Vars['start'];
  end?: ScrollTrigger.Vars['end'];
  scrub?: boolean | number;
  markers?: boolean;
  onEnter?: gsap.Callback;
  onLeave?: gsap.Callback;
  onEnterBack?: gsap.Callback;
  onLeaveBack?: gsap.Callback;
  once?: boolean;
  toggleActions?: string;
  animation: gsap.core.Timeline | gsap.core.Tween | gsap.TweenVars;
}

export function useScrollAnimation({
  trigger,
  start = 'top 80%',
  end = 'top 20%',
  scrub = false,
  markers = false,
  onEnter,
  onLeave,
  onEnterBack,
  onLeaveBack,
  once = true,
  toggleActions = 'play none none none',
  animation,
}: ScrollAnimationOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = trigger ? (typeof trigger === 'string' ? document.querySelector(trigger) : trigger) : elementRef.current;
    if (!element) return;

    // Create the animation
    if (gsap.core.Animation && !(animation instanceof gsap.core.Animation)) {
      if ('targets' in animation) {
        animationRef.current = gsap.to(element, {
          ...animation,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
            markers,
            toggleActions: once ? 'play none none none' : toggleActions,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
            onUpdate: (self) => {
              if (scrub && animationRef.current && 'progress' in animationRef.current) {
                animationRef.current.progress(self.progress);
              }
            },
          },
        });
      } else if ('fromTo' in animation) {
        animationRef.current = gsap.fromTo(
          element,
          animation.from,
          {
            ...animation.to,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
              markers,
              toggleActions: once ? 'play none none none' : toggleActions,
              onEnter,
              onLeave,
              onEnterBack,
              onLeaveBack,
              onUpdate: (self) => {
                if (scrub && animationRef.current && 'progress' in animationRef.current) {
                  animationRef.current.progress(self.progress);
                }
              },
            },
          }
        );
      } else if ('timeline' in animation) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start,
            end,
            scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
            markers,
            toggleActions: once ? 'play none none none' : toggleActions,
            onEnter,
            onLeave,
            onEnterBack,
            onLeaveBack,
          },
        });

        animation.timeline(tl);
        animationRef.current = tl;
      }
    }

    return () => {
      if (animationRef.current) {
        if ('scrollTrigger' in animationRef.current) {
          animationRef.current.scrollTrigger?.kill();
        }
        animationRef.current.kill();
      }
    };
  }, [trigger, start, end, scrub, markers, onEnter, onLeave, onEnterBack, onLeaveBack, once, toggleActions, animation]);

  return elementRef;
}

type UseScrollTriggerOptions = Omit<ScrollAnimationOptions, 'animation'>;

export function useScrollTrigger(options: UseScrollTriggerOptions) {
  return useScrollAnimation({
    ...options,
    animation: { targets: {} }, // Empty animation
  });
}

type UseParallaxOptions = {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  trigger?: string | Element | null;
  start?: string | number | ScrollTrigger.Vars['start'];
  end?: string | number | ScrollTrigger.Vars['end'];
};

export function useParallax({
  speed = 0.2,
  direction = 'vertical',
  trigger,
  start = 'top bottom',
  end = 'bottom top',
}: UseParallaxOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const element = trigger ? (typeof trigger === 'string' ? document.querySelector(trigger) : trigger) : elementRef.current;
    if (!element) return;

    const property = direction === 'vertical' ? 'y' : 'x';
    const value = direction === 'vertical' ? 100 * speed : 100 * speed;

    animationRef.current = gsap.to(element, {
      [property]: value,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      if (animationRef.current) {
        if ('scrollTrigger' in animationRef.current) {
          animationRef.current.scrollTrigger?.kill();
        }
        animationRef.current.kill();
      }
    };
  }, [trigger, speed, direction, start, end]);

  return elementRef;
}
