import type { AnchorHTMLAttributes } from 'react';

export interface IconProps extends AnchorHTMLAttributes<SVGElement> {
  height?: number | string;
  width?: number | string;
}
