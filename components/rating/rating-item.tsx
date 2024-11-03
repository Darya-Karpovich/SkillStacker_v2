'use client';

import { Button } from '../ui/button';
import { cloneElement, MouseEvent, useState } from 'react';

type RatingItemProps = {
  icon: JSX.Element;
  color: string;
  idx: number;
  readOnly: boolean;
  isHalfIcon?: boolean;
  setHoverValue: (value: number | null) => void;
  onRatingChange?: (value: number) => void;
};

const detectMousePosition = (event: MouseEvent<HTMLButtonElement>) => {
  const { offsetX } = event.nativeEvent;
  const { offsetWidth } = event.currentTarget;
  return offsetX < offsetWidth / 2 ? 'left' : 'right';
};

export const RatingItem = ({
  icon,
  color,
  idx,
  readOnly,
  isHalfIcon,
  setHoverValue,
  onRatingChange,
}: RatingItemProps) => {
  const [mousePosition, setMousePosition] = useState<'left' | 'right' | null>(
    null,
  );
  const dataTestId = `${isHalfIcon ? 'rating-item-half' : 'rating-item'}-${color}`;

  const updateHoverValue = (position: 'left' | 'right', isClick = false) => {
    const value = idx + (position === 'left' ? 0.5 : 1);
    if (isClick) {
      setHoverValue(null);
      onRatingChange?.(value);
    } else {
      setHoverValue(value);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    updateHoverValue(detectMousePosition(event));
  };

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const newPosition = detectMousePosition(event);
    if (mousePosition !== newPosition) {
      setMousePosition(newPosition);
      updateHoverValue(newPosition);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    updateHoverValue(detectMousePosition(event), true);
  };

  const resetMousePosition = () => setMousePosition(null);

  return readOnly ? (
    cloneElement(icon, {
      fill: color,
      color,
      height: 20,
      width: 20,
      'data-testid': dataTestId,
    })
  ) : (
    <Button
      type="button"
      className="hover:bg-transparent [&>svg]:size-5"
      size="icon-sm"
      aria-label={`Rating item ${idx + 1}`}
      data-testid={dataTestId}
      variant="ghost"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={resetMousePosition}
    >
      {cloneElement(icon, {
        fill: color,
        color,
      })}
    </Button>
  );
};
