"use client";

import React from "react";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

type Props = {
  error: string;
  message: string;
};

const NotFoundPage = ({ error, message }: Props) => {
  const { locale } = useParams();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto my-5 md:my-10 text-center grid place-items-center place-content-center h-[30vh]"
    >
      <h1 className="text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-semibold first-letter:text-primary">
        {locale === "ar"
          ? convertNumbersToArabicNumerals(Number(error.slice(0, -1)))
          : error.slice(0, -1)}
        <span className="text-primary">
          {locale === "ar"
            ? convertNumbersToArabicNumerals(Number(error.slice(-1)))
            : error.slice(-1)}
        </span>
      </h1>
      <h2 className="text-2xl md:text-3xl lg:text-2xl mt-3 ">{message}</h2>
    </motion.main>
  );
};

export default NotFoundPage;
