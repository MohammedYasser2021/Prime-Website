"use client";

import { useParams, usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoImg from "../../../../../../public/image.png";
// import { register } from "@/api/auth";
// import { registerSchema } from "@/utils/InputsValidation";
import { splitMessage } from "@/utils/splitMessage";
// import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import changeLanguage from "@/utils/changeLanguageHandler";
import { registerSchema } from "../InputsValidation";
import { Button } from "@/components/ui/button";
import Input from "@/components/Inputs/Input";
import Form from "./Form";
import { register } from "../_api";
import SecurityQuestion from "./securityQuestion";
import { triggerToast } from "@/hooks/useToast";
import LocalizationButton from "@/layouts/localizationButton";
type Message = {
  state: boolean;
  type: "success" | "error";
  message: string;
};

type LocaleParams = {
  locale: string;
};
const SignUpForm = () => {
  const { locale } = useParams<LocaleParams>();
  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("Register");
  const [message, setMessage] = React.useState<any>({});
  const [open, setOpen] = React.useState(false); // State for governorate
  // const [values, setValues] = React.useState(false); // State for governorate
  const onRegister = (values: any) => {
    register({
      name: values.fullName,
      email: values.email,
      rEmail: values.rEmail,
      phone: values.phone,
      password: values.password,
      passwordConfirm: values.confirmPassword,
      securityQuestion: values.securityQuestion,
      securityAnswer: values.securityAnswer,
      organization: {
        orgName: values.nickName,
        // address: String,
        city: values.city,
        country: values.country,
        // region: String,
        // category: String,
      },
    })
      .then((response: any) => {
        console.log(response.message);

        const { english, arabic } = splitMessage(response.message);
        triggerToast("success", locale == "ar" ? arabic : english);
        const previousLocation = localStorage.getItem("previousLocation");

        setTimeout(() => {
          window.location.href = previousLocation
            ? (previousLocation as string)
            : "/";
        }, 2100);
      })
      .catch((e) => {
        const allMessages = Object.entries(e.response?.data.message);
        if (typeof e.response?.data.message==='object') {
        
          allMessages.map((e:any) => {
            if (e[1]) {
              const { english, arabic } = splitMessage(e[1].message);
              triggerToast("error", locale == "ar" ? arabic : english);
            }
          });
        } else {
          const { english, arabic } = splitMessage(e.response?.data.message);
          triggerToast("error", locale == "ar" ? arabic : english);
        }
      });
  };

  function ChangeLanguageHandler() {
    const newPath = changeLanguage(locale as any, pathName);
    router.push(newPath);
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      fullName: "",
      nickName: "",
      country: "",
      city: "",
      email: "",
      rEmail: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema(t),
    onSubmit: () => {
      setOpen(true);
    },
    onReset: () => {
      // Reset form logic here
    },
    // handleReset:()=>{

    // },
  });

  return (
    <>
      {message?.state && (
        <div className="absolute bottom-5 left-1/2  -translate-x-1/2 ">
          {/* <Toast
            id={5}
            message={message.message}
            title={message.message}
            type={message.type}
          /> */}
        </div>
      )}
      <Form
        onSubmitHandler={handleSubmit}
        onResetHandler={resetForm}
        className="flex flex-col gap-2 items-center w-full lg:w-[40%] justify-center"
      >
        <div className="w-36">
          <Image
            alt="img logo"
            width={300}
            height={200}
            className="w-full h-full"
            src={logoImg}
            priority
          />
        </div>
        <h1 className="text-2xl">{t("title")}</h1>

        <Input
          id="fullName"
          onChange={handleChange}
          error={
            errors.fullName && touched.fullName ? errors.fullName : undefined
          }
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("fullName")}
          inputProps={{
            type: "text",
            placeholder: t("fullName"),
            value: values.fullName,
          }}
          onBlur={handleBlur}
        />
        <Input
          id="nickName"
          onChange={handleChange}
          error={
            errors.nickName && touched.nickName ? errors.nickName : undefined
          }
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("nickName")}
          inputProps={{
            type: "text",
            placeholder: t("nickName"),
            value: values.nickName,
          }}
          onBlur={handleBlur}
        />
        <Input
          id="email"
          onChange={handleChange}
          error={errors.email && touched.email ? errors.email : undefined}
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("email")}
          inputProps={{
            type: "text",
            placeholder: "ahmed@example.com",
            value: values.email,
          }}
          onBlur={handleBlur}
        />
        <Input
          id="rEmail"
          onChange={handleChange}
          error={errors.rEmail && touched.rEmail ? errors.rEmail : undefined}
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("rEmail")}
          inputProps={{
            type: "text",
            placeholder: "ahmed@example.com",
            value: values.rEmail,
          }}
          onBlur={handleBlur}
        />
        <div className=" flex gap-3 lg:w-[60%] md:w-[40%] w-[60%]">
          <Input
            id="country"
            onChange={handleChange}
            error={
              errors.country && touched.country ? errors.country : undefined
            }
            className="w-[45%] "
            label={t("country")}
            inputProps={{
              type: "text",
              placeholder: "",
              value: values.country,
            }}
            onBlur={handleBlur}
          />

          <Input
            id="city"
            onChange={handleChange}
            error={errors.city && touched.city ? errors.city : undefined}
            className="w-[45%] "
            label={t("city")}
            inputProps={{
              type: "text",
              placeholder: "",
              value: values.city,
            }}
            onBlur={handleBlur}
          />
        </div>
        <Input
          id="phone"
          onChange={handleChange}
          error={errors.phone && touched.phone ? errors.phone : undefined}
          prefix="+966"
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("phone")}
          inputProps={{
            type: "tel",
            placeholder: "12-345-6789",
            value: values.phone,
          }}
          onBlur={handleBlur}
        />
        <Input
          id="password"
          onChange={handleChange}
          error={
            errors.password && touched.password ? errors.password : undefined
          }
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("password")}
          inputProps={{
            type: "password",
            placeholder: "********",
            value: values.password,
          }}
          onBlur={handleBlur}
        />
        <Input
          id="confirmPassword"
          onChange={handleChange}
          error={
            errors.confirmPassword && touched.confirmPassword
              ? errors.confirmPassword
              : undefined
          }
          className="lg:w-[60%] md:w-[40%] w-[60%] "
          label={t("rePassword")}
          inputProps={{
            type: "password",
            placeholder: "********",
            value: values.confirmPassword,
          }}
          onBlur={handleBlur}
        />
        <Button
          type="submit"
          className="lg:w-[60%] md:w-[40%] w-[60%]  bg-primary p-1 text-white rounded-sm"
        >
          {t("submit")}
        </Button>
        <div className="flex gap-2 mt-3">
          <Link
            className="text-zinc-500 hover:text-primary transition-all"
            href={`/log-in`}
            // href={`${locale}/activate-code`}
          >
            {t("login")}
          </Link>
          <div className="inline-block w-[1px] self-stretch bg-zinc-400  text-transparent">
            ;{" "}
          </div>
          <div className="w-9 cursor-pointer">
                       <LocalizationButton />

          </div>
        </div>
      </Form>
      <SecurityQuestion
        onSubmit={onRegister}
        values={values}
        open={open}
        setOpen={setOpen}
      >
        
      </SecurityQuestion>
    </>
  );
};

export default SignUpForm;
