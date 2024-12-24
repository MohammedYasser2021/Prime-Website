import { Menu, Transition } from "@headlessui/react";
import { useParams, usePathname } from "next/navigation";

import { BiSolidDownArrow } from "react-icons/bi";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import EGY from "@/images/egypt.png";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import USA from "@/images/usa.png";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { getCookies } from "cookies-next";
import { logout } from "@/app/[locale]/(auth)/log-in/_api";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const locales = ["en", "ar"] as const;
const { Link: LinkWithLocale, redirect } = createSharedPathnamesNavigation({
  locales,
});

export default function DropdownMenu({
  data,
  title,
  icon,
}: {
  data: any;
  title: string;
  icon?: any;
}) {
  const { locale } = useParams();
  const pathname = usePathname();

  const clickAction = async () => {
    if (data.find((item: any) => item.name === "Sign out")) {
      await logout();
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="capitalize px-4 py-2 rounded-full text-white text-lg bg-primary hover:bg-[#357266] transition-all duration-300 ease-in-out">
          {title?.substring(0, 1)}
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
          <Menu.Items className="absolute translate-x-[-50%] left-[50%] z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
            <div className="py-1 w-32">
              {data.map((item: any, index: number) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <Link
                      href={`/${locale}${item.href}`}
                      className={classNames(
                        active
                          ? "bg-primary text-white rounded-sm"
                          : "text-gray-700",
                        "block px-4 py-2 transition-all duration-500 ease-in-out"
                      )}
                      onClick={clickAction}
                    >
                      <div className="flex items-center gap-3 mx-auto">
                        <h2 className="text-base">{item.name}</h2>
                        {item.icon}
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
