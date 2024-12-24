import { AnimatePresence, motion } from "framer-motion";

import React from "react";

interface PropsTypes {
  children: React.ReactNode;
  onSubmitHandler(): void;
  onResetHandler?(): void;
  classes: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
}

const Form: React.FC<PropsTypes> = ({
  children,
  classes,
  onSubmitHandler,
  onResetHandler,
}) => {
  return (
    <motion.form
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0 }}
      onReset={onResetHandler}
      onSubmit={onSubmitHandler}
      className={classes}
    >
      {children}
    </motion.form>
  );
};

export default Form;
