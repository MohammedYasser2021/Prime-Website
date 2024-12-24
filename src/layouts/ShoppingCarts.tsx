"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { deleteCart, getCart } from "@/redux/reducer/userSlice";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { useParams, useRouter } from "next/navigation";

import Checkout from "@/components/pageComponents/HomePage/checkout";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { close } from "@/redux/reducer/cartSlice";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";

export default function ShoppingCarts() {
  const t = useTranslations("Cart");
  let subtotal = 0;
  const dispach = useAppDispach();
  const { locale } = useParams();
  const Logged = getCookie("token");
  const [openCheckout, setOpenCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState("");

  const router = useRouter();
  const open = useAppSelector((state) => state.cartData.open);
  const cartData = useAppSelector((state) => state.userData.cart);
  const setOpen = (e: any) => {
    dispach(close());
  };

  useEffect(() => {
    if (Logged) dispach(getCart());
  }, [dispach]);
  useEffect(() => {}, [cartData]);
  const removeItem = (id: string) => {
    if (Logged) dispach(deleteCart(id));
  };

  const handleSubmit = (product: any) => {
    if (Logged) {
      setOpenCheckout(true);
      setCheckoutData(product);
    } else {
      router.push("/log-in");
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-5">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {t("shopping_cart")}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="">
                          <div className="flow-root">
                            <ul role="list" className="my-6">
                              {cartData?.data?.map(
                                (product: any, index: number) => (
                                  <li
                                    key={index}
                                    className="border-b border-gray-500 last:border-b-0 first:pt-0 last:pb-0 py-6 sm:py-7"
                                  >
                                    <h1 className="text-lg font-medium text-gray-800 sm:text-xl border-b-[1.5px] border-gray-800 w-fit">
                                      {product?.vendor?.name &&
                                        product.vendor.name
                                          .charAt(0)
                                          .toUpperCase() +
                                          product.vendor.name.slice(1)}{" "}
                                      <span className="text-gray-600">
                                        ({product.products.length})
                                      </span>
                                    </h1>
                                    {/* Product */}
                                    {product.products?.map(
                                      (product: any, i: number) => (
                                        <div
                                          key={i}
                                          className={`px-2 flex flex-col w-full border-b border-gray-200 last:border-b-0 pb-6 last:pb-0`}
                                        >
                                          <div className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                              <Image
                                                width={5000}
                                                height={5000}
                                                src={product?.card_img}
                                                alt={product?.name}
                                                className="h-full w-full object-cover object-center"
                                              />
                                            </div>

                                            <div className="mx-4 flex flex-1 flex-col">
                                              <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                  <Link
                                                    href={`/shop/${product?.id}`}
                                                  >
                                                    {product?.name}
                                                  </Link>
                                                </h3>
                                                <p className="">
                                                  {product?.price?.range && (
                                                    <div className="flex gap-2 items-center text-sm mt-1">
                                                      <h1 className="text-gray-500 ">
                                                        {t("price")}
                                                      </h1>
                                                      <div className="flex gap-1 items-center">
                                                        <h1>
                                                          {locale === "ar"
                                                            ? convertNumbersToArabicNumerals(
                                                                product?.price[
                                                                  "range"
                                                                ].from
                                                              )
                                                            : product?.price[
                                                                "range"
                                                              ].from}{" "}
                                                          {product?.currency ??
                                                            t("currency")}{" "}
                                                        </h1>
                                                        &mdash;
                                                        <h2>
                                                          {locale === "ar"
                                                            ? convertNumbersToArabicNumerals(
                                                                product?.price[
                                                                  "range"
                                                                ].to
                                                              )
                                                            : product?.price[
                                                                "range"
                                                              ].to}{" "}
                                                          {product?.currency ??
                                                            t("currency")}{" "}
                                                        </h2>
                                                      </div>
                                                    </div>
                                                  )}
                                                  {product?.price?.fixed && (
                                                    <div className="flex gap-2 items-center text-sm mt-1">
                                                      <h1 className="text-gray-500 ">
                                                        {t("price")}
                                                      </h1>
                                                      <h1
                                                        className={`${
                                                          product?.discount > 0
                                                            ? "line-through"
                                                            : ""
                                                        }`}
                                                      >
                                                        {locale === "ar"
                                                          ? convertNumbersToArabicNumerals(
                                                              product?.price[
                                                                "fixed"
                                                              ]
                                                            )
                                                          : product?.price[
                                                              "fixed"
                                                            ]}{" "}
                                                        {product?.currency ??
                                                          t("currency")}{" "}
                                                      </h1>
                                                      {product?.discount >
                                                        0 && (
                                                        <h1 className="text-[#F54702]">
                                                          {locale === "ar"
                                                            ? convertNumbersToArabicNumerals(
                                                                product?.priceAfter
                                                              )
                                                            : product?.priceAfter}{" "}
                                                          {product?.currency ??
                                                            t("currency")}{" "}
                                                        </h1>
                                                      )}
                                                    </div>
                                                  )}
                                                  {product?.price?.highest && (
                                                    <div className="flex gap-2 items-center text-sm mt-1">
                                                      <h1 className="text-gray-500 ">
                                                        {t("price")}
                                                      </h1>
                                                      <h1>{t("highest")} </h1>
                                                    </div>
                                                  )}
                                                </p>
                                              </div>
                                              {product?.discount > 0 && (
                                                <p className="mt-1 text-sm text-gray-500 flex gap-2 items-center">
                                                  <h1>{t("discount") + ":"}</h1>
                                                  <h2>
                                                    {locale == "ar"
                                                      ? convertNumbersToArabicNumerals(
                                                          product?.discount
                                                        ) + " ٪ "
                                                      : product?.discount +
                                                        " % "}
                                                  </h2>
                                                </p>
                                              )}

                                              <div className="flex gap-1.5 items-center text-gray-500">
                                                <p>{t("category")}:</p>
                                                <p>{product?.category?.name}</p>
                                              </div>

                                              <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex gap-1.5 items-center">
                                                  <p className="text-gray-500">
                                                    {t("qty")}:
                                                  </p>
                                                  <p className="text-gray-500">
                                                    {locale === "ar"
                                                      ? convertNumbersToArabicNumerals(
                                                          product?.quantity
                                                        )
                                                      : product?.quantity}
                                                  </p>
                                                </div>

                                                <button
                                                  onClick={() => {
                                                    removeItem(product?.id);
                                                  }}
                                                  type="button"
                                                  className="font-medium text-primary hover:text-secondary w-full"
                                                >
                                                  {t("remove")}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            onClick={() => {
                                              handleSubmit(product);
                                            }}
                                            className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary transition-all duration-300 ease-in-out"
                                          >
                                            {t("checkout")}
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>{t("total")}</p>
                          {cartData?.result && (
                            <p>
                              {locale === "ar"
                                ? convertNumbersToArabicNumerals(
                                    cartData?.result
                                  )
                                : cartData?.result}
                            </p>
                          )}
                        </div>
                        {/* <p className="mt-0.5 text-sm text-gray-500">
                          {t("taxesInclusive")}
                        </p> */}

                        <div className="mt-6 flex flex-col justify-center text-center text-sm text-gray-500">
                          {/* <hr
                            className="hr-text gradient"
                            data-content={t("orTxt")}
                          /> */}
                          <Link href={"/shop"} className="mx-auto">
                            <button
                              type="button"
                              dir={"ltr"}
                              className="font-medium text-primary hover:text-secondary flex items-center gap-2 justify-center"
                              onClick={() => setOpen(false)}
                            >
                              <h1>{t("continue_shopping")}</h1>
                              <FaLongArrowAltRight className="text-base mt-0.5" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {openCheckout && (
        <Checkout
          open={openCheckout}
          setOpen={setOpenCheckout}
          checkoutData={checkoutData}
          closeDrawerCart={setOpen}
          removeItem={removeItem}
        />
      )}
    </>
  );
}
