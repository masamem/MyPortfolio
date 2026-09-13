import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'interaction' | 'manual';
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'auto-rotate-delay'?: string;
  'rotation-per-second'?: string;
  'interaction-prompt'?: 'auto' | 'none';
  'shadow-intensity'?: string;
  'shadow-softness'?: string;
  exposure?: string;
  'camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'touch-action'?: string;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps;
    }
  }
}

export {};
