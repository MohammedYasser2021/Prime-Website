import Image from "next/image";
import React from "react";
import loginback from "../../../../public/loginback.jpeg";
import { motion } from "framer-motion";

interface propsType {
  children: React.ReactNode;
}

const layout: React.FC<propsType> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default layout;
