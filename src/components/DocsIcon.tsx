"use client";

import { Icons } from '@/components/icons';

interface DocsIconProps {
  icon: keyof typeof Icons;
  className?: string;
}

export function DocsIcon({ icon, className }: DocsIconProps) {
  return Icons[icon] && (
    <div className={className}>
      {Icons[icon]({ width: 16, height: 16 })}
    </div>
  );
}
