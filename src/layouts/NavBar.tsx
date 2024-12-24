"use client";

import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDown, ShoppingCart } from "lucide-react";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoIosCart, IoMdSearch } from "react-icons/io";
import { PiGlobeSimple, PiGlobeSimpleBold } from "react-icons/pi";
import { getCookie, getCookies } from "cookies-next";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { useParams, usePathname, useRouter } from "next/navigation";

import Dropdown from "@/components/Buttons/DropDown";
import DropdownMenu from "@/components/ui/dropdown-menu";
import EGY from "@/images/egypt.png";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import InstantSearch from "./InstantSearch";
import Link from "next/link";
import LocalizationButton from "./localizationButton";
import SideMenuComponent from "./SideMenu/sideMenuComponent";
import { SlLocationPin } from "react-icons/sl";
import Spinner from "@/components/Uitily/Spinner";
import { TbLogout } from "react-icons/tb";
import { TiArrowSortedDown } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import USA from "@/images/usa.png";

import { getAllCategory } from "@/redux/reducer/categorySlice";
import { getProfile } from "@/redux/reducer/userSlice";
import logo from "../../public/image.png";
import { logout } from "@/app/[locale]/(auth)/log-in/_api";
import { openCart } from "@/redux/reducer/cartSlice";
import { useTranslations } from "next-intl";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  {
    name: "Sign out",
    href: "/login",
    icon: <TbLogout className="text-2xl" />,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type dropdownProps = {
  title: string;
  icon: React.ReactNode;
  link?: string;
  onclick?: any;
};

function NavBar() {
  const dispach = useAppDispach();
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [openInstantSearch, setOpenInstantSearch] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const t = useTranslations("NavBar");
  const Logged = getCookie("token");
  const cartData = useAppSelector((state) => state.userData.cart);

  const handleScroll = () => {
    const firstSectionHeight = (
      document.getElementById("navigation_under_navbar") as HTMLElement
    )?.clientHeight;
    setSticky(window.scrollY > firstSectionHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [navigation, setNavigation] = useState([]);
  const [profile, setProfile] = useState<any>({});

  const categoriesData = useAppSelector((state) => state.categoryData.Category);
  const { isLoading: isLoadingUser } = useAppSelector(
    (state) => state.userData
  );

  const { product, isLoading: isLoadingProducts } = useAppSelector(
    (state: any) => state.productsData
  );

  useEffect(() => {
    dispach(getAllCategory());
    if (Logged) {
      dispach(getProfile()).then((data: any) => setProfile(data.payload?.data));
    }
  }, [dispach]);

  useEffect(() => {
    if (categoriesData?.data) {
      let arry: any = [];

      categoriesData?.data.forEach((data: any) => {
        arry.push({
          name: data.name,
          id: data.id,
          current: false,
        });
        console.log(arry);
      });
      setNavigation(arry);
      console.log(navigation);
    }
  }, [categoriesData]);

  const spreadCategories =
    categoriesData.filter((item: any) => item.enabled) || [];

  const list = [
    {
      name: t("navigation.allCategories.name"),
      bgColor: "#9d9d9d5e",
      clickable: false,
      _id: "all",
    },

    ...spreadCategories,
  ];

  const Logout = () => {
    logout();
  };

  const dropdownProfile: dropdownProps[] = [
    {
      title: t("buttons.profile"),
      icon: (
        <FaUser className="text-[32px] text-primary p-1.5 cursor-pointer" />
      ),
      link: "/profile",
    },
    {
      title: t("buttons.logout"),
      icon: (
        <FiLogOut className="text-[32px] text-primary rounded-md p-1 cursor-pointer" />
      ),
      onclick: Logout,
    },
  ];

  // Search function for navbar
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenInstantSearch(true);
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenInstantSearch(false);
    // Navigate to the shop page with the search query
    router.push(`/shop?query=${encodeURIComponent(searchInput)}`);
  };

  // Listen to the products if there are no data, then close the instant search
  useEffect(() => {
    if (product?.data?.length == 0) {
      setOpenInstantSearch(false);
    }
  }, [product]);

  // Listen to route changes to clear input field when navigating away from the shop page
  useEffect(() => {
    if (pathname !== `/${locale}/shop`) setSearchInput("");
  }, [pathname]);

  // Ensure this component only renders the icon on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <div
          onClick={() => setOpenInstantSearch(false)}
          className="flex text-[15px] md:gap-5 justify-between sps:gap-3 lg:gap-6 xxl:gap-5 xxxl:gap-8 tk:gap-10 py-3 md:pt-[15px] px-3 lg:px-[35px] items-center"
        >
          <Link href="/" className="max-w-[100px] xl:max-w-[180px] w-full">
            <Image
              className=""
              src={logo}
              width={217}
              height={109}
              priority
              alt="Your Company"
            />
          </Link>

          <form
            onSubmit={handleSubmit}
            className="hidden md:block md:w-[70%] lg:w-[50%] xxl:w-[55%] 2xl:w-[58%] xxxl:w-[60%] mx-auto relative"
          >
            <div className="relative w-full h-full">
              <input
                spellCheck="false"
                type="search"
                placeholder={t("searchForProducts")}
                className="w-full text-[#212121] py-[14px] rounded-md bg-[#e9ecef] px-5 outline-none placeholder:text-[#989898] "
                value={searchInput}
                onChange={handleChange}
              />
              <button
                type="submit"
                id="searchNavBar"
                className="absolute rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2"
              >
                <IoMdSearch className="text-primary text-[34px] hover:bg-primary/10 transition-all duration-300 ease-in-out rounded-md cursor-pointer p-1" />
                <Tooltip
                  anchorSelect="#searchNavBar"
                  content={t("Tooltips.search")}
                  place="bottom"
                />
              </button>
            </div>

            {searchInput && openInstantSearch && (
              <InstantSearch
                searchQuery={searchInput}
                setOpenInstantSearch={setOpenInstantSearch}
                openInstantSearch={openInstantSearch}
              />
            )}
          </form>

          <div
            className={`w-fit flex items-center justify-end gap-5 lg:gap-4 xxl:gap-5 font-medium text-[7px] lg:text-[11px] xl:text-sm xxl:text-[15px] tk:text-[17px]  leading-6`}
          >
            <button
              onClick={() => {
                dispach(openCart());
              }}
              type="button"
              id="cartNavBar"
              className=" relative rounded-sm transition-all duration-300 ease-in-out p-1 bg-[#e4e4e4] md:bg-transparent"
            >
              <div className="relative">
                {cartData?.result > 0 && (
                  <div
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 0px 15px, rgba(0, 0, 0, 0.22) 0px 3px 5px",
                    }}
                    className="bg-red-500 text-white rounded-full absolute -top-1.5 left-4 text-[10px] leading-tight pt-[3px] pb-0.5 px-1.5"
                  >
                    {cartData?.result}
                  </div>
                )}
                <IoIosCart className="text-primary text-[22px] xl:text-[26px] cursor-pointer" />
              </div>
              <Tooltip
                anchorSelect="#cartNavBar"
                content={t("Tooltips.cart")}
                place="bottom"
              />
            </button>

            {!Logged && (
              <Link
                href={"/log-in"}
                className="hidden lg:flex gap-3 hover:bg-[#e4e4e4] py-2 xxl:py-3 md:px-4 xl:px-5 transition-all duration-300 ease-in-out rounded-[3px]"
              >
                {t("buttons.login")}
              </Link>
            )}

            <Link
              suppressHydrationWarning
              className="hidden lg:flex items-center text-center md:gap-1 xl:gap-3 bg-primary hover:bg-[#295c52] transition-all duration-300 ease-in-out text-white py-2 xxl:py-3 px-3 rounded-[3px]"
              href={`/${locale}/profile?tab=trackingOrders`}
            >
              <SlLocationPin className="md:text-base xl:text-lg" />
              <h2>{t("buttons.trackOrders")}</h2>
            </Link>

            {Logged && (
              <Menu as="div" className="relative text-left hidden lg:block">
                <Menu.Button className="flex w-full justify-center items-center gap-2 relative">
                  <h1 className="bg-primary capitalize text-lg text-white rounded-full w-10 h-10 pt-1.5 cursor-pointer">
                    {profile?.name?.charAt(0)}
                  </h1>
                  {isLoadingUser && <Spinner />}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute px-1.5 py-1 w-48 z-10 left-[50%] translate-x-[-50%] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {dropdownProfile.map((item: any, index: number) => (
                      <Menu.Item key={index}>
                        {({ active }) =>
                          item.link ? (
                            <Link href={"/profile"}>
                              <div
                                className={`${
                                  active ? "bg-primary/20 " : "text-gray-900"
                                } flex gap-8 justify-between w-full items-center rounded-md px-2 py-2 text-sm`}
                              >
                                <h1 className="w-fit">{item.title}</h1>
                                {item.icon}
                              </div>
                            </Link>
                          ) : (
                            <div
                              onClick={item.onclick}
                              className={`${
                                active ? "bg-primary/20 " : "text-gray-900"
                              } flex gap-8 justify-between w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <h1 className="w-fit">{item.title}</h1>
                              {item.icon}
                            </div>
                          )
                        }
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            <div className="hidden lg:block">
              <LocalizationButton />
            </div>

            <HiMenuAlt2
              className="text-3xl lg:hidden text-primary ltr:-scale-x-[1]"
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          </div>
        </div>

        <section
          id="navigation_under_navbar"
          className={`mx-auto shadow-md transition-all duration-700 ease-in-out w-full hidden md:block overflow-x-auto  ${
            isSticky ? "fixed top-0 z-30 bg-white" : "bg-[#e7e7e7] mt-2"
          }`}
        >
          <div
            className={`w-full mx-auto ${
              isSticky ? "w-[94%]" : ""
            } flex items-center w-full h-auto`}
          >
            {list?.map((item: any, i: number) => (
              <Dropdown
                // current={item.current}
                item={item}
                key={i}
                isSticky={isSticky}
                Icon={<TiArrowSortedDown className="text-primary" />}
              />
            ))}
          </div>
        </section>

        <SideMenuComponent
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          navigationItems={list}
          logged={Logged}
          profileLogged={dropdownProfile}
          handleSubmitSearch={handleSubmit}
          handleChangeSearch={handleChange}
        />
      </>
    )
  );
}

export default NavBar;
