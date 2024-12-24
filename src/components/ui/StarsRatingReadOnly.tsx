import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

import React from "react";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { useParams } from "next/navigation";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const { locale } = useParams();
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <TiStarFullOutline key={i} className=" text-yellow-300 me-1 text-xl" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <TiStarHalfOutline
          key="half"
          className=" text-yellow-300 me-1 text-xl"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <TiStarOutline
          key={`empty-${i}`}
          className=" text-gray-300 me-1 dark:text-gray-500 text-xl"
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars()}
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {locale === "ar"
          ? convertNumbersToArabicNumerals(parseFloat(rating?.toFixed(1)))
          : parseFloat(rating?.toFixed(1))}
      </p>
      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {locale === "ar" ? "من ٥" : "out of 5"}
      </p>
    </div>
  );
};

export default StarRating;
