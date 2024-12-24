"use client";

import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";

import Form from "@/components/Forms/Form";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import { Tooltip } from "react-tooltip";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import { sendMessage } from "@/redux/reducer/contactUsSlice";
import { servicesShcema } from "@/utils/ValidationsSchema";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface PropTypes {
  selected: any;
  clickHandler(): void;
  title: string;
}

const ServicesForm: React.FC<PropTypes> = ({
  selected,
  clickHandler,
  title,
}) => {
  const logged = getCookie("token");

  const t = useTranslations("Services");
  const { locale } = useParams();
  const dispatch = useAppDispach();
  const { user } = useAppSelector((state) => state.userData);
  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    resetForm,
    status,
    initialValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      type: "",
    },
    validationSchema: servicesShcema(t),
    onSubmit: (values, { setStatus, resetForm }) => {
      // if (logged) {
      dispatch(sendMessage({ ...values, type: selected.type }));
      setTimeout(() => {
        clickHandler();
      }, 1000);
      // } else {
      //   setTimeout(() => {
      //     (window.location.href = "/log-in"), 3000;
      //   });
      // }
      resetForm();
    },
  });

  useEffect(() => {
    setFieldValue("firstName", user?.data?.name || "");
    setFieldValue("email", user?.data?.email || "");
    setFieldValue("description", "ابلاغي عند توفر منتج جديد");
  }, [logged]);

  return (
    <>
      <div className="w-full p-3 mt-3 container flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" flex gap-2 text-4xl items-center"
        >
          <div id="backBtnAnchor">
            <FaArrowLeft
              onClick={clickHandler}
              className="rtl:-rotate-180 hover:bg-zinc-100 rounded-full cursor-pointer transition-all p-2"
            />
            <Tooltip
              anchorSelect="#backBtnAnchor"
              content={t("toolTips.backAnchor")}
              style={{ fontSize: "10px" }}
            />
          </div>
          <h1>
            {title} <span className="text-primary">({selected.title})</span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" grid lg:grid-cols-2 gap-3"
        >
          <Form
            onSubmitHandler={handleSubmit}
            // onResetHandler={resetForm}
            classes="flex flex-col gap-5"
          >
            <Input
              error={errors.email && touched.email ? errors.email : undefined}
              onChange={handleChange}
              icon={<FaEnvelope />}
              id="email"
              label={t("mail")}
              inputProps={{
                type: "email",
                name: "email",
                placeholder: t("placeHolders.email"),
                value: values.email,
              }}
            />
            <Input
              error={
                errors.firstName && touched.firstName
                  ? errors.firstName
                  : undefined
              }
              onChange={handleChange}
              id="firstName"
              inputProps={{
                value: values.firstName,
                name: "firstName",
                placeholder: t("placeHolders.firstName"),
              }}
              label={t("firstName")}
            />
            <Input
              error={
                errors.lastName && touched.lastName
                  ? errors.lastName
                  : undefined
              }
              id="lastName"
              onChange={handleChange}
              inputProps={{
                value: values.lastName,
                name: "lastName",
                placeholder: t("placeHolders.lastName"),
              }}
              label={t("lastName")}
            />

            <TextArea
              error={
                errors.description && touched.description
                  ? errors.description
                  : undefined
              }
              id="textArea"
              onChange={handleChange}
              inputProps={{
                type: "text",
                value: values.description,
                name: "description",
                placeholder: t("placeHolders.message"),
              }}
              label={t("message")}
            />
            <button
              type="submit"
              className=" p-2 text-white bg-primary rounded-md"
            >
              {t("button")}
            </button>
          </Form>
          <div className="hidden lg:block"></div>
        </motion.div>
      </div>
    </>
  );
};

export default ServicesForm;
