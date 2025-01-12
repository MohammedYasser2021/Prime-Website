import React, { useEffect } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";

import Image from "next/image";
import Link from "next/link";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { getAllProducts } from "@/redux/reducer/productsSlice";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  searchQuery: string;
  setOpenInstantSearch: any;
  openInstantSearch: boolean;
};

const InstantSearch = ({
  searchQuery,
  setOpenInstantSearch,
  openInstantSearch,
}: Props) => {
  const dispach = useAppDispach();
  const t = useTranslations("InstantSearch");
  const { locale } = useParams();
  const { product, isLoading: isLoadingProducts } = useAppSelector(
    (state: any) => state.productsData
  );

  // useEffect(() => {
  //   // Ensure searchQuery is not empty before dispatching
  //   // if (searchQuery.trim() !== "") {
  //   dispach(getAllProducts({ name: searchQuery }));
  //   // }
  // }, [dispach]);

  useEffect(() => {
    let debouncer = setTimeout(() => {
      dispach(getAllProducts({ name: searchQuery }));
    }, 1000);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchQuery, dispach]);

  return (
    <>
      <div
        onClick={() => setOpenInstantSearch(false)}
        className={`fixed top-[15%] w-screen h-screen duration-500 cursor-pointer ${
          openInstantSearch ? "scale-100" : "scale-0 opacity-0"
        } top-0 left-0 z-20`}
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div
          className={`w-full absolute z-50 bg-white !shadow-2xl !rounded-b-3xl  ${
            openInstantSearch
              ? "opacity-100"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="relative bg-white p-3 rounded-b-sm divide-y-[1px]">
            {product?.data?.length > 0 ? (
              product?.data.map((item: any, i: number) => (
                <Link
                  // key={item.name}
                  key={i}
                  href={`/shop/${item?._id}`}
                  className="flex justify-between p-2 transition-all duration-150 ease-in-out hover:bg-gray-500/20 focus:outline-none"
                >
                  <div className="flex gap-3">
                    <div className="">
                      <Image
                        alt={item.name}
                        src={item?.card_img}
                        width={4000}
                        height={4000}
                        className="!h-11 !w-11 rounded-sm object-cover"
                      />
                    </div>

                    <div className="">
                      {item?.name && (
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.name}
                          {item?.owner && (
                            <span className="mx-2 text-[#777777]">
                              {item?.owner}
                            </span>
                          )}
                        </p>
                      )}

                      {item?.summary && (
                        <p className="text-xs text-gray-500">{item?.summary}</p>
                      )}
                    </div>
                  </div>

                  <div className="text-[13px] ">
                    {item?.price["fixed"] && (
                      <p className="font-bold text-base">
                        <span className="font-normal ">
                          {locale === "ar"
                            ? convertNumbersToArabicNumerals(
                                item?.price["fixed"]
                              )
                            : item?.price["fixed"]}
                        </span>{" "}
                        <span className="text-primary">
                          {item?.currency ?? t("currency")}
                        </span>
                      </p>
                    )}
                    {item?.price["range"] && (
                      <p className="font-bold text-base">
                        <span className="font-normal ">
                          {locale === "ar"
                            ? convertNumbersToArabicNumerals(
                                item?.price["range"]?.from
                              )
                            : item?.price["range"]?.from}
                        </span>{" "}
                        <span className="text-primary">
                          {item?.currency ?? t("currency")}
                        </span>
                        <span>&mdash;</span>{" "}
                        <span className="font-normal ">
                          {locale === "ar"
                            ? convertNumbersToArabicNumerals(
                                item?.price["range"]?.to
                              )
                            : item?.price["range"]?.to}
                        </span>
                        <span className="text-primary">
                          {item?.currency ?? t("currency")}
                        </span>
                      </p>
                    )}
                    {item?.price["highest"] && (
                      <p className="font-bold">
                        <span className="">{t("highestPrice")}</span>
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : isLoadingProducts ? (
              <p className="animate-pulse text-center my-5 text-black/70">
                {t("searching")}
              </p>
            ) : (
              <p className="text-center my-5 text-black/70">{t("noResults")}</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default InstantSearch;
