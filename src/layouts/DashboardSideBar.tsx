"use client";

import Accordion from "@/components/Accordion";
import Dropdown from "@/components/Inputs/Dropdown";
import OptImage from "@/components/OptImage";
import Profile from "@/components/Profile";
import { SIDEBAR_ITEMS } from "@/costants/SIDEBAR_ITEMS";
import changeLanguage, { Language } from "@/utils/changeLanguageHandler";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiGlobalLine } from "react-icons/ri";

const languages = [
  {
    label: "العربية",
    value: "ar",
  },
  {
    label: "English US",
    value: "en",
  },
];

interface Props {
  children?: React.ReactNode;
  initialLang?: Language;
}

const DashboardSideBar: React.FC<Props> = ({ children, initialLang }) => {
  const sidebarSection_t = useTranslations("sidebar_sections");
  const sidebarSubitems_t = useTranslations("sidebar_subitems");
  const router = useRouter();
  const pathName = usePathname();
  const [selectedLang, setSelectedLang] = React.useState<undefined | string>(
    initialLang
  );

  const handleLanguageChange = (newVal: Language) => {
    if (newVal === selectedLang) {
      console.log("no change");
      return;
    }
    setSelectedLang(newVal);
    console.log("new vlue :", newVal);
    const newPath = changeLanguage(newVal, pathName);
    console.log("new path  :", newPath);
    router.push(newPath);
  };
  const [drawerOpened, setDrawerOpened] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setDrawerOpened(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`flex flex-1   ${
        drawerOpened ? "overflow-y-hidden h-[100vh] " : "min-h-[100vh]"
      } `}
    >
      <div
        onClick={() => {
          setDrawerOpened(false);
        }}
        className={`  bg-black  w-[100%] h-[100vh]  flex  absolute  transition-opacity lg:opacity-0 lg:-z-10 ease-in-out duration-500 ${
          drawerOpened
            ? "opacity-25 z-10  "
            : "opacity-0  pointer-events-none  "
        }`}
      ></div>
      <div
        className={` rtl:right-0 ltr:left-0  lg:w-[22%] overflow-y-hidden  flex transition-all duration-500 ease-in-out  h-[100vh]  absolute lg:sticky   top-0  ${
          drawerOpened ? "w-3/5" : "w-0"
        }    flex-col z-20 bg-white `}
      >        
          <div className="w-full resize h-24 my-4  relative">
            <OptImage src="/logo.svg" className="mx-auto" fill alt="ourLogo" />
          </div>

        <nav
          className={` flex flex-col  flex-1 overflow-y-auto gap-4 pb-6 `}
        >
          {SIDEBAR_ITEMS.map((item, itemIndex) => {
            return (
              <div key={item.key} className="gap-3 flex flex-col">
                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">
                  {sidebarSection_t(item.key)}
                </label>
                {item.subItems.map((subItem, subItemIndex) => {
                  const isLastItem =
                    itemIndex + 1 === SIDEBAR_ITEMS.length &&
                    subItemIndex + 1 === item.subItems.length;
                  return (
                    // <Link
                    //   key={subItem.key}
                    //   className={`flex items-center ${
                    //     isLastItem && "mb-6"
                    //   } gap-5 px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200  hover:text-gray-700 ${""}`}
                    //   href={subItem.path}
                    // >
                    //   <subItem.icon />
                    //   <span className=" text-sm font-medium">
                    //     {sidebarSubitems_t(subItem.key)}
                    //   </span>
                    // </Link>
                    <Accordion path={subItem.path} subItems={subItem.subItems} key={subItem.key}>
                      <subItem.icon />
                       <span className=" text-sm font-medium">
                         {sidebarSubitems_t(subItem.key)}
                       </span> 
                    </Accordion>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>
      <div className={` w-full flex lg:w-[78%] flex-col`}>
        <div className="flex   h-24 justify-between p-6  items-center border-b-2 visible ">
          <Profile email="fouad.magdy772@gmail.com" profileName="Fouad" />
          <Dropdown
            classes="hidden lg:flex"
            title="اللغة"
            onChangeValue={(item) => {
              handleLanguageChange(item.value as any);
            }}
            renderIcon={() => {
              return <RiGlobalLine className=" text-2xl text-gray-700 " />;
            }}
            value={languages.find((lang) => lang.value === selectedLang)?.label}
            items={languages}
          />
          <AiOutlineMenu
            onClick={() => {
              setDrawerOpened(true);
            }}
            className="text-2xl flex lg:hidden cursor-pointer"
          />
        </div>
        <main className="w-[100%] h-[100%]">{children}</main>
      </div>
    </div>
  );
};

export default DashboardSideBar;
