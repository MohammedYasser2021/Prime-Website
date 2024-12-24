"use client";

import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

const variants = {
  out: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.75,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
};
const Transition = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const pathname = usePathname();
  return (
    <div className={`effect-1 ${className}`}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
export default Transition;
