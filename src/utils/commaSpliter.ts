import { getCookie } from "cookies-next";

export const commaSpliter = (price: number, locale?: string) => {
    const locale2 = getCookie("NEXT_LOCALE") || "en-US";
  const formatterPrice = new Intl.NumberFormat(`${locale||locale2}-SA`, {
    //   style: "currency",
    //   currency: "SAR",
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatterPrice.format(price);
};