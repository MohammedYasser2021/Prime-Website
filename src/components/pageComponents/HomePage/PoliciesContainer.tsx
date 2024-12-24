"use client";

import { useParams, usePathname } from "next/navigation";

import Link from "next/link";
import React from "react";
import ar from "../../../messages/ar.json";
import en from "../../../messages/en.json";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Props = {};

const visible = { opacity: 1, y: 0, transition: { duration: 0.7 } };

const header = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

const PoliciesContainer = ({
  children,
  Header,
}: {
  children: React.ReactNode;
  Header: string;
}) => {
  const t = useTranslations("");
  const { locale } = useParams();
  const pathname = usePathname();

  return (
    <div className="">
      <motion.article
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        variants={{
          visible: { transition: { staggerChildren: 0.3, ease: "easeInOut" } },
        }}
        className="text-[25px] md:text-[35px] xl:text-[42px] xxxl:text-[4em] text-center bg-primary text-white font-bold py-14 md:py-20 xxxl:py-28"
      >
        <motion.h1 variants={header}>{Header}</motion.h1>
      </motion.article>

      <div
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="w-[95%] mx-auto flex flex-col gap-8 xxl:gap-12 text-[13px] s:text-[15px] md:text-[16px] xl:text-[18px] py-8 md:pt-[50px] xl:pb-32"
      >
        {children}
      </div>
    </div>
  );
};

export default PoliciesContainer;
