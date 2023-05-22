import React from 'react';
import { StandardLonghandProperties } from 'csstype';

interface ScrollerConfig { 
  speed: number;
  direction: 'left' | 'right';
  animation: StandardLonghandProperties['animationTimingFunction'];
  delayBetweenAnimationsMS: number;
  finishAnimationBeforePause: boolean;
}

type ScrollerConfigOptional = { [key in keyof ScrollerConfig]?: ScrollerConfig[key] };

interface ScrollerHandle {
  pause?: () => void;
  unpause?: () => void;
  restore?: () => void;
  container: HTMLDivElement | null;
};

interface ScrollerProps extends ScrollerConfigOptional, React.PropsWithChildren {};

export type {
  ScrollerConfig,
  ScrollerConfigOptional,
  ScrollerHandle,
  ScrollerProps,
}