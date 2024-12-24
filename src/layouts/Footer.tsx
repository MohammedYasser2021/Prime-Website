"use client";

import {
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
  FaPinterestSquare,
  FaTwitter,
} from "react-icons/fa";

import AmericanExpress from "@/images/payment-method/amex-svgrepo-com.svg";
import CCavenueCompany from "@/images/companies/CCavenue1_2.jpg.jpg";
import ICICICompany from "@/images/companies/icici1.jpg.jpg";
import Image from "next/image";
import KredixCompany from "@/images/companies/Kredx1.jpg.jpg";
import Link from "next/link";
import MasterCard from "@/images/payment-method/mastercard-svgrepo-com.svg";
import PayTMCompany from "@/images/companies/Paytm1.jpg.jpg";
import Paypal from "@/images/payment-method/paypal-svgrepo-com.svg";
import React from "react";
import { TbMailFilled } from "react-icons/tb";
import { TfiYoutube } from "react-icons/tfi";
import Visa from "@/images/payment-method/visa-svgrepo-com.svg";
import logo from "@/../public/image.png";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {};

const Footer = (props: Props) => {
  const links = [
    {
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/",
      color: "#1877F2",
    },
    {
      icon: <FaTwitter />,
      link: "https://www.facebook.com/",
      color: "#1DA1F2",
    },
    {
      icon: <FaGooglePlusG />,
      link: "https://www.facebook.com/",
      color: "#DB4437",
    },
    {
      icon: <FaPinterestSquare />,
      link: "https://www.facebook.com/",
      color: "#BD081C",
    },
    {
      icon: <FaLinkedinIn />,
      link: "https://www.facebook.com/",
      color: "#0077B5",
    },
    {
      icon: <TfiYoutube />,
      link: "https://www.facebook.com/",
      color: "#FF0000",
    },
  ];

  const paymentMethods = [Paypal, Visa, AmericanExpress, MasterCard];

  const companies = [
    ICICICompany,
    PayTMCompany,
    KredixCompany,
    CCavenueCompany,
  ];

  const { locale } = useParams();
  const t = useTranslations("Footer");

  return (
    <div className="bg-[#171717] text-white">
      <div className="py-9 sps:max-w-[850px] xxl:max-w-[1170px] mx-auto flex flex-col lg:flex-row px-2.5 md:px-4 md:gap-5 xl:gap-0 justify-between">
        <div className="mx-auto w-full flex flex-col">
          {/* <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 w-full text-sm ml:text-base">
            <h1 className="">{t("contact.title")}</h1>
            <div className="md:max-w-xs lg:max-w-[280px] xl:max-w-xs w-full">
              <input
                type="email"
                placeholder={t("contact.placeHolder")}
                className="bg-white text-black px-3 py-[9px] h-full w-full"
              />
            </div>
            <button className="bg-primary flex items-center justify-center gap-1 px-3 md:px-[22.5px] py-2 ">
              <TbMailFilled className="text-base" />
              <h1>{t("contact.button")}</h1>
            </button>
          </div> */}
          {/* flex gap-10 sps:gap-36 xxl:gap-36 */}
          <div className="mb-9 md:mt-9 flex flex-col md:flex-row gap-11">
            <div className=" w-fit">
              <div className="w-fit">
                <h1 className="text-base ml:text-lg font-bold tracking-normal uppercase text-white">
                  {t("contact.title")}
                </h1>
              </div>
              <div className="flex flex-col gap-3 text-xs ml:text-sm leading-[14px] mt-3">
                <Link href={"/service"} className="w-fit">
                  <h1 className="tracking-normal hover:underline">
                    {t("contact.services")}
                  </h1>
                </Link>
              </div>
            </div>
            <div className=" w-fit">
              <div className="w-fit">
                <h1 className="text-base ml:text-lg font-bold tracking-normal uppercase text-white">
                  {t("policy")}
                </h1>
              </div>
              <div className="flex flex-col gap-3 text-xs ml:text-sm leading-[14px] mt-3">
                <Link href={"/terms-and-conditions"} className="w-fit">
                  <h1 className="tracking-normal hover:underline">
                    {t("policies.terms")}
                  </h1>
                </Link>
                <Link href={"/privacy-policy"} className="w-fit">
                  <h2 className="tracking-normal hover:underline">
                    {t("policies.privacy")}
                  </h2>
                </Link>
                {/* <Link href={"/refund-policy"} className="w-fit">
                <h3 className="tracking-normal hover:underline">{t("policies.refund")}</h3>
              </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto text-[#AAAAAA] flex justify-between">
          <div className="w-fit flex flex-col justify-center">
            {/* <div className="w-full">
              <h1 className="text-base md:text-lg font-semibold my-1 text-primary">
                (<span className="text-white">{t("comingSoon")}</span>)
              </h1>
              <div className="flex items-center gap-2 ">
                {links.map((link, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: link.color,
                    }}
                    className={`inline-block p-2 rounded-[3px] text-white`}
                  >
                    <Link href={link.link}>{link.icon}</Link>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="">
              <Image
                className=""
                src={logo}
                width={217}
                height={109}
                priority
                alt="Your Company"
              />
            </div>
            {/* <div className="mt-9 mb-0 my-16">
              <h1 className="text-[#999999] text-lg font-bold">
                {t("paragraph")}
              </h1>
              <div className="">
                <h1 className="text-base md:text-lg font-semibold mt-3 mt-1 text-primary">
                  (<span className="text-white">{t("comingSoon")}</span>)
                </h1>
                <div className="flex gap-1.5 items-center mb-5">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="inline-block">
                      <Image
                        src={method}
                        alt=""
                        width={2000}
                        height={2000}
                        className="max-w-[80px] w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {companies.map((company, index) => (
                  <div key={index} className="inline-block ">
                    <Image src={company} alt="" width={2000} height={2000} />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-[#111111] px-2.5 md:px-4">
        <h2 className=" text-xs leading-[18px] py-3 sps:max-w-[850px] xxl:max-w-[1170px] mx-auto">
          {t("copyright")}
        </h2>
      </div>
    </div>
  );
};

export default Footer;
