import { useState } from "react";

type Props = {
  totalCircles: number;
  setSelectedRating: any;
  selectedRating: any;
  rateTitle: string;
};

const CircleRating = ({
  totalCircles,
  setSelectedRating,
  selectedRating,
  rateTitle,
}: Props) => {
  const handleCircleClick = (rating: number) => {
    setSelectedRating((prevSelectedRatings: any) => ({
      ...prevSelectedRatings,
      [rateTitle]: rating,
    }));
  };

  // Get the selected rating for the current category
  const selectedRate = selectedRating[rateTitle] || 0;

  return (
    <div className="flex items-center gap-4">
      {[...Array(totalCircles)].map((_, index) => (
        <div
          key={index}
          onClick={() => handleCircleClick(index + 1)}
          className={`${
            index === [...Array(totalCircles)].length - 1
              ? "my-[5px] lg:mx-[34.5px]"
              : "m-[5px]"
          } w-[18px] h-[18px] text-[13px] rounded-[50%] flex items-center justify-center text-center cursor-pointer pt-[4px] transition-all duration-500 ease-in-out`}
          style={{
            backgroundColor: selectedRate === index + 1 ? "#82c91e" : "#fff",
            color: selectedRate === index + 1 ? "white" : "#82c91e",
            border: `1px solid ${
              selectedRate === index + 1 ? "#82c91e" : "#767676"
            }`,
          }}
        >
          {selectedRate === index + 1 && "✓"}
        </div>
      ))}
    </div>
  );
};

export default CircleRating;
