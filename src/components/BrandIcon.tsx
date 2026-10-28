import React from 'react';
interface BrandIconProps { className?: string; size?: number | string; }
export const BrandIcon: React.FC<BrandIconProps> = ({ className = 'w-7 h-7', size }) => (
  <img src="/brand/muvfx-mark.svg" alt="MUVFX" className={className}
    style={{ objectFit: 'contain', borderRadius: '20%', ...(size ? { width: size, height: size } : {}) }} />
);


