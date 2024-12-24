import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/AccordionShadcn";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

import { BiBarChartAlt2 } from "react-icons/bi";
import { CookieValueTypes } from "cookies-next";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import LocalizationButton from "../localizationButton";
import { SlLocationPin } from "react-icons/sl";
import { Tooltip } from "react-tooltip";
import logo from "@/../public/image.png";
import { useTranslations } from "next-intl";

type Props = {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  navigationItems: any;
  logged: CookieValueTypes;
  profileLogged: any;
  handleChangeSearch: any;
  handleSubmitSearch: any;
};

const SideMenuComponent = ({
  openDrawer,
  setOpenDrawer,
  navigationItems,
  logged,
  profileLogged,
  handleChangeSearch,
  handleSubmitSearch,
}: Props) => {
  const [open, setOpen] = useState({ index: 0, open: false });
  const { locale } = useParams();
  const t = useTranslations("NavBar");
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setOpenDrawer(false)}
        className={`fixed w-screen h-screen transition-all ease-in-out duration-100 ${
          openDrawer
            ? "translate-x-0"
            : "rtl:translate-x-full ltr:-translate-x-full opacity-0"
        } bg-[rgba(34,34,34,0.6)] top-0 right-0 z-40`}
      ></div>
      <div
        id="drawer-navigation"
        className={`${
          openDrawer
            ? "translate-x-0"
            : "rtl:-translate-x-full ltr:translate-x-full opacity-0"
        } fixed top-0 rtl:left-0 ltr:right-0 z-50 w-[80%] h-screen overflow-y-auto p-4 transition-all ease-in-out duration-500 bg-white`}
      >
        <div className="flex items-center justify-between text-gray-600">
          <div className="max-w-[60px]">
            <Image
              className="w-full h-full"
              src={logo}
              width={2000}
              height={2000}
              alt="Your Company"
            />
          </div>

          <IoClose
            className="text-[26px] cursor-pointer bg-primary/25 rounded-md p-1"
            onClick={() => setOpenDrawer(false)}
          />
        </div>

        <div className="py-4 flex flex-col justify-between h-full">
          <ul className="space-y-2 flex flex-col gap-4 font-medium">
            <li className="md:hidden">
              <form
                onSubmit={handleSubmitSearch}
                className="w-full relative md:hidden"
              >
                <input
                  spellCheck="false"
                  type="search"
                  placeholder={t("searchForProducts")}
                  className="w-full text-[#212121] py-[12px] bg-[#e9ecef] px-3 outline-none placeholder:text-[#989898] text-sm"
                  onChange={handleChangeSearch}
                />
                <button
                  type="submit"
                  id="searchNavBar"
                  className="absolute rtl:left-2 ltr:right-2 top-1/2 -translate-y-1/2"
                >
                  <IoMdSearch className="text-primary text-[34px] hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-md cursor-pointer p-1" />
                  <Tooltip
                    anchorSelect="#searchNavBar"
                    content={t("Tooltips.search")}
                    place="bottom"
                  />
                </button>
              </form>
            </li>

            {navigationItems?.map((item: any, index: number) => (
              <li key={index} className="w-full flex flex-col gap-3 !mt-0">
                {item?.subs && item?.subs?.length > 0 ? (
                  <>
                    <Accordion
                      className="w-full"
                      type="single"
                      defaultValue={`item-${item[0]?._id}`}
                      collapsible
                    >
                      <AccordionItem value={`item-${item?._id}`} className="">
                        <AccordionTrigger t={t} view="arrows">
                          {typeof item?.name === "string"
                            ? item?.name
                            : item?.name.length > 0 &&
                              (locale === "ar"
                                ? item?.name[0].value
                                : item?.name[1].value)}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="">
                            <Link
                              href={
                                item?.clickable === false
                                  ? "/shop"
                                  : `/shop?category=${item?._id}`
                              }
                            >
                              <button
                                onClick={() => setOpenDrawer(false)}
                                className={`px-2 pb-2`}
                              >
                                <h1>
                                  {typeof item?.name === "string"
                                    ? item?.name
                                    : item?.name.length > 0 &&
                                      (locale === "ar"
                                        ? item?.name[0].value
                                        : item?.name[1].value)}
                                </h1>
                              </button>
                            </Link>
                            {item?.subs?.map((sub: any, i: number) => (
                              <div
                                key={i}
                                onClick={() => setOpenDrawer(false)}
                                className=" flex items-center gap-5 w-full px-2 py-2 hover:bg-[#dee2e6]"
                              >
                                <BiBarChartAlt2 />
                                <Link
                                  href={`/shop?category=${item?._id}&subCategory=${sub?._id}`}
                                  className="text-gray-700 text-sm w-full"
                                >
                                  {sub?.value}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                ) : (
                  <>
                    <Link
                      href={
                        item?.clickable === false
                          ? "/shop"
                          : `/shop?category=${item?._id}`
                      }
                      onClick={() => setOpenDrawer(false)}
                    >
                      <h1>
                        {typeof item?.name === "string"
                          ? item?.name
                          : item?.name.length > 0 &&
                            (locale === "ar"
                              ? item?.name[0].value
                              : item?.name[1].value)}
                      </h1>
                    </Link>
                  </>
                )}
              </li>
            ))}

            <li className="!mt-0">
              {!logged ? (
                <Link
                  onClick={() => setOpenDrawer(false)}
                  href={"/log-in"}
                  className="flex flex-col w-full text-xs xl:text-sm gap-3"
                >
                  <button className="bg-primary text-white py-2 xl:py-1.5 px-4 xl:px-5">
                    {t("buttons.login")}
                  </button>
                </Link>
              ) : (
                profileLogged.map((item: any, index: number) =>
                  item.link ? (
                    <Link href={"/profile"} key={index}>
                      <button
                        onClick={() => setOpenDrawer(false)}
                        className={`flex gap-8 justify-between w-full items-center rounded-md pb-4 text-sm`}
                      >
                        <h1>{item.title}</h1>
                        {item.icon}
                      </button>
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.onclick;
                        setOpenDrawer(false);
                      }}
                      className={`flex gap-8 justify-center w-full items-center text-white bg-primary py-2 text-sm`}
                    >
                      <h1>{item.title}</h1>
                    </button>
                  )
                )
              )}
            </li>

            {logged && (
              <li onClick={() => setOpenDrawer(false)} className="!mt-0">
                <Link
                  className=""
                  href="/profile"
                  onClick={() => localStorage.setItem("tab", "profile")}
                >
                  <button className="w-full text-center flex items-center gap-2 justify-center bg-primary hover:bg-[#295c52] transition-all duration-300 ease-in-out text-white py-2">
                    <SlLocationPin className="text-lg" />
                    <h2>{t("buttons.trackOrders")}</h2>
                  </button>
                </Link>
              </li>
            )}

            <li className="!mt-5 flex justify-center">
              <button onClick={() => setOpenDrawer(false)}>
                <LocalizationButton />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenuComponent;
