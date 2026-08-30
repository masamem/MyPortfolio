import React from 'react';

interface BrandIconProps {
  className?: string;
  size?: number | string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ className = "w-7 h-7", size }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Mugahed Al-Maari Brand Icon"
    >
      {/* Black Circular Background */}
      <circle cx="256" cy="256" r="256" fill="#000000" />
      
      {/* Neon Chartreuse M Logo Mark */}
      <path
        d="M 192 136
           C 224 136 242 168 256 178
           C 270 168 288 136 320 136
           C 346 136 362 158 362 198
           C 362 238 358 268 344 290
           C 330 310 306 298 292 278
           C 280 262 270 262 258 268
           C 242 276 226 318 208 354
           C 194 380 164 384 154 360
           C 144 336 150 290 150 228
           C 150 162 164 136 192 136 Z"
        fill="#ccf52b"
      />
    </svg>
  );
};
