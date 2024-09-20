'use client';

import { Star, StarHalf } from 'lucide-react';
import { useState } from 'react';
import { RatingItem } from './rating-item';
import { cn } from '@/lib/utils';

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
  count,
  halfSymbol = <StarHalf />,
  fullSymbol = <Star />,
  color = 'yellow',
  value,
  setValue,
  readOnly = false,
  className,
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;
  const hasHalfStar = displayValue % 1 !== 0;
  const fullStarsCount = Math.ceil(displayValue);

  const handleMouseLeave = () => setHoverValue(null);

  return (
    <div className={cn('relative', className)} onMouseLeave={handleMouseLeave}>
      <div className="flex gap-1">
        {Array.from({ length: count }, (_, i) => (
          <RatingItem
            key={i}
            icon={fullSymbol}
            color="gray"
            idx={i}
            readOnly={readOnly}
            setHoverValue={setHoverValue}
            setCurrentRating={setValue}
          />
        ))}
      </div>

      <div className="absolute top-0 flex gap-1">
        {Array.from({ length: fullStarsCount }, (_, i) => (
          <RatingItem
            key={i}
            icon={
              i === fullStarsCount - 1 && hasHalfStar ? halfSymbol : fullSymbol
            }
            color={color}
            idx={i}
            readOnly={readOnly}
            setHoverValue={setHoverValue}
            setCurrentRating={setValue}
          />
        ))}
      </div>
    </div>
  );
};
