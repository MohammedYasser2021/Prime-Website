"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ClassificationProps {
  params: {
    locale: string;
  };
}

const Classification: React.FC<ClassificationProps> = ({ params }) => {
  const { locale } = params;
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website/home`);
        const data = await response.json();
        setCategories(data.data.categories);
        console.log(data.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
      <h1
        className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${
          locale == "en" ? "lg:text-left" : "lg:text-right"
        } `}
      >
        {locale === "en" ? "Choose Classification" : "اختر التصنيف "}
      </h1>
      <div className="flex flex-wrap justify-center gap-x-[87px] mx-auto">
        {categories.map((category) => (
          <div key={category.id} className="classification_item text-center">
            <Image
              src={category.image}
              alt={category.name}
              width={120}
              height={120}
              className="w-[120px] h-[120px] mb-2 shadow-md rounded-full mx-auto"
            />
            <h1 className="text-[18px] font-bold">
              {category.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classification;
