'use client';

import React, { useState, useRef } from 'react';
import { motion, MotionConfigContext, LayoutGroup } from 'framer-motion';

// Types
interface TransitionProps {
  value: typeof transition1;
  children: React.ReactNode;
}

interface Props {
  heading?: string;
  text?: string;
  variant?: 'Default' | 'Hover';
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

// Transitions
const transition1 = {
  bounce: 0.4,
  delay: 0,
  duration: 0.6,
  type: "spring" as const,
  stiffness: 100,
  damping: 15
};

// Transition wrapper component
const Transition: React.FC<TransitionProps> = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(
    () => ({ ...config, transition }),
    [config, transition]
  );

  return (
    <MotionConfigContext.Provider value={contextValue}>
      {children}
    </MotionConfigContext.Provider>
  );
};

const Variants = motion.create(React.Fragment);

export const IconHover3D: React.FC<Props> = ({
  heading = "Library",
  text = "A comprehensive collection of digital books and resources for learning and research.",
  variant = 'Default',
  className = "",
  style = {},
  width = 600,
  height = 150,
  ...restProps
}) => {
  const [currentVariant, setCurrentVariant] = useState<'Default' | 'Hover'>(variant);
  // Removed unused gesture state
  const refBinding = useRef<HTMLDivElement>(null);
  const defaultLayoutId = React.useId();

  const isHoverVariant = currentVariant === 'Hover';
  const variants = [currentVariant === 'Default' ? 'GPnJri30y' : 'zEwHlJ7zp'];

  const handleMouseEnter = async () => {
    setCurrentVariant('Hover');
  };

  const handleMouseLeave = async () => {
    setCurrentVariant('Default');
  };

  return (
    <div style={{ width, height }}>
      <LayoutGroup id={defaultLayoutId}>
        <Variants animate={variants} initial={false}>
          <Transition value={transition1}>
            <motion.div
              {...restProps}
              className={`icon-hover-3d ${className}`}
              data-framer-name="Default"
              data-highlight={true}
              ref={refBinding}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={currentVariant === 'Hover' ? handleMouseLeave : undefined}
              style={{
                backgroundColor: "var(--background)",
                display: "flex",
                flexDirection: "row",
                gap: "40px",
                height: "min-content",
                justifyContent: "center",
                padding: "20px",
                position: "relative",
                width: "min-content",
                borderRadius: "12px",
                border: "1px solid color-mix(in srgb, var(--foreground) 10%, transparent)",
                ...style
              }}
            >
              {/* Icon Container */}
              <motion.div
                className="relative z-10"
                data-framer-name="Icon"
                initial={false}
                animate={{
                  scale: isHoverVariant ? 1.1 : 1,
                  rotate: isHoverVariant ? 5 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm"
                    animate={{
                      opacity: isHoverVariant ? 1 : 0.5,
                      scale: isHoverVariant ? 1.05 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut'
                    }}
                  />
                  <motion.div
                    className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                    animate={{
                      y: isHoverVariant ? -5 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-full h-full text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M12 8v8" />
                      <path d="M8 12h8" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  height: "min-content",
                  maxWidth: "400px",
                  width: "min-content"
                }}
              >
                {/* Header with hover effect */}
                <motion.div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "32px",
                    position: "relative"
                  }}
                >
                  <motion.span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "var(--foreground)",
                      cursor: "pointer"
                    }}
                  >
                    {heading}
                  </motion.span>
                </motion.div>

                {/* Description */}
                <motion.div
                  style={{
                    fontFamily: '"Inter", "Inter Placeholder", sans-serif',
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: 1.5,
                    color: "color-mix(in srgb, var(--foreground) 70%, transparent)",
                    width: "400px"
                  }}
                >
                  {text}
                </motion.div>
              </motion.div>
            </motion.div>
          </Transition>
        </Variants>
      </LayoutGroup>
    </div>
  );
};
