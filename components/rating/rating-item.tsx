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
  setCurrentRating?: (value: number) => void;
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
  setCurrentRating,
}: RatingItemProps) => {
  const [mousePosition, setMousePosition] = useState<'left' | 'right' | null>(
    null,
  );
  const dataTestId = `${isHalfIcon ? 'rating-item-half' : 'rating-item'}-${color}`;

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    const position = detectMousePosition(event);
    setHoverValue(idx + (position === 'left' ? 0.5 : 1));
  };

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const newPosition = detectMousePosition(event);
    if (mousePosition !== newPosition) {
      setMousePosition(newPosition);
      setHoverValue(idx + (newPosition === 'left' ? 0.5 : 1));
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const position = detectMousePosition(event);
    setHoverValue(null);
    if (setCurrentRating) {
      setCurrentRating(idx + (position === 'left' ? 0.5 : 1));
    }
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
