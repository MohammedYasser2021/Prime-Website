"use client";

import React, { useEffect, useState } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { BiHeart } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import FavoritesList from "@/app/[locale]/(site)/profile/components/FavoritesList";
import PFP from "@/app/[locale]/(site)/profile/components/PFP";
import { SlLocationPin } from "react-icons/sl";
import Tracking_orders from "@/app/[locale]/(site)/profile/components/Tracking_orders";
import { getCookie } from "cookies-next";
import { getFavourites } from "@/redux/reducer/userSlice";
import { useTranslations } from "next-intl";

type Props = {};

const ProfileComp = (props: Props) => {
  const dispach = useAppDispach();
  const favs = useAppSelector((state) => state.userData.fav?.data);
  const userProfile = useAppSelector((state) => state.userData.user?.data);

  const t = useTranslations("Profile");
  // const [favs, setFavs] = useState([]);
  const { locale } = useParams();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const Logged = getCookie("token");
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackingOrders = searchParams.get("tab");
  const [currentPage, setCurrentPage] = useState("2");

  // const current = localStorage.getItem("tab");

  const handlePages = (current: string) => {
    setCurrentPage(current);
    if (current !== currentPage) {
      window.history.replaceState(null, "", window.location.pathname); // Replace the current URL without hash
    }
  };

  useEffect(() => {
    if (Logged) {
      dispach(getFavourites());
    }
  }, []);

  useEffect(() => {
    if (trackingOrders) {
      setCurrentPage("3");
    }
  }, [trackingOrders]);
  return (
    <>
      <div className="my-9 mx-auto w-[90%] lg:w-full lg:container flex flex-col items-center justify-center gap-8 ">
        <div className="flex justify-center items-center max-w-lg w-full">
          {/* <div
            className={`${
              currentPage === "1"
                ? "bg-primary text-white"
                : "hover:bg-slate-200"
            } p-3 cursor-pointer flex gap-2 items-center justify-center transition-all duration-300 ease-in-out w-full`}
            onClick={() => handlePages("1")}
          >
            <BiUser className="text-xl" />
            <span>{t("account.title")}</span>
          </div> */}
          <div
            className={`${
              currentPage === "2"
                ? "bg-primary text-white"
                : "hover:bg-slate-200"
            } p-3 cursor-pointer flex gap-2 items-center justify-center transition-all duration-300 ease-in-out w-full`}
            onClick={() => handlePages("2")}
          >
            <BiHeart className="text-xl" />
            <span>{t("favourites.title")}</span>
          </div>
          <div
            className={`${
              currentPage === "3"
                ? "bg-primary text-white"
                : "hover:bg-slate-200"
            } p-3 cursor-pointer flex gap-2 items-center justify-center transition-all duration-300 ease-in-out w-full`}
            onClick={() => handlePages("3")}
          >
            <SlLocationPin className="text-xl" />
            <span>{t("trackingOrders.title")}</span>
          </div>
          {/* <div
          className={`${
            currentPage === "4" ? "bg-primary text-white" : "hover:bg-slate-200"
          } p-3 cursor-pointer flex gap-2 items-center`}
          onClick={() => {
            localStorage.setItem("currentPage", "4");
            setCurrentPage(localStorage.getItem("currentPage") as string);
          }}
        >
          <BiHistory className="text-xl" />
          <span>{t("history")}</span>
        </div> */}
        </div>
        {currentPage === "1" && <PFP name={userProfile?.name} />}
        {/* {currentPage === "1" && <Personal name={userProfile?.name} />} */}
        {currentPage === "2" &&
          (favs?.length > 0 ? (
            <>
              <FavoritesList favs={favs} t={t} locale={locale} />{" "}
            </>
          ) : (
            <div className="flex flex-col gap-4 items-center text-gray-500 my-14">
              <FaRegHeart size={60} />
              <p className="text-center text-xl">{t("favourites.empty")}</p>
            </div>
          ))}

        {currentPage === "3" && <Tracking_orders />}

        {/* {currentPage === "4" ? <Properties /> : ""} */}
      </div>
    </>
  );
};

export default ProfileComp;
