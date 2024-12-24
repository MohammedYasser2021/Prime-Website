"use client";

import { Eye, EyeOff } from "lucide-react";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import ButtonLoading from "@/components/ui/button-loading";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LocalizationButton from "@/layouts/localizationButton";
import ValidationError from "@/components/ui/validation-error";
import { login } from "@/app/[locale]/(auth)/log-in/_api";
import logo from "@/../public/image.png";
import { splitMessage } from "@/utils/splitMessage";
import { triggerToast } from "@/hooks/useToast";
import { useAppDispach } from "@/redux/reduxHooks";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {};

const LoginComp = (props: Props) => {
  const t = useTranslations("auth");
  const [isPassword, setIsPassword] = useState(true);
  const dispach = useAppDispach();
  const { locale } = useParams();
  return (
    <div className=" min-h-screen flex items-center flex-col justify-center w-full h-full">
      <div className=" w-52 flex items-center">
        <Image
          width={1000}
          height={1000}
          className="w-[55vw] max-w-[250px]"
          src={logo}
          priority
          alt="Mowared Logo"
        />
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        // validationSchema={}
        onSubmit={(values, { setSubmitting }) => {
          // const log = () => {
          login(values)
            .then((response: any) => {
              const { english, arabic } = splitMessage(response.message);
              triggerToast("success", locale == "ar" ? arabic : english);
              const previousLocation = localStorage.getItem("previousLocation");

              setTimeout(() => {
                window.location.href = previousLocation
                  ? (previousLocation as string)
                  : "/";
              }, 2100);
              setSubmitting(false);
            })
            .catch((e) => {
              setSubmitting(false);
              const { english, arabic } = splitMessage(
                e.response?.data.message
              );
              triggerToast("error", locale == "ar" ? arabic : english);
            });
          // };
          // log();
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          isSubmitting,
        }) => (
          <Form className="gap-4 flex flex-col w-[30vw] min-w-[250px] max-w-[350px] mt-8">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              err={errors.email && touched.email ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              type="email"
              name="email"
              autoComplete="email"
            />

            <ValidationError
              isErr={errors.email && touched.email ? true : false}
              message={errors.email || ""}
            />

            <Label htmlFor="Password">{t("password")}</Label>
            <Input
              err={errors.password && touched.password ? true : false}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type={isPassword ? "password" : "text"}
              name="password"
              autoComplete={isPassword ? "current-password" : "off"}
              leftIcon={
                isPassword ? (
                  <Eye
                    onClick={() => setIsPassword(!isPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setIsPassword(!isPassword)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <ValidationError
              isErr={errors.password && touched.password ? true : false}
              message={errors.password || ""}
            />

            <Button
              disabled={isSubmitting}
              type="submit"
              className="text-white"
            >
              {isSubmitting ? (
                <ButtonLoading className="" text={t("login")} />
              ) : (
                t("login")
              )}
            </Button>
          </Form>
        )}
      </Formik>
      <div className="flex gap-2 mt-3">
        <Link
          className="text-zinc-500 hover:text-primary transition-all"
          href={`/register`}
          // href={`${locale}/activate-code`}
        >
          {t("signUp")}
        </Link>
        <div className="inline-block w-[1px] self-stretch bg-zinc-400  text-transparent">
          ;{" "}
        </div>
        <div className="w-9 cursor-pointer">
          <LocalizationButton />
        </div>
      </div>{" "}
    </div>
  );
};

export default LoginComp;
