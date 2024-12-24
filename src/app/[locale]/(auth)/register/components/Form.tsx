import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import loginback from "../../../../../../public/loginback.jpeg";

interface PropsTypes {
  children: React.ReactNode;
  onSubmitHandler(): void;
  onResetHandler?(): void;
  className: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
}

const Form: React.FC<PropsTypes> = ({
  children,
  className,
  onSubmitHandler,
  onResetHandler,
}) => {
  return (
    <div className="w-full  min-h-[100vh] flex">
      <motion.form
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 0 }}
        onReset={onResetHandler}
        onSubmit={onSubmitHandler}
        className={className}
      >
        {children}
      </motion.form>
      <Image
        alt="img"
        src={loginback}
        className=" object-cover w-[60%] hidden lg:block auth-layout bg-cover bg-center "
      ></Image>
    </div>
  );
};

export default Form;
