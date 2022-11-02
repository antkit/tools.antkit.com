import React from 'react';
import { AntkitLogoRounded } from './AntkitLogoRounded';
import { AntkitLogoText } from './AntkitLogoText';
import { LogoProps } from './useAntkitLogoColors';

export interface AntkitLogoProps extends LogoProps {
  type?: 'mark' | 'full';
}

export function AntkitLogo({ type, ...others }: AntkitLogoProps) {
  if (type === 'mark') {
    return <AntkitLogoRounded {...others} />;
  }

  return <AntkitLogoText {...others} />;
}
