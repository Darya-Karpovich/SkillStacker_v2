"use client";

import { Star, StarHalf } from "lucide-react";
import { Rating } from "./rating";
import { useState } from "react";

export const RatingWrapper = () => {
  const [value, setValue] = useState(3.5);
  return (
    <div>
      <Rating
        count={5}
        halfSymbol={<StarHalf />}
        fullSymbol={<Star />}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};
