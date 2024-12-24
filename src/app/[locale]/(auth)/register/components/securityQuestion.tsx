import React, { useEffect, useState } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";

import Select from "@/components/Inputs/Select";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

// type Props = {
//   open: boolean;
//   onSubmit: any;
//   setOpen: any;
//   values: any;
// };

const SecurityQuestion = ({ open, setOpen, onSubmit, values }: any) => {
  const t = useTranslations("Register");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const questions = [
    "What is the name of your first pet?",
    "What is your favorite color?",
    "What is your favorite food?",
    "What is the name of the street you grew up on?",
    "What is your favorite movie?",
    "What is your favorite hobby?",
    "What is your favorite sports team?",
    "What is your favorite book?",
    "What is your favorite vacation spot?",
  ];
  const [securityQuestion, setSecurityQuestion] = useState(questions[0]);

  const handleCheckout = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {open ? (
        <div
          onClick={() => setOpen(false)}
          className={`fixed w-screen h-screen duration-500 scale-100 ${
            open ? "scale-100" : "scale-0 opacity-0"
          } bg-[rgba(34,34,34,0.6)] top-0 z-50`}
        ></div>
      ) : null}
      {open ? (
        <div
          className={`z-50 w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500  ${
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
              <div className="  ">
                <Select
                  title=""
                  options={questions}
                  val={securityQuestion}
                  setVal={setSecurityQuestion}
                ></Select>

                <textarea
                  className={`${
                    securityAnswer.length <= 3
                      ? "!border-destructive"
                      : "focus-within:!border-primary"
                  } relative flex items-center w-full my-3  h-24 transition-{border} transition-colors ease-in-out border border-input bg-background rounded-md hover:border-inputHover  border-[1.5px] `}
                  onChange={(e) => {
                    setSecurityAnswer(e.target.value);
                  }}
                  //   type="text"
                  // helperText={errors?.securityAnswer as any}
                  placeholder={t("securityAnswer")}
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    onSubmit({ ...values, securityQuestion, securityAnswer });
                  }}
                  className="text-white max-w-xs bg-primary hover:bg-[#212121] transition-all duration-300 ease-in-out font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center uppercase"
                >
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SecurityQuestion;
