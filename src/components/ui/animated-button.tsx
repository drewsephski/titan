"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { motion, useAnimation, Variants } from "framer-motion";
import { forwardRef } from "react";

type AnimatedButtonProps = ButtonProps & {
  children: React.ReactNode;
  withArrow?: boolean;
  arrowClassName?: string;
};

const arrowVariants: Variants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { type: "spring", stiffness: 500, damping: 20 } },
  tap: { scale: 0.95 },
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, withArrow = false, arrowClassName = "", className = "", ...props }, ref) => {
    const controls = useAnimation();

    return (
      <Button
        ref={ref}
        asChild
        className={`group relative overflow-hidden ${className}`}
        onMouseEnter={() => controls.start("hover")}
        onMouseLeave={() => controls.start("initial")}
        {...props}
      >
        <motion.div className="relative">
          {/* Button Content */}
          <div className="relative z-10 flex items-center">
            {children}
            {withArrow && (
              <motion.span
                className={`ml-2 inline-block ${arrowClassName}`}
                variants={arrowVariants}
                initial="initial"
                animate={controls}
              >
                →
              </motion.span>
            )}
          </div>

          {/* Hover Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* Ripple Effect */}
          <motion.span
            className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      </Button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
