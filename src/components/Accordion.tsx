import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import Link from "next/link";
import { RiArrowDropUpLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface PropTypes {
  children: React.ReactNode;
  subItems?: { title: string; link: string }[] | undefined;
  path?: string;
}
const Accordion: React.FC<PropTypes> = ({ children, subItems, path }) => {
  const pathName = usePathname();
  const locale = pathName.split("/")[1];
  const [isOpened, setIsOpened] = useState(false);
  const sidebarSubitems_t = useTranslations("sidebar_subsubItems");

  return (
    <div className="flex flex-col relative ">
      {subItems ? (
        <div
          onClick={() => setIsOpened((prev) => !prev)}
          className="w-full flex cursor-pointer justify-between items-center gap-5  px-3 py-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700 "
        >
          <div className="flex gap-2 items-center">{children}</div>
          <motion.div animate={{ rotate: isOpened ? 180 : 0 }}>
            <RiArrowDropUpLine className="text-3xl text-gray-500" />
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
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-[95%] mx-auto p-3 flex flex-col   text-sm  text-gray-600   "
          >
            {subItems?.map((item, index) => (
              <Link
                key={index}
                href={`/${locale}/${item.link}`}
                className="transition-colors rounded-md cursor-pointer p-3 duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700"
              >
                {sidebarSubitems_t(item.title)}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
