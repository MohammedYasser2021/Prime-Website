import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useParams, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import { BiBarChartAlt2 } from "react-icons/bi";
import Image from "next/image";
import { IoMdArrowDropright } from "react-icons/io";
import Link from "next/link";
import { TiArrowSortedDown } from "react-icons/ti";

type Props = {
  Icon?: React.ReactNode;
  current?: any;
  item: any;
  isSticky?: boolean;
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const Dropdown = ({ Icon, current, item, isSticky }: Props) => {
  const ref = useRef(null);
  const useSearch = useSearchParams();
  const queryParam = useSearch.get("results");
  const categoryParam = useSearch.get("category");
  const subCategoryParam = useSearch.get("subCategory");
  const { locale } = useParams();

  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild ref={ref} className="">
          <Link
            href={
              item?.clickable === false
                ? "/shop?results=all"
                : `/shop?category=${item?._id}`
            }
          >
            <button
              style={{
                cursor: item?.clickable === false ? "default" : "pointer",

                backgroundColor:
                  categoryParam === item?._id || queryParam === item?._id
                    ? "#9d9d9d7e"
                    : "",
                // categoryParam === item?._id
                //   ? "#9d9d9d7e"
                //   : !categoryParam && item?.bgColor
                //   ? item?.bgColor
                //   : "",
              }}
              className={`hover:!bg-[#9d9d9d49] text-[#282828] flex items-center gap-5 w-full transition-all duration-300 ease-in-out md:px-[18px] xl:px-8 xxl:px-10 md:py-4 xxl:py-[19.5px] text-base lg:text-lg xxl:text-xl leading-6 font-medium text-center`}
            >
              <h1 className="text-center w-fit whitespace-nowrap">
                {typeof item?.name === "string"
                  ? item?.name
                  : item?.name.length > 0 &&
                    (locale === "ar"
                      ? item?.name[0].value
                      : item?.name[1].value)}
              </h1>
              {item?.subs && item?.subs?.length > 0 && Icon}
            </button>
          </Link>
        </HoverCardTrigger>
        {item?.subs && item?.subs?.length > 0 && (
          <HoverCardContent
            className="w-full text-left bg-white rounded-b-sm !mt-0"
            //@ts-ignore
            style={{ width: ref?.current?.offsetWidth }}
          >
            <div className="p-2" role="none">
              {/* Dropdown menu items  */}
              {item?.subs?.map((option: any, index: number) => (
                <div key={index} className="">
                  {option && (
                    <div
                      style={{
                        backgroundColor:
                          subCategoryParam === option?._id ? "#9d9d9d7e" : "",
                      }}
                      className="flex items-center gap-2 px-2 py-2 my-1 hover:bg-[#dee2e6]"
                    >
                      <BiBarChartAlt2 />
                      <Link
                        href={`/shop?category=${item?._id}&subCategory=${option?._id}`}
                        className="text-gray-700 block  text-sm text-left w-full"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        {option?.value}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </>
  );
};

export default Dropdown;
