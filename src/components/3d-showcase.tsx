"use client"

import { SplineScene } from "@/components/ui/spline-scene"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Showcase3DProps {
  className?: string
  sceneUrl?: string
  title?: string
  description?: string
  height?: string | number
}

export function Showcase3D({
  className,
  sceneUrl = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
  title = "Interactive 3D",
  description = "Bring your UI to life with beautiful 3D scenes. Create immersive experiences that capture attention and enhance your design.",
  height = "500px",
}: Showcase3DProps) {
  return (
    <Card 
      className={cn(
        "w-full relative overflow-hidden group",
        "bg-gradient-to-br from-background/80 to-muted/20",
        "border-border/50 hover:border-primary/30 transition-colors duration-300",
        className
      )}
      style={{ height }}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>

        {/* Right content - 3D Scene */}
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SplineScene 
            scene={sceneUrl}
            className="w-full h-full"
          />
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
      </div>
    </Card>
  )
}
