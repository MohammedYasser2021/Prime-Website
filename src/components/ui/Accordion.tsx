import { motion } from "framer-motion";
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
// import { useTranslation } from "react-i18next";
import Link from "next/link";

interface PropTypes {
  children: React.ReactNode;
  subItems?:
    | { title: string; link: string; icon: React.ElementType }[]
    | undefined;
  path?: string;
}
const Accordion: React.FC<PropTypes> = ({ children, subItems, path }) => {
  const pathName = window.location.pathname;
  const locale = pathName.split("/")[1];
  const [isOpened, setIsOpened] = useState(false);
  // const { t } = useTranslation("sidebar_subitems");

  return (
    <div className="flex flex-col relative my-1">
      {subItems ? (
        <div
          onClick={() => setIsOpened((prev) => !prev)}
          className="w-full flex cursor-pointer justify-between items-center gap-5  px-2 py-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700 "
        >
          <div className="flex gap-2 items-center">{children}</div>
          <motion.div animate={{ rotate: isOpened ? 180 : 0 }}>
            <ArrowDown className="text-3xl text-gray-500" />
          </motion.div>
        </div>
      ) : (
        <Link
          className="w-full flex cursor-pointer items-center gap-5  px-3 py-3 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700 "
          href={`/${locale}/${path}`}
        >
          {children}
        </Link>
      )}
      <ul className="list-disc ">
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[95%] mx-auto p-3 flex flex-col   text-base text-black  "
          >
            {subItems?.map((item, index) => (
              <Link key={index} href={`${item.link}`} className="">
                <li
                  className={`${
                    pathName.split("/")[2] === item.title
                      ? "bg-transparent text-[#d6a146]"
                      : ""
                  } p-3 w-full flex transition-colors rounded-full cursor-pointer duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700`}
                >
                  <div className="mx-3">
                    {" "}
                    <item.icon />{" "}
                  </div>

                  {item.title}
                </li>
              </Link>
            ))}
          </motion.div>
        )}
      </ul>
    </div>
  );
};

export default Accordion;
