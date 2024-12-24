import { useParams, usePathname } from "next/navigation";

import AR from "@/images/sr.jpg";
import Image from "next/image";
import React from "react";
import USA from "@/images/usa.png";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { getCookies } from "cookies-next";

type Props = {};

const locales = ["en", "ar"] as const;
const { Link: LinkWithLocale, redirect } = createSharedPathnamesNavigation({
  locales,
});

const LocalizationButton = (props: Props) => {
  const pathname = usePathname();
  const { locale } = useParams();
  return (
    <LinkWithLocale
      href={`${pathname.replace(
        getCookies().NEXT_LOCALE === "en" ? "/en" : "/ar",
        "/"
      )}`}
      locale={getCookies().NEXT_LOCALE === "en" ? "ar" : "en"}
      className="flex items-center gap-2 mx-auto w-full"
    >
      <div>
        <Image
          src={locale === "en" ? AR : USA}
          alt="flag"
          width={30}
          height={30}
          className="w-[30px]"
        />
      </div>
      <h2 className="text-lg">{locale === "en" ? "العربية" : "English"}</h2>
    </LinkWithLocale>
  );
};

export default LocalizationButton;
