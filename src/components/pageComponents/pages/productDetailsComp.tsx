"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/AccordionShadcn";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  addFav,
  addToCart,
  deleteFav,
  getCart,
  getFavourites,
  getProfile,
} from "@/redux/reducer/userSlice";
import {
  addRating,
  getAllProducts,
  getAllSimilarProducts,
  getOneProducts,
} from "@/redux/reducer/productsSlice";
import { decrement, increment } from "@/redux/reducer/counterSlice";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { useParams, usePathname } from "next/navigation";

import ButtonLoading from "@/components/ui/button-loading";
import CircleRating from "@/components/ui/CircleRating";
import Image from "next/image";
import { IoIosCart } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import Loading from "@/components/Uitily/Loading";
import NotFoundPage from "@/components/Uitily/NotFoundPage";
import { ProductsCont } from "../HomePage/ProductsCont";
import StarRating from "@/components/ui/StarsRatingReadOnly";
import ValidationError from "@/components/ui/validation-error";
import { addRatingsSchema } from "@/utils/ValidationsSchema";
import { commaSpliter } from "@/utils/commaSpliter";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import dayjs from "dayjs";
import { getCookie } from "cookies-next";
import { localeDayjs } from "@/utils/convertDateToArabic";
import { motion } from "framer-motion";
import { triggerToast } from "@/hooks/useToast";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

type Props = {};

const ProductDetailsComp = (props: Props) => {
  // start Get a same product
  const [sameProductWithDefProp, setSameProductWithDefProp] =
    useState<any>(null);

  const [similarProductsDefProp, setSimilarProductsDefProp] =
    useState<any>(null);

  const {
    product: sameProduct,
    similarProducts,
    isLoading: isLoadingProducts,
  } = useAppSelector((state: any) => state.productsData);

  useEffect(() => {
    if (sameProduct?.data) {
      setSameProductWithDefProp(
        sameProduct.data
          .filter((item: any) => {
            return item._id != defproduct.data?._id;
          })
          .slice(0, 4)
      );
    }

    if (similarProducts?.data) {
      setSimilarProductsDefProp(
        similarProducts?.data?.filter((item: any) => {
          return item._id !== defproduct?.data?._id;
        })
      );
    }
  }, [sameProduct, similarProducts]);
  // end Get a same product

  const t = useTranslations("");
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [disableInput, setDisableInput] = useState(false);
  const [selectedRating, setSelectedRating] = useState({
    ["Price"]: 0,
    ["Value"]: 0,
    ["Quality"]: 0,
  });
  const Logged = getCookie("token");
  const pathname = usePathname();
  const { id, locale } = useParams();
  const { fav } = useAppSelector((state: any) => state.userData);

  const dispach = useAppDispach();
  const counterValue = useSelector(
    (state: any) => state.counter.counters.count
  );

  const counterValueId = useSelector((state: any) => state.counter.counters.id);
  const addProductToCart = (QTY: number) => {
    if (Logged) {
      dispach(
        addToCart({
          formData: {
            quantity: QTY,
          },
          id: id,
        })
      ).then(() => dispach(getCart()));
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
      dispach(addFav(id as string));
    } else {
      triggerToast("error", t("toasts.loginAlert"));
      setTimeout(() => {
        window.location.href = `/${locale}/log-in`;
        localStorage.setItem("previousLocation", pathname);
      }, 2500);
    }
  };

  const removeProductFromFav = () => {
    dispach(deleteFav(id as string));
  };

  const [quantity, setQuantity] = useState<string>("1");
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const { isLoading, defproduct, product, ratingLoading } = useAppSelector(
    (state: any) => state.productsData
  );

  useEffect(() => {
    if (defproduct?.data?.name) {
      const firstWord =
        typeof defproduct?.data?.name === "string"
          ? defproduct?.data?.name?.split(" ")[0]
          : defproduct?.data?.name?.length > 0 &&
            (locale === "ar"
              ? defproduct?.data?.name[0]?.value?.split(" ")[0]
              : defproduct?.data?.name[1]?.value?.split(" ")[0]);
      dispach(getAllProducts({ name: firstWord }));
    }

    if (
      defproduct?.data?.brand?.id ||
      defproduct?.data?.category?._id ||
      defproduct?.data?.vendor?._id ||
      defproduct?.data?.name
    ) {
      const firstWord =
        typeof defproduct?.data?.name === "string"
          ? defproduct?.data?.name?.split(" ")[0]
          : defproduct?.data?.name?.length > 0 &&
            (locale === "ar"
              ? defproduct?.data?.name[0]?.value?.split(" ")[0]
              : defproduct?.data?.name[1]?.value?.split(" ")[0]);

      const filterAttributes = {
        category: defproduct?.data?.category?._id,
        vendor: defproduct?.data?.vendor?._id,
        brand: defproduct?.data?.brand?.id,
        name: firstWord,
      };

      // Select the first non-null/undefined attribute and remove the rest
      const selectedAttribute = Object.entries(filterAttributes).find(
        ([key, value]) => value !== undefined && value !== null
      );
      if (selectedAttribute) {
        dispach(
          getAllSimilarProducts({
            [selectedAttribute[0]]: selectedAttribute[1],
          })
        );
      }
    }
  }, [defproduct]);
  const BestSellers = useAppSelector(
    (state: any) => state.productsData.product?.data
  );

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      comment: "",
    },
    validationSchema: addRatingsSchema(t),
    onSubmit: (values: any, { resetForm }) => {
      if (Logged) {
        dispach(addRating({ ...values, productId: id, rating: selectedRating }))
          .then((res: any) => {
            if (res) {
              resetForm();
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        triggerToast("error", t("toasts.loginAlert"));
        setTimeout(() => {
          window.location.href = `/${locale}/log-in`;
          localStorage.setItem("previousLocation", `${pathname}/#reviewForm`);
        }, 2500);
      }
    },
  });

  const handleInputChange = (e: any) => {
    if (!Logged) {
      triggerToast("error", t("toasts.loginAlert"));
      setTimeout(() => {
        setDisableInput(true);
        resetForm();
      }, 300);
      setTimeout(() => {
        window.location.href = `/${locale}/log-in`;
        localStorage.setItem("previousLocation", `${pathname}/#reviewForm`);
      }, 2200);
    }
  };

  useEffect(() => {
    const run = async () => {
      await dispach(getOneProducts(id));
      if (Logged) {
        await dispach(getFavourites());
        dispach(getProfile()).then((data: any) =>
          setProfile(data.payload?.data)
        );
      }
    };
    run();
  }, [dispach]);

  useEffect(() => {
    if (Logged) {
      setFieldValue("firstName", profile?.name ? profile?.name : "");
      setDisableInput(false);
    }
  }, [Logged, profile]);

  const ratings = [
    t("ProductPage.sections.titles.reviews.rating.Price"),
    t("ProductPage.sections.titles.reviews.rating.Value"),
    t("ProductPage.sections.titles.reviews.rating.Quality"),
  ];

  const RatingsLocalized: any = {
    السعر: "Price",
    الجودة: "Quality",
    القيمة: "Value",
    Price: "Price",
    Quality: "Quality",
    Value: "Value",
  };

  const numbers: any = [
    { ar: "١", en: "1" },
    { ar: "٢", en: "2" },
    { ar: "٣", en: "3" },
    { ar: "٤", en: "4" },
    { ar: "٥", en: "5" },
  ];

  const PageStylesRespo = "px-2 se:px-3 md:px-4 lg:px-6 xl:px-0";

  if (!defproduct) {
    return <NotFoundPage error="404" message={t("productNotFound")} />;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-10 max-w-[1400px] relative">
      <section
        id="product"
        className="flex flex-col lg:flex-row gap-10 justify-between items-start px-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[60%,40%] gap-10 lg:gap-4 w-full">
          {isLoading ? (
            <div className="bg-[#DEDEDE] max-w-[520px] w-full h-[388px] rounded-xl animate-pulse"></div>
          ) : (
            <div className=" !max-w-[520px] !w-full ">
              {((defproduct?.data?.videos &&
                defproduct?.data?.videos?.length > 0) ||
                (defproduct?.data?.imgs &&
                  defproduct?.data?.imgs?.length > 0)) && (
                <Swiper
                  style={{
                    //@ts-ignore
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    "--swiper-button-shadow": "0 2px 4px rgba(0, 0, 0, 0.7)",
                  }}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                  modules={[FreeMode, Navigation, Thumbs, Pagination]}
                  className="rounded-lg h-96"
                >
                  {defproduct?.data?.imgs.map((image: any, index: number) => (
                    <SwiperSlide key={index}>
                      <Image
                        width={10000}
                        height={10000}
                        src={image}
                        priority
                        alt={defproduct?.data?.name}
                        className="h-full w-full object-contain object-center"
                      />
                    </SwiperSlide>
                  ))}

                  {defproduct?.data?.videos.map((video: any, index: number) => (
                    <SwiperSlide key={index}>
                      <video
                        // width="320"
                        // height="240"
                        autoPlay
                        loop
                        muted
                        controls={false}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <source
                          src={video}
                          type="video/mp4"
                          className="h-full w-full object-cover object-center"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}

              {((defproduct?.data?.videos &&
                defproduct?.data?.videos?.length > 0) ||
                (defproduct?.data?.imgs &&
                  defproduct?.data?.imgs?.length > 0)) && (
                <Swiper
                  // Thumbnail
                  onSwiper={setThumbsSwiper}
                  threshold={10}
                  allowTouchMove={false}
                  spaceBetween={12}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="thumbs mt-3 rounded-lg h-28"
                >
                  {defproduct?.data?.imgs.map((image: any, index: number) => (
                    <SwiperSlide key={index} className="!bg-black">
                      <Image
                        width={5000}
                        height={5000}
                        src={image}
                        priority
                        alt={defproduct?.data?.name}
                        className="h-full w-full object-cover object-center cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
                      />
                    </SwiperSlide>
                  ))}
                  {defproduct?.data?.videos.map((video: any, index: number) => (
                    <SwiperSlide className="!bg-black" key={index}>
                      <video
                        width="320"
                        height="240"
                        muted
                        controls={false}
                        className="h-full w-full object-cover object-center cursor-pointer hover:opacity-70 transition-all duration-300 ease-in-out"
                      >
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          )}

          <div className="max-w-[485px] w-full flex flex-col gap-3">
            {defproduct?.data?.name && (
              <h1 className="border-b-[1px] pb-2 w-full text-[#333333] text-lg font-bold ">
                {typeof defproduct?.data?.name === "string"
                  ? defproduct?.data?.name
                  : defproduct?.data?.name?.length > 0 &&
                    (locale === "ar"
                      ? defproduct?.data?.name[0]?.value
                      : defproduct?.data?.name[1]?.value)}
              </h1>
            )}

            {defproduct?.data?.category?.name && (
              <div className="flex items-center gap-2 text-lg">
                <h1 className=" font-medium text-primary text-base">
                  {locale == "ar" ? "القسم" : "Category"}:
                </h1>
                <p className=" text-start">
                  {typeof defproduct?.data?.category?.name === "string"
                    ? defproduct?.data?.category?.name
                    : defproduct?.data?.category?.name?.length > 0 &&
                      (locale === "ar"
                        ? defproduct?.data?.category?.name[0]?.value
                        : defproduct?.data?.category?.name[1]?.value)}
                </p>
              </div>
            )}

            {defproduct?.data?.vendor?.name && (
              <div className="flex items-center gap-2 text-lg">
                <h1 className=" font-medium text-primary text-base">
                  {locale == "ar" ? "البائع" : "Vendor"}:
                </h1>
                <p className=" text-start">{defproduct?.data?.vendor?.name}</p>
              </div>
            )}

            {defproduct?.data?.subs && defproduct?.data?.subs?.length > 0 && (
              <div className="flex items-center gap-2 text-lg">
                <h1 className="font-medium text-primary text-base w-fit">
                  {locale == "ar" ? "الفئات" : "Sub categories"}:{" "}
                </h1>
                <p className="text-start w-fit">
                  {defproduct?.data?.subs?.map((sub: any, index: number) => (
                    <span key={index}>
                      {index === defproduct?.data?.subs?.length - 1
                        ? (typeof sub === "string" ? sub : sub?.value) + ""
                        : (typeof sub === "string" ? sub : sub?.value) + ","}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {defproduct?.data?.brand?.value && (
              <div className="flex items-center gap-2 text-lg">
                <h1 className="font-medium text-primary text-base">
                  {locale == "ar" ? "الماركة" : "Brand"}:{" "}
                </h1>
                <p className="">{defproduct?.data?.brand?.value}</p>
              </div>
            )}

            {defproduct?.data?.summary && (
              <div className="mt-5">
                <h1 className="font-bold mb-1.5">
                  {locale == "ar" ? "مراجعة سريعة" : "Quick summary"}:
                </h1>
                <div>
                  <p className="mx-1">
                    {typeof defproduct?.data?.summary === "string"
                      ? defproduct?.data?.summary
                      : defproduct?.data?.summary?.length > 0 &&
                        (locale === "ar"
                          ? defproduct?.data?.summary[0]?.value
                          : defproduct?.data?.summary[1]?.value)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          id="cardPrice"
          className="bg-[#F0FFF0] p-6 lg:max-w-[350px] xl:max-w-[400px] w-full"
        >
          <h1
            className={`${
              defproduct?.data?.availability ? "bg-[#6DBE14]" : "bg-red-600"
            } max-w-[100px] mx-auto text-center text-white rounded-sm px-6 py-1.5 text-sm font-bold `}
          >
            {defproduct?.data?.availability
              ? t("ProductPage.card.available")
              : t("ProductPage.card.notAvailable")}
          </h1>

          <div className="flex items-center justify-center gap-1 text-lg text-[#212121] font-bold">
            {defproduct?.data?.price["range"] && (
              <>
                <div className="flex gap-1 items-center justify-center text-lg text-[#212121] leading-8 text-center font-bold my-3">
                  <h1>
                    <span className="text-primary text-lg">
                      {t("ProductPage.card.from")}
                    </span>
                    <span>
                      {commaSpliter(
                        Math.floor(defproduct?.data?.price?.range.from)
                      )}
                      {defproduct?.data?.currency ??
                        t("ProductPage.card.currency")}
                    </span>
                  </h1>
                  &mdash;
                  <h1>
                    <span className="text-primary text-lg">
                      {t("ProductPage.card.to")}
                    </span>
                    <span>
                      {commaSpliter(
                        Math.floor(defproduct?.data?.price?.range.to)
                      )}{" "}
                      {defproduct?.data?.currency ??
                        t("ProductPage.card.currency")}
                    </span>
                  </h1>
                </div>
              </>
            )}

            {defproduct?.data?.price["fixed"] && (
              <h1
                className={`my-3 ${
                  defproduct?.data?.discount
                    ? "line-through text-[#777777]"
                    : "text-[#212121]"
                } text-xl leading-8 text-center font-bold`}
              >
                {commaSpliter(Math.floor(defproduct?.data?.price["fixed"]))}{" "}
                {defproduct?.data?.currency ?? t("ProductPage.card.currency")}
              </h1>
            )}

            {defproduct?.data?.price["highest"] && (
              <h1
                className={`my-3 text-xl text-[#212121] leading-8 text-center font-bold`}
              >
                {t("ProductPage.card.highestPrice")}
              </h1>
            )}

            {defproduct?.data?.unit &&
              !defproduct?.data?.price["highest"] &&
              !defproduct?.data?.discount && (
                <h1>
                  {locale == "ar" ? "لكل" : "per" + " "}{" "}
                  {typeof defproduct?.data?.unit === "string"
                    ? defproduct?.data?.unit
                    : defproduct?.data?.unit?.length > 0 &&
                      (locale === "ar"
                        ? defproduct?.data?.unit[0]?.value
                        : defproduct?.data?.unit[1]?.value)}
                </h1>
              )}
          </div>
          {defproduct?.data?.discount > 0 && (
            <div className="flex flex-col gap-4 my-5 text-[#666666] font-extrabold text-base">
              {defproduct?.data?.priceAfter && (
                <>
                  <div className="flex justify-between items-center">
                    <h1>{t("ProductPage.card.priceWithDiscount")}</h1>
                    <h1 className="text-[#EE2A2A] text-lg font-bold">
                      {commaSpliter(Math.floor(defproduct?.data?.priceAfter))}{" "}
                      {defproduct?.data?.currency ??
                        t("ProductPage.card.currency")}{" "}
                      {locale == "ar" ? "لكل" : "per" + " "}{" "}
                      {typeof defproduct?.data?.unit === "string"
                        ? defproduct?.data?.unit
                        : defproduct?.data?.unit?.length > 0 &&
                          (locale === "ar"
                            ? defproduct?.data?.unit[0]?.value
                            : defproduct?.data?.unit[1]?.value)}
                    </h1>
                  </div>
                </>
              )}
              {defproduct?.data?.discount > 0 ? (
                <div className="flex justify-between items-center">
                  <h1>{t("ProductPage.card.discountPercentage")}</h1>
                  <h1 className="text-[#EE2A2A] text-lg font-bold">
                    {locale == "ar"
                      ? convertNumbersToArabicNumerals(
                          defproduct?.data?.discount
                        )
                      : defproduct?.data?.discount}
                    {locale == "ar" ? "٪" : "%"}
                  </h1>
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <div className="mt-10">
            <h1 className="text-[#333333] uppercase font-bold">
              {t("ProductPage.card.qty")}
            </h1>
            <div
              id="counter"
              className="flex gap-3 font-bold text-[#999999] text-[20px] text-center max-w-[170px] w-full my-4"
            >
              <h3
                id="count"
                className="!text-[#212121] bg-white text-center border-[1px] p-3 text-[15px]"
              >
                {locale == "ar"
                  ? convertNumbersToArabicNumerals(counterValue)
                  : counterValue}
              </h3>
              <button
                id="increment"
                className=" bg-white hover:bg-gray-200 text-center hover:border-[#d1d1d1] border-[1px] w-full transition-all duration-300 ease-in-out "
                onClick={() => {
                  dispach(
                    increment({
                      id: defproduct?.data?._id,
                    })
                  );
                }}
              >
                +
              </button>

              <button
                id="decrement"
                className=" bg-white hover:bg-gray-200 text-center hover:border-[#d1d1d1] border-[1px] w-full transition-all duration-300 ease-in-out "
                onClick={() => {
                  dispach(
                    decrement({
                      id: defproduct?.data?._id,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-3 font-bold text-xs">
            <div className="flex items-center justify-between gap-3 w-full">
              <button
                type="submit"
                onClick={() => addProductToCart(counterValue)}
                className="bg-primary hover:bg-secondary text-white w-full flex justify-center items-center gap-2 py-3 transition-all duration-300 ease-in-out"
              >
                <IoIosCart className=" text-[15px]" />
                <h1>{t("ProductPage.card.buttons.order")}</h1>
              </button>

              {/* <button className="bg-primary hover:bg-secondary text-white w-full text-center py-3 cursor-not-allowed transition-all duration-300 ease-in-out">
                {t("ProductPage.card.buttons.seeSimilarItems")}{" "}
              </button> */}
            </div>

            {fav?.data?.find((e: any) => e._id === id) ? (
              <button
                onClick={removeProductFromFav}
                className="bg-white hover:bg-gray-200 hover:border-[#d1d1d1] border-[1px] py-3 w-full transition-all duration-300 ease-in-out"
              >
                {t("ProductPage.card.buttons.removeFromWishlist")}{" "}
              </button>
            ) : (
              <button
                onClick={addProductTofav}
                className="bg-white hover:bg-gray-200 hover:border-[#d1d1d1] border-[1px] py-3 w-full transition-all duration-300 ease-in-out"
              >
                {t("ProductPage.card.buttons.addToWishlist")}{" "}
              </button>
            )}
          </div>
        </div>
      </section>
      {defproduct?.data?.description && (
        <section
          id="productDescription"
          className={`${PageStylesRespo} my-10 container max-w-6xl`}
        >
          <h1 className="font-bold text-sm mx-4">
            {t("ProductPage.sections.titles.productDescription")}
          </h1>
          <div className="mt-6 border-[1px] border-[#EAEAEA]  bg-[#f5fff5] shadow-md p-4">
            <p>
              {typeof defproduct?.data?.description === "string"
                ? defproduct?.data?.description
                : defproduct?.data?.description?.length > 0 &&
                  (locale === "ar"
                    ? defproduct?.data?.description[0]?.value
                    : defproduct?.data?.description[1]?.value)}
            </p>
          </div>
        </section>
      )}
      {sameProductWithDefProp?.length > 0 && (
        <section
          id="sameProductWithDefProp"
          className={`${PageStylesRespo} container max-w-6xl my-10`}
        >
          <h1 className="font-bold text-sm mx-4">
            {t("ProductPage.sections.titles.sameProductWithDefProp.title")}
          </h1>
          <div className="mt-6 border-[1px] border-[#EAEAEA]  bg-[#f5fff5] shadow-md px-4 py-6 flex flex-col divide-y divide-solid-[#212121]">
            <ProductsCont
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              products={sameProductWithDefProp}
              className="w-full !h-full"
            />
          </div>
        </section>
      )}
      {defproduct?.data?.props && defproduct?.data?.props?.length > 0 && (
        <section
          id="additionalInfo"
          className={`${PageStylesRespo} container max-w-5xl my-10`}
        >
          <h1 className="font-bold text-sm mx-4">
            {t("ProductPage.sections.titles.additionalInfo.title")}
          </h1>

          <div className="mt-6 border-[1px] border-[#EAEAEA]  bg-[#f5fff5] shadow-md p-4 flex flex-col divide-y divide-solid-[#212121]">
            {defproduct?.data?.props.map((prop: any, index: number) => (
              <div
                key={index}
                className={`flex items-center justify-between md:justify-normal ${
                  index === defproduct.data.props.length - 1
                    ? "pt-3"
                    : index === 0
                    ? "pb-3"
                    : "py-3"
                }`}
              >
                <h2 className="md:w-[30%]">{prop.title}</h2>
                <h2 className="md:w-[50%]">
                  {prop.values.map((value: string, i: number) => (
                    <span key={i} className="">
                      {value} {i === prop.values.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </h2>
              </div>
            ))}
          </div>
        </section>
      )}

      {defproduct?.data?.tags && defproduct?.data?.tags?.length > 0 && (
        <section
          id="tags"
          className={`${PageStylesRespo} container max-w-4xl my-10`}
        >
          {/* <h1 className="font-bold text-sm mx-4">
            {t("ProductPage.sections.titles.tags.title")}
          </h1> */}
          <div className="mt-6 border-[1px] border-[#EAEAEA]  bg-[#f5fff5] shadow-md px-4 py-6 flex flex-col divide-y divide-solid-[#212121]">
            <div className="flex items-center gap-3">
              <Accordion className="w-full" type="single" collapsible>
                <AccordionItem value="item-1" className="w-[40%]">
                  <AccordionTrigger t={t} view="arrows">
                    <h1 className="font-semibold">
                      {t("ProductPage.sections.titles.tags.title")}
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    {defproduct?.data?.tags.map((tag: any, index: number) => (
                      <span key={index}>
                        {tag}
                        {index === defproduct?.data?.tags?.length - 1
                          ? ""
                          : ", "}
                      </span>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      )}

      <section
        id="reviews"
        className={`${PageStylesRespo} container max-w-4xl my-10`}
      >
        <h1 className="font-bold text-sm mx-4">
          {t("ProductPage.sections.titles.reviews.header")}
        </h1>
        <div className="mt-6 border-[1px] border-[#EAEAEA] text-[#333333] bg-[#f5fff5] shadow-md px-4 py-6 flex flex-col">
          <h1 className="text-xl border-b-[1px] pb-1">
            {t("ProductPage.sections.titles.reviews.subHeader")} (
            {typeof defproduct?.data?.name === "string"
              ? defproduct?.data?.name
              : defproduct?.data?.name?.length > 0 &&
                (locale === "ar"
                  ? defproduct?.data?.name[0]?.value
                  : defproduct?.data?.name[1]?.value)}
            )
          </h1>
          <div className="mt-6 border-b-[1px] pb-2">
            <h1 className="text-base font-bold mb-3">
              {t("ProductPage.sections.titles.reviews.title")}
            </h1>
            <h1 className="text-sm">
              {t("ProductPage.sections.titles.reviews.subtitle")}
            </h1>
          </div>

          <form
            id="reviewForm"
            onSubmit={handleSubmit}
            onReset={() => resetForm()}
            className=""
          >
            <div className="divide-y-[1px]">
              <div className="p-2">
                <div
                  className={`flex items-center justify-end gap-4 font-bold`}
                >
                  {numbers.map((item: any, index: number) => (
                    <h1
                      key={index}
                      className={`m-[5px] h-[18px] text-center ${
                        index === numbers.length - 1
                          ? "lg:w-[80px]"
                          : "w-[18px]"
                      }`}
                    >
                      *{item[`${locale}`]}
                    </h1>
                  ))}
                </div>
              </div>
              {ratings.map((rating, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2"
                >
                  <h1 className="text-base font-bold">{rating}</h1>
                  <CircleRating
                    totalCircles={5}
                    rateTitle={RatingsLocalized[rating]}
                    selectedRating={selectedRating}
                    setSelectedRating={setSelectedRating}
                  />
                </div>
              ))}
            </div>

            <div className="relative">
              <div
                className={`flex gap-10 md:gap-14 flex-col md:flex-row justify-between text-[#333333] text-[14px] leading-[18px] my-5 md:mt-3 md:mb-2 transition-all duration-300 ease-in-out`}
              >
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-col gap-2">
                    <Label>
                      {t("ProductPage.sections.titles.reviews.form.firstName")}
                    </Label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      onInput={handleInputChange}
                      type="text"
                      name="firstName"
                      className={`border border-[#999999] ${
                        disableInput
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      } py-2 px-3 outline-none`}
                      disabled={disableInput}
                    />
                    <ValidationError
                      isErr={
                        errors?.firstName && touched?.firstName ? true : false
                      }
                      message={(errors?.firstName as string) || ""}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>
                      {t("ProductPage.sections.titles.reviews.form.lastName")}{" "}
                    </Label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      onInput={handleInputChange}
                      type="text"
                      name="lastName"
                      className={`border border-[#999999]  ${
                        disableInput
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-white"
                      }  py-2 px-3 outline-none`}
                      disabled={disableInput}
                    />
                    <ValidationError
                      isErr={
                        errors?.lastName && touched?.lastName ? true : false
                      }
                      message={(errors?.lastName as string) || ""}
                    />
                  </div>
                </div>
                <div className="w-full h-full">
                  <Label>
                    {t("ProductPage.sections.titles.reviews.form.review")}
                  </Label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    onInput={handleInputChange}
                    name="comment"
                    className={`border border-[#999999]  ${
                      disableInput
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-[#F0FFF0]"
                    } py-2 px-3 w-full min-h-[95px] h-full outline-none`}
                    disabled={disableInput}
                  />
                  <ValidationError
                    isErr={errors?.comment && touched?.comment ? true : false}
                    message={(errors?.comment as string) || ""}
                  />
                  <button
                    disabled={ratingLoading}
                    type="submit"
                    className="flex items-center gap-3 py-2 px-4 border-[1px] bg-white text-xs mt-3"
                  >
                    {ratingLoading ? (
                      <ButtonLoading
                        className="text-[#070707] font-bold"
                        text={t(
                          "ProductPage.sections.titles.reviews.form.button"
                        )}
                      />
                    ) : (
                      <>
                        <h1 className="text-[#070707] font-bold">
                          {t("ProductPage.sections.titles.reviews.form.button")}
                        </h1>
                        <IoPlay className="text-lg" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <motion.div
                className={`w-full h-full flex flex-col justify-center items-center text-lg font-semibold uppercase transition-all duration-300 ease-in-out`}
                initial={{ opacity: 0 }}
                animate={disableInput ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0, 0.01, 0, 0.7],
                }}
              >
                <h1
                  className={`transition-all duration-1000 ease-in-out hover:underline text-red-500 animate-`}
                >
                  {t("toasts.loginAlert")}
                </h1>
              </motion.div>
            </div>
          </form>

          {(defproduct?.data?.averageRatingQuality > 0 ||
            defproduct?.data?.averageRatingPrice > 0 ||
            defproduct?.data?.averageRatingValue > 0) && (
            <div>
              <h1 className="font-bold text-base mb-5">
                {t("ProductPage.sections.titles.customerReviews")}
              </h1>
              <div className="font-extrabold text-xs text-[#333333] flex flex-col gap-2 w-full max-w-[400px] mb-5">
                {defproduct?.data?.averageRatingPrice > 0 && (
                  <div className="flex items-center gap-6">
                    <h1 className="w-[10%]">
                      {t("ProductPage.sections.titles.reviews.rating.Price")}
                    </h1>
                    <StarRating rating={defproduct?.data?.averageRatingPrice} />
                  </div>
                )}

                {defproduct?.data?.averageRatingValue > 0 && (
                  <div className="flex items-center gap-6">
                    <h1 className="w-[10%]">
                      {t("ProductPage.sections.titles.reviews.rating.Value")}
                    </h1>
                    <StarRating rating={defproduct?.data?.averageRatingValue} />
                  </div>
                )}

                {defproduct?.data?.averageRatingQuality > 0 && (
                  <div className="flex items-center gap-6">
                    <h1 className="w-[10%]">
                      {t("ProductPage.sections.titles.reviews.rating.Quality")}
                    </h1>
                    <StarRating
                      rating={defproduct?.data?.averageRatingQuality}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {defproduct?.data?.comments?.map(
                  (comment: any, index: number) => (
                    <div
                      key={index}
                      className="border-b-[1px] pt-2 pb-3 flex flex-col gap-2"
                    >
                      <div>
                        <p className="text-lg">{comment?.comment}</p>
                        <span className="text-sm text-[#999999]">
                          {locale == "en" ? "Review by" : "مراجعة من"}{" "}
                          {comment?.first_name} ({comment?.last_name}) / (
                          {locale == "en"
                            ? `Posted on ` +
                              dayjs(comment?.date).format("DD/MM/YYYY h:mm A")
                            : `نشرت في` +
                              " " +
                              localeDayjs.postformat(
                                dayjs(comment?.date).format("DD/MM/YYYY h:mm A")
                              )}
                          ){" "}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {similarProductsDefProp?.length > 0 && (
        // <section
        //   id="similarProductsDefProp"
        //   className={`${PageStylesRespo} container my-10 w-full`}
        // >
        //   <h1 className="font-bold text-sm">
        //     {t("ProductPage.sections.titles.similarProductsDefProp.title")}
        //   </h1>
        //   <div className="mt-6 w-full flex flex-col divide-y divide-solid-[#212121]">
        //     <ProductsCont
        //       products={similarProductsDefProp}
        //       className="w-full !h-full"
        //     />
        //   </div>
        // </section>
        <section
          id="similarProductsDefProp"
          className={`${PageStylesRespo} container w-full mx-auto xl:mx-0 my-10`}
        >
          <h1 className="font-bold text-sm mx-4">
            {t("ProductPage.sections.titles.similarProductsDefProp.title")}
          </h1>
          <div className="mt-6 w-full  flex flex-col divide-y divide-solid-[#212121]">
            <ProductsCont
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              products={similarProductsDefProp}
              className="w-full !h-full"
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsComp;
