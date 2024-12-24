"use client";

import { IoBan } from "react-icons/io5";
import ProductCard from "./Uitily/ProductCard";
import { getCookie } from "cookies-next";
import { getFavourites } from "@/redux/reducer/userSlice";
import { motion } from "framer-motion";
import { useAppDispach } from "@/redux/reduxHooks";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

type Props = {
  preview?: any;
  products: any;
};

export default function AllProduct({ preview, products }: Props) {
  const t = useTranslations("Tiltle");

  const Logged = getCookie("token");
  const dispach = useAppDispach();

  useEffect(() => {
    if (Logged) dispach(getFavourites());
  }, [Logged]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl lg:max-w-7xl xl:max-w-[1400px] w-full h-full">
        {/* <h2 className="sr-only">Products</h2> */}

        <div
          className={`mt-3 grid justify-between md:mt-6  ${
            preview === "list"
              ? "grid-cols-1 gap-y-9 w-full h-full"
              : `${
                  products?.length > 0
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                } gap-3 sm:gap-2 md:gap-8`
          }`}
        >
          {products?.length > 0 ? (
            products?.map((item: any, index: number) => (
              <div className={` relative overflow-hidden h-auto`} key={index}>
                <ProductCard data={item} index={index} preview={preview} />
              </div>
            ))
          ) : (
            <div
              className={`flex flex-col justify-center items-center gap-1 w-full h-fit my-24 mx-auto`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <IoBan className="text-8xl text-primary opacity-80" />
              </motion.div>
              <h4 className="text-lg">{t("not__found")}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
