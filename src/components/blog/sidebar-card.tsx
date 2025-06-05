import React, { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, Variants } from 'framer-motion';

interface SidebarCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
}

const cardVariants: Variants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  }
};

export const SidebarCard = forwardRef<HTMLDivElement, SidebarCardProps>(
  ({ title, icon: Icon, children, className, ...props }, ref) => (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariants}
      className={className}
      ref={ref}
    >
      <Card
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50 dark:hover:border-primary/50 hover:scale-[1.02]"
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center">
            {Icon && (
              <div className="p-1.5 bg-primary/10 rounded-lg mr-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="group-hover:text-foreground/90 transition-colors">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
);

SidebarCard.displayName = 'SidebarCard';