"use client";

import {
  FaBuildingCircleCheck,
  FaHeadset,
  FaPersonCircleQuestion,
  FaUserPen,
  FaUserPlus,
} from "react-icons/fa6";

import ServiceCard from "@/components/ui/serviceCard";
import ServicesForm from "@/components/Forms/ServicesForm";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {};

const ServicesPageComp = (props: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const t = useTranslations("Services");
  const services = [
    {
      t: "inquiry",
      title: t("IS"),
      icon: <FaPersonCircleQuestion />,
    },
    {
      t: "complaint",
      title: t("CS"),
      icon: <FaHeadset />,
    },
    {
      t: "other",
      title: t("Other"),
      icon: <FaUserPlus />,
    },
  ];
  return (
    <main className="w-[95%] md:w-[90%] lg:w-[85%] mx-auto my-5 md:my-10">
      {!selected && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className=" p-3 mt-3 container text-4xl font-semibold"
        >
          {t("title")}
        </motion.h1>
      )}
      {!selected ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full container grid grid-cols-1 gap-5 lg:grid-cols-4 p-3"
        >
          {services.map((service, index) => (
            <ServiceCard
              t={service.t}
              clickHandler={setSelected}
              icon={service.icon}
              title={service.title}
              key={index}
            />
          ))}
        </motion.div>
      ) : (
        <ServicesForm
          title={t("title")}
          clickHandler={() => setSelected(null)}
          selected={selected}
        />
      )}
    </main>
  );
};

export default ServicesPageComp;
