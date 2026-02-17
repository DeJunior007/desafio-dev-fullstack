'use client';

import { motion } from 'framer-motion';
import { Card, CardProps } from '@heroui/react';
import { ReactNode } from 'react';

interface GlassCardProps extends CardProps {
  children: ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  hoverEffect = true,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={
        hoverEffect
          ? { scale: 1.01, y: -2 }
          : undefined
      }
    >
      <Card
        {...props}
        className={`
          backdrop-blur-xl
          bg-white/40
          border border-white/30
          shadow-xl
          rounded-2xl
          transition-all
          duration-300
          ${className ?? ''}
        `}
      >
        {children}
      </Card>
    </motion.div>
  );
}
