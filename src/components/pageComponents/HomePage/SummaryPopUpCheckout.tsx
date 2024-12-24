import React from "react";
import { close } from "@/redux/reducer/cartSlice";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { createOrder } from "@/redux/reducer/orderSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  checkoutData: any;
  setOpen: (value: boolean) => void;
  closeCheckoutPopUp: (value: boolean) => void;
  fullDataSubmit: any;
  removeItem: (parameter: string) => void;
};

const SummaryPopUpCheckout = ({
  open,
  setOpen,
  closeCheckoutPopUp,
  fullDataSubmit,
  removeItem,
  checkoutData,
}: Props) => {
  const t = useTranslations("checkout");
  const tCart = useTranslations("Cart");
  const tGlobal = useTranslations("");
  const { locale } = useParams();

  const dispatch = useDispatch();

  const setOpenCart = (e: any) => {
    dispatch(close());
  };

  const HandleCheckout = async (e: any) => {
    e.preventDefault();
    //@ts-ignore
    await dispatch(createOrder(fullDataSubmit));
    removeItem(checkoutData?._id);
    closeCheckoutPopUp(false);
    if (setOpenCart) setOpenCart(false);
  };

  const CancelDataSubmit = (e: any) => {
    e.preventDefault();
    setOpen(false);
  };

  const FullDataSubmitArray = Object.entries(fullDataSubmit.info)
    .map(([key, value]) => ({ [key]: value }))
    .sort((a, b) => Object.keys(a)[0].localeCompare(Object.keys(b)[0]))
    .filter((item) => Object.keys(item)[0] !== "phoneCode");

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed w-screen h-screen duration-500 scale-100 ${
          open ? "scale-100" : "scale-0 opacity-0"
        } bg-[rgba(34,34,34,0.6)] top-0 right-0 z-50`}
      ></div>
      <div
        className={`z-50 w-[85%] xxl:w-[70%]  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500  ${
          open ? "scale-100" : "scale-0 opacity-0"
        } rounded-md bg-white p-6 text-[#212121]`}
      >
        <h1 className="text-xl md:text-2xl mb-5 font-semibold">
          {t("orderSummary")}
        </h1>

        <div className="my-5 overflow-y-auto md:overflow-hidden h-full max-h-96 flex flex-col gap-3 xl:gap-5">
          <div className="w-full bg-slate-200 bg-opacity-80 p-2 rounded-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-10 w-full md:w-fit ">
              {FullDataSubmitArray.map(
                (item: any, index: number) =>
                  item[Object.keys(item)[0]] && (
                    <div key={index} className="flex gap-3 items-center w-fit">
                      <h1 className="text-xs md:text-sm xxl:text-base text-gray-400">
                        {t(`labels.${Object.keys(item)[0]}`)}:
                      </h1>
                      <h2
                        className={``}
                        dir={`${Object.keys(item)[0] === "phone" && "ltr"}`}
                      >
                        {Object.keys(item)[0] === "phone"
                          ? `${fullDataSubmit.info.phoneCode} ${item.phone}`
                          : item[Object.keys(item)[0]]}
                      </h2>
                    </div>
                  )
              )}
            </div>
          </div>

          <div className="text-sm">
            <h1 className="text-base md:text-lg mb-2 font-semibold">
              {t("productDetails")}
            </h1>
            {checkoutData.name && (
              <div className="flex gap-2 items-center w-fit">
                <h1 className="text-xs md:text-sm xxl:text-base text-gray-400">
                  {tCart("productName")}:
                </h1>
                <h2>
                  {checkoutData.name +
                    " " +
                    (locale === "ar"
                      ? `${convertNumbersToArabicNumerals(
                          checkoutData.quantity
                        )}x `
                      : `x${checkoutData.quantity}`)}
                </h2>
              </div>
            )}
            {checkoutData.category.name && (
              <div className="flex gap-2 items-center w-fit">
                <h1 className="text-xs md:text-sm xxl:text-base text-gray-400">
                  {tCart("category")}:
                </h1>
                <h2>{checkoutData.category.name}</h2>
              </div>
            )}
            {checkoutData.discount && (
              <div className="flex gap-2 items-center w-fit">
                <h1 className="text-xs md:text-sm xxl:text-base text-gray-400">
                  {tCart("discount")}:
                </h1>
                <h2>
                  {locale === "ar"
                    ? convertNumbersToArabicNumerals(checkoutData.discount)
                    : checkoutData.discount}{" "}
                  {tGlobal("percent")}
                </h2>
              </div>
            )}
            {checkoutData.price && (
              <div className="flex gap-2 items-center w-fit">
                <h1 className="text-xs md:text-sm xxl:text-base text-gray-400">
                  {tCart("price")}
                </h1>
                {checkoutData.price.fixed &&
                  (checkoutData.discount ? (
                    <div className="flex gap-1 items-center">
                      <h2 className="line-through opacity-60">
                        {locale === "ar"
                          ? convertNumbersToArabicNumerals(
                              checkoutData.price.fixed
                            )
                          : checkoutData.price.fixed}{" "}
                        {checkoutData?.currency ?? tCart("currency")}{" "}
                      </h2>
                      <h2 className="text-[#F54702]">
                        {locale === "ar"
                          ? convertNumbersToArabicNumerals(
                              checkoutData.priceAfter
                            )
                          : checkoutData.priceAfter}{" "}
                        {checkoutData?.currency ?? tCart("currency")}{" "}
                      </h2>
                    </div>
                  ) : (
                    <h2>
                      {locale === "ar"
                        ? convertNumbersToArabicNumerals(
                            checkoutData.price.fixed
                          )
                        : checkoutData.price.fixed}{" "}
                      {checkoutData?.currency ?? tCart("currency")}{" "}
                    </h2>
                  ))}

                {checkoutData.price.range && (
                  <div className="flex gap-1 items-center">
                    <h1>
                      {locale === "ar"
                        ? convertNumbersToArabicNumerals(
                            checkoutData.price["range"].from
                          )
                        : checkoutData.price["range"].from}{" "}
                      {checkoutData?.currency ?? tCart("currency")}{" "}
                    </h1>
                    &mdash;
                    <h2>
                      {locale === "ar"
                        ? convertNumbersToArabicNumerals(
                            checkoutData.price["range"].to
                          )
                        : checkoutData.price["range"].to}{" "}
                      {checkoutData?.currency ?? tCart("currency")}{" "}
                    </h2>
                  </div>
                )}

                {checkoutData.price["highest"] && <h1>{tCart("highest")} </h1>}
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex items-center flex-col md:flex-row justify-center gap-3 md:gap-5">
          <button
            onClick={HandleCheckout}
            type="button"
            className="text-white max-w-xs bg-primary hover:bg-[#212121] transition-all duration-300 ease-in-out font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center uppercase"
          >
            {t("checkoutBtn")}
          </button>
          <button
            type="button"
            onClick={CancelDataSubmit}
            className="text-primary border border-primary max-w-xs bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center uppercase"
          >
            {t("cancelBtn")}
          </button>
        </div>
      </div>
    </>
  );
};

export default SummaryPopUpCheckout;
