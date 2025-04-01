'use client';

import { Star, StarHalf } from 'lucide-react';
import { type JSX, useState } from 'react';

import { cn } from '@/lib/utils';

import { RatingItem } from './rating-item';

type RatingProps = {
  count: number;
  halfSymbol?: JSX.Element;
  fullSymbol?: JSX.Element;
  color?: string;
  value: number;
  setValue?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
};

export const Rating = ({
  count = 5,
  halfSymbol = <StarHalf />,
  fullSymbol = <Star />,
  color = 'var(--color-yellow)',
  value,
  setValue,
  readOnly = false,
  className,
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const hasHalfStar = displayValue % 1 !== 0;
  const fullStarsCount = Math.ceil(displayValue);

  const handleMouseLeave = readOnly ? undefined : () => setHoverValue(null);

  return (
    <div
      data-testid="rating-component"
      className={cn('relative', className)}
      onMouseLeave={handleMouseLeave}
      aria-label="rating component"
    >
      {/* Render empty stars (gray) */}
      <div className="flex gap-1">
        {Array.from({ length: count }, (_, i) => (
          <RatingItem
            key={i}
            icon={fullSymbol}
            color="var(--color-gray)"
            idx={i}
            readOnly={readOnly}
            setHoverValue={setHoverValue}
            onRatingChange={setValue}
          />
        ))}
      </div>

      {/* Render filled stars (color), with half star if applicable */}
      <div className="absolute top-0 flex gap-1">
        {Array.from({ length: fullStarsCount }, (_, i) => {
          const isHalfIcon = i === fullStarsCount - 1 && hasHalfStar;
          return (
            <RatingItem
              key={i}
              icon={isHalfIcon ? halfSymbol : fullSymbol}
              isHalfIcon={isHalfIcon}
              color={color}
              idx={i}
              readOnly={readOnly}
              setHoverValue={setHoverValue}
              onRatingChange={readOnly ? undefined : setValue}
            />
          );
        })}
      </div>
    </div>
  );
};
