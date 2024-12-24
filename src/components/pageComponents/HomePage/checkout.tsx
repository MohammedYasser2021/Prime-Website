import React, { useEffect, useState } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";

import SummaryPopUpCheckout from "./SummaryPopUpCheckout";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { createOrder } from "@/redux/reducer/orderSlice";
import { getCookie } from "cookies-next";
import { getOneProducts } from "@/redux/reducer/productsSlice";
import { getProfile } from "@/redux/reducer/userSlice";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

type Props = {
  open: boolean;
  checkoutData: any;
  setOpen: (value: boolean) => void;
  closeDrawerCart?: (value: boolean) => void;
  header?: string;
  inputs?: [];
  removeItem: (parameter: string) => void;
};

const Checkout = ({
  open,
  checkoutData,
  setOpen,
  closeDrawerCart,
  removeItem,
}: Props) => {
  const t = useTranslations("checkout");
  const [country, setCountry] = useState(""); // State for country
  const [fullName, setFullName] = useState(""); // State for fullName
  const [phone, setPhone] = useState(""); // State for phone
  const [address, setAddress] = useState(""); // State for address
  const [address2, setAddress2] = useState(""); // State for address2
  const [city, setCity] = useState(""); // State for city
  const [district, setDistrict] = useState(""); // State for district
  const [governorate, setGovernorate] = useState(""); // State for governorate
  const [nearestLandmark, setNearestLandmark] = useState(""); // State for nearestLandmark
  const [phoneError, setPhoneError] = useState("");
  const [profile, setProfile] = useState<any>({});
  const [openSummary, setOpenSummary] = useState<boolean>(false);
  const [fullData, setFullData] = useState<any>({});
  const Logged = getCookie("token");

  console.log(checkoutData, "checkoutData");
  console.log(openSummary, "openSummary");
  //   {
  //     "name": "admin",
  //     "phone": "1140029512",
  // }

  const dispatch = useDispatch();
  const dispach = useAppDispach();

  const { defproduct } = useAppSelector((state) => state.productsData);

  // Regular expression for the Egyptian phone number pattern
  const phonePattern = /^(01)(0|1|2|5)\d{8}$/;

  const handlePhoneChange = (e: any) => {
    const enteredPhone = e.target.value;
    setPhone(enteredPhone);

    if (!phonePattern.test(enteredPhone)) {
      setPhoneError(t("validationMessages.phoneInvalid"));
    } else {
      setPhoneError("");
    }
  };

  const handleCheckout = (e: any) => {
    e.preventDefault();
    const FormData = {
      items: [
        {
          vendor: defproduct?.data?.vendor ? defproduct?.data?.vendor : "",
          product_id: checkoutData?._id,
          qty: checkoutData?.quantity,
        },
      ],
      info: {
        country,
        fullName,
        phoneCode: "+20",
        phone,
        address,
        address2,
        city,
        district,
        governorate,
        nearestLandmark,
      },
    };
    if (!phoneError) {
      setOpenSummary(true);
      setFullData(FormData);
    }
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(getOneProducts(checkoutData?._id));
  }, [dispatch, checkoutData?._id]);

  useEffect(() => {
    if (Logged) {
      dispach(getProfile()).then((data: any) => setProfile(data.payload?.data));
    }
  }, [dispatch]);

  useEffect(() => {
    if (Logged) {
      setFullName(profile?.name ? profile?.name : "");
      setPhone(profile?.phone ? profile?.phone : "");
      if (!phonePattern.test(profile?.phone)) {
        setPhoneError(t("validationMessages.phoneInvalid"));
      } else {
        setPhoneError("");
      }
    }
  }, [Logged, profile]);
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed w-screen h-screen duration-500 scale-100 ${
          open ? "scale-100" : "scale-0 opacity-0"
        } bg-[rgba(34,34,34,0.6)] top-0 right-0 z-50`}
      ></div>
      <div
        className={`z-50 w-[80%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500  ${
          open ? "scale-100" : "scale-0 opacity-0"
        } rounded-md text-[#212121]`}
      >
        <div className="bg-white rounded-md border border-[#757575] p-5 se:py-10 lg:px-10 lg:py-9 xxl:py-[51px] shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">{t("title")}</p>
            <button
              type="button"
              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <form
            onSubmit={handleCheckout}
            className="my-3 md:mt-6 md:mb-0 overflow-auto h-[70vh] md:h-full"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.fullName")}
                  <span className="text-red-600 mx-1">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.fullName")}
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.country")}
                  <span className="text-red-600 mx-1">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.country")}
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.city")}
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.city")}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.district")}
                </label>
                <input
                  type="text"
                  id="district"
                  value={district}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.district")}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="governorate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.governorate")}
                </label>
                <input
                  type="text"
                  value={governorate}
                  id="governorate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.governorate")}
                  onChange={(e) => setGovernorate(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="nearestLandmark"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.nearestLandmark")}
                </label>
                <input
                  type="text"
                  value={nearestLandmark}
                  id="nearestLandmark"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.nearestLandmark")}
                  onChange={(e) => setNearestLandmark(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("labels.phone")}
                  <span className="text-red-600 mx-1">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={t("placeholders.phone")}
                  required
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("labels.address")}
                <span className="text-red-600 mx-1">*</span>
              </label>
              <input
                type="text"
                id="address"
                value={address}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("placeholders.address")}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="address2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("labels.address2")}
              </label>
              <input
                type="text"
                value={address2}
                id="address2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("placeholders.address2")}
                onChange={(e) => setAddress2(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white max-w-xs bg-primary hover:bg-[#212121] transition-all duration-300 ease-in-out font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center uppercase"
              >
                {t("btn")}
              </button>
            </div>
          </form>
        </div>
      </div>

      {openSummary && (
        <SummaryPopUpCheckout
          checkoutData={checkoutData}
          open={openSummary}
          setOpen={setOpenSummary}
          fullDataSubmit={fullData}
          removeItem={removeItem}
          closeCheckoutPopUp={setOpen}
        />
      )}
    </>
  );
};

export default Checkout;
