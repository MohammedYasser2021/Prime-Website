"use client";

import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import {
  addFav,
  addToCart,
  deleteFav,
  getCart,
  getFavourites,
} from "@/redux/reducer/userSlice";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { useParams, usePathname } from "next/navigation";

import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../ui/StarsRatingReadOnly";
import { Tooltip } from "react-tooltip";
import { commaSpliter } from "@/utils/commaSpliter";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { getCookie } from "cookies-next";
import { triggerToast } from "@/hooks/useToast";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

type Props = {
  data: any;
  preview?: any;
  index?: number;
};

export default function ProductCard({ data, preview, index }: Props) {
  const dispach = useAppDispach();
  const t = useTranslations("");
  const Logged = useMemo(() => getCookie("token"), []);

  const { fav } = useAppSelector((state) => state.userData);
  const pathname = usePathname();
  const { locale } = useParams();

  // const ADD_REMOVE_FAV = (id: string) => {
  //   console.log(GetCartInfo);

  //   if (!GetCartInfo.fav.data?.find((e: any) => e._id === id)) {
  //     dispach(addFav(id)).then(() => console.log("done"));
  //   } else {
  //     dispach(deleteFav(id));
  //   }
  // };

  const addProductToCart = () => {
    if (Logged) {
      dispach(
        addToCart({
          formData: {
            quantity: 1,
          },
          id: data.id,
        })
      ).then(() => {
        dispach(getCart());
      });
    } else {
      triggerToast("error", t("toasts.loginAlert"));
      setTimeout(() => {
        window.location.href = `/${locale}/log-in`;
        localStorage.setItem("previousLocation", pathname);
      }, 2500);
    }
  };

  const addProductTofav = () => {
    if (Logged) {
      dispach(addFav(data._id));
    } else {
      triggerToast("error", t("toasts.loginAlert"));
      setTimeout(() => {
        window.location.href = `/${locale}/log-in`;
        localStorage.setItem("previousLocation", pathname);
      }, 2500);
    }
  };

  const removeProductFromFav = () => {
    if (Logged) {
      dispach(deleteFav(data._id));
    }
  };

  const styles =
    "text-primary p-1 rounded-md cursor-pointer transition-all duration-300 ease-in-out";

  const cardInfo = () => {
    return (
      <div className="flex flex-col gap-1 text-sm xxl:text-[15.5px] border-t-[2px] border-dashed border-[#e6e6e6] pt-2 mt-3">
        {data?.price?.range && (
          <div className="flex gap-2 items-center text-[17px] xxl:text-lg w-fit">
            <h1 className="font-bold text-black">{t("ProductCard.price")}</h1>
            <div className="flex gap-1 items-center">
              <h1
                className={`w-fit flex gap-1 ${
                  locale == "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span>{data?.currency ?? t("Tiltle.currency")}</span>
                <span>{commaSpliter(Math.floor(data?.price?.range.from))}</span>
              </h1>
              &mdash;
              <h2
                className={`w-fit flex gap-1 ${
                  locale == "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <span>{data?.currency ?? t("Tiltle.currency")}</span>
                <span>{commaSpliter(Math.floor(data?.price?.range.to))}</span>
              </h2>
            </div>
          </div>
        )}
        {data?.price?.highest && (
          <div className="flex gap-2 items-center w-fit text-[17px] xxl:text-lg">
            <h1 className="font-bold text-black">{t("ProductCard.price")}</h1>
            <h1>{t("ProductCard.highestPrice")}</h1>
          </div>
        )}
        {data?.discount > 0 && data?.price?.fixed && (
          <div className="flex justify-between items-center">
            <h3
              className={`line-through text-sm xxl:text-[15px] font-medium w-fit flex gap-1 ${
                locale == "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span>{data?.currency ?? t("Tiltle.currency")}</span>
              <span>{commaSpliter(Math.floor(data?.price?.fixed))}</span>
            </h3>
            <h3
              className={`text-[17px] font-medium text-[#F54702] leading-4 w-fit flex gap-1 ${
                locale == "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <span>{data?.currency ?? t("Tiltle.currency")}</span>
              <span>{commaSpliter(Math.floor(data?.priceAfter))}</span>
            </h3>
          </div>
        )}
        {data?.price?.fixed > 0 && !data?.discount && (
          <h3
            className={`text-[17px] xxl:text-lg font-medium text-[#F54702] w-fit flex gap-1 ${
              locale == "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <span>{data?.currency ?? t("Tiltle.currency")}</span>
            <span>{commaSpliter(Math.floor(data?.price?.fixed))}</span>
          </h3>
        )}

        <div className="flex justify-between items-center text-sm xxl:text-[15.5px]">
          {data?.discount > 0 && (
            <h4 className=" text-[#25881A]">
              <span>
                {locale == "ar"
                  ? convertNumbersToArabicNumerals(data?.discount)
                  : data?.discount}
              </span>{" "}
              {t("percent") + t("ProductCard.off")}
            </h4>
          )}
          {data?.discount > 0 && data?.priceAfter > 0 && (
            <h4 className="w-fit text-[#25881A]">
              {t("ProductCard.save") +
                " " +
                (data?.currency ?? t("Tiltle.currency"))}{" "}
              <span>
                {locale == "ar"
                  ? convertNumbersToArabicNumerals(
                      Math.floor(data?.price?.fixed - data?.priceAfter)
                    )
                  : Math.floor(data?.price?.fixed - data?.priceAfter)}
              </span>
              !
            </h4>
          )}
        </div>
      </div>
    );
  };

  const totalRatings =
    data?.averageRatingPrice +
    data?.averageRatingQuality +
    data?.averageRatingValue;

  const numberOfRatings = 3; // Since we have 3 ratings

  const averageTotalRating = totalRatings / numberOfRatings;

  return (
    <>
      <div
        className={`border border-[#00000033] text-[#444444] hover:shadow-xl transition-all duration-500 ease-in-out w-full h-auto ${
          preview == "list" ? "flex" : "py-6 px-4 card"
        }`}
      >
        {data?.card_img && (
          // <div
          //   className={`w-full ${
          //     preview == "list" ? "max-w-[330px]" : "max-w-[200px]"
          //   } mx-auto`}
          // >
          <Link href={`/shop/${data.id}`}>
            <div
              className={`w-full ${
                preview == "list" ? "max-w-[330px]" : "max-w-[200px]"
              } mx-auto`}
            >
              <Image
                src={data?.card_img}
                alt={data?.card_img}
                className="object-contain w-full h-full"
                width={20000}
                height={20000}
                priority
              />
            </div>
          </Link>
          // </div>
        )}
        <div
          className={`w-full  ${
            preview == "list"
              ? "flex flex-col gap-4 justify-between card p-5"
              : "pt-5 pb-2 px-2"
          }`}
        >
          <div>
            <StarRating rating={averageTotalRating} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="sm:text-base md:text-lg lg:text-xl 4k:text-2xl leading-4">
              {typeof data?.name === "string"
                ? data?.name.slice(0, 30) +
                  (data?.name.length > 30 ? "..." : "")
                : data?.name?.length > 0 &&
                  (locale === "ar"
                    ? data?.name[0]?.value.slice(0, 30) +
                      (data?.name[0]?.value.length > 30 ? "..." : "")
                    : data?.name[1]?.value.slice(0, 30) +
                      (data?.name[1]?.value.length > 30 ? "..." : ""))}
            </h2>

            {data?.vendor && (
              <h3 className="text-[#666666] text-[12px] lg:text-sm tk:text-base">
                {t("ProductCard.by") + " " + data?.vendor?.name}
              </h3>
            )}
            {data?.summary && preview == "list" && (
              <h3 className="text-[#666666] text-[13px]">
                {typeof data?.summary === "string"
                  ? data?.summary
                  : data?.summary?.length > 0 &&
                    (locale === "ar"
                      ? data?.summary[0]?.value
                      : data?.summary[1]?.value)}
              </h3>
            )}
          </div>
          {cardInfo()}
          {preview == "list" && (
            <div className="hover_card text-black bg-[#ffffffe3] z-10 flex flex-col gap-3 w-full px-8 font-medium">
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <h2 className="sm:text-base md:text-lg lg:text-xl 4k:text-2xl leading-4">
                    {typeof data?.name === "string"
                      ? data?.name
                      : data?.name.length > 0 &&
                        (locale === "ar"
                          ? data?.name[0].value
                          : data?.name[1].value)}
                  </h2>

                  {data?.vendor && (
                    <h3 className="text-[#666666] text-[12px] lg:text-sm tk:text-base mt-2">
                      {t("ProductCard.by") + " " + data?.vendor?.name}
                    </h3>
                  )}
                </div>

                {fav?.data?.find((e: any) => e._id === data._id) ? (
                  <>
                    <FaHeart
                      id={`tooltip-remove-heart-${index}`}
                      onClick={removeProductFromFav}
                      className="text-primary cursor-pointer text-3xl hover:bg-[#dee2e6] transition-all duration-300 ease-in-out p-1.5 rounded-md"
                    />
                    <Tooltip
                      anchorSelect={`#tooltip-remove-heart-${index}`}
                      content={t("Tooltips.remvoe_from_favorites")}
                      style={{
                        fontSize: "12px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div id={`tooltip-add-heart-${index}`}>
                      <FiHeart
                        onClick={addProductTofav}
                        className="text-primary cursor-pointer text-3xl hover:bg-[#dee2e6] transition-all duration-300 ease-in-out p-1.5 rounded-md"
                      />
                      <Tooltip
                        anchorSelect={`#tooltip-add-heart-${index}`}
                        content={t("Tooltips.add_to_favorites")}
                        style={{
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>

              {cardInfo()}

              <div className="px-4 mt-1 flex flex-col  gap-y-1.5 w-full">
                <Link href={`/shop/${data?.id || data?._id}`}>
                  <button className="border-primary text-primary transition-all duration-300 ease-in-out bg-white hover:bg-[#e9ecef] border py-1.5 w-full">
                    {t("ProductCard.viewDetails")}
                  </button>
                </Link>
                {/* <button className="border-primary text-primary transition-all duration-300 ease-in-out bg-white hover:bg-[#e9ecef] border py-1.5 w-full">
                  {t("ProductCard.buyNow")}
                </button> */}
                <button
                  // disabled={Logged ? false : true}
                  onClick={addProductToCart}
                  className="col-span-2 bg-primary hover:bg-secondary transition-all duration-300 ease-in-out text-white py-1.5 w-full"
                >
                  {t("ProductCard.addToCart")}
                </button>
              </div>
            </div>
          )}
        </div>

        {preview !== "list" && (
          <div className="hover_card  text-black bg-[#ffffffe3] z-10 flex flex-col gap-3 w-full pt-5 px-8 font-medium">
            <div className="flex justify-between mt-3">
              <div className="flex flex-col gap-2">
                <h2 className="sm:text-base md:text-lg lg:text-xl 4k:text-2xl leading-4">
                  {typeof data?.name === "string"
                    ? data?.name
                    : data?.name?.length > 0 &&
                      (locale === "ar"
                        ? data?.name[0]?.value
                        : data?.name[1]?.value)}
                </h2>
                <div id={`totalRating_average_grid_${index}`}>
                  <StarRating rating={averageTotalRating} />
                  <Tooltip anchorSelect={`#totalRating_average_grid_${index}`}>
                    <div className="flex flex-col gap-1">
                      <h1>
                        {t("ProductPage.sections.titles.reviews.rating.Price")}{" "}
                        {"   "}
                        {locale === "ar"
                          ? convertNumbersToArabicNumerals(
                              data?.averageRatingPrice
                            )
                          : data?.averageRatingPrice}
                        {` ${locale === "ar" ? "من ٥" : "out of 5"}`}
                      </h1>
                      <h1>
                        {t(
                          "ProductPage.sections.titles.reviews.rating.Quality"
                        )}{" "}
                        {"   "}
                        {locale === "ar"
                          ? convertNumbersToArabicNumerals(
                              data?.averageRatingQuality
                            )
                          : data?.averageRatingQuality}
                        {` ${locale === "ar" ? "من ٥" : "out of 5"}`}
                      </h1>
                      <h1>
                        {t("ProductPage.sections.titles.reviews.rating.Value")}{" "}
                        {"  "}
                        {locale === "ar"
                          ? convertNumbersToArabicNumerals(
                              data?.averageRatingValue
                            )
                          : data?.averageRatingValue}
                        {` ${locale === "ar" ? "من ٥" : "out of 5"}`}
                      </h1>
                    </div>
                  </Tooltip>
                </div>
                {data?.vendor && (
                  <h3 className="text-[#666666] text-[12px] lg:text-sm tk:text-base">
                    {t("ProductCard.by") + " " + data?.vendor?.name}
                  </h3>
                )}
              </div>
              {fav?.data?.find((e: any) => e._id === data._id) ? (
                <>
                  <FaHeart
                    id={`tooltip-remove-heart-${index}-1`}
                    onClick={removeProductFromFav}
                    className="text-primary cursor-pointer text-3xl hover:bg-[#dee2e6] transition-all duration-300 ease-in-out p-1.5 rounded-md"
                  />
                  <Tooltip
                    anchorSelect={`#tooltip-remove-heart-${index}-1`}
                    content={t("Tooltips.remvoe_from_favorites")}
                    place="bottom"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                </>
              ) : (
                <div id={`tooltip-add-heart-${index}`}>
                  <FiHeart
                    onClick={addProductTofav}
                    className="text-primary cursor-pointer text-3xl hover:bg-[#dee2e6] transition-all duration-300 ease-in-out p-1.5 rounded-md"
                  />
                  <Tooltip
                    anchorSelect={`#tooltip-add-heart-${index}`}
                    content={t("Tooltips.add_to_favorites")}
                    place="bottom"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                </div>
              )}
            </div>

            {cardInfo()}

            <div className="px-4 mt-3 flex flex-col gap-3">
              <Link href={`/shop/${data?.id || data?._id}`}>
                <button className="border-primary text-primary transition-all duration-300 ease-in-out bg-white hover:bg-[#e9ecef] border py-1.5 w-full">
                  {t("ProductCard.viewDetails")}
                </button>
              </Link>
              <button
                // disabled={Logged ? false : true}
                onClick={addProductToCart}
                className="bg-primary hover:bg-secondary transition-all duration-300 ease-in-out text-white py-1.5 w-full"
              >
                {t("ProductCard.addToCart")}
              </button>
              {/* <button className="border-primary text-primary transition-all duration-300 ease-in-out bg-white hover:bg-[#e9ecef] border py-1.5 w-full">
                {t("ProductCard.buyNow")}
              </button> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
