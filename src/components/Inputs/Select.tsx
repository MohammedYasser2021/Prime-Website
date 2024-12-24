"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
interface propTypes {
  options: string[] | number[];
  title: string;
  val: string | null;
  setVal(option: string | any): void;
}

const Select: React.FC<propTypes> = ({ options, title, val, setVal }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusToggle = () => {
    if (inputRef.current !== document.activeElement) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as any)) {
        setOpened(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClick = (): void => {
    setOpened((prev) => !prev);
    handleFocusToggle();
  };

  const handleChangeValue = (option: string): void => {
    setVal(option);
    setOpened(false);
  };
  return (
    <div ref={ref} className="w-full relative ">
      <div>
        <div className="flex justify-between items-center w-full h-full group rounded-lg border border-gray-200 bg-white  p-1 focus-within:outline-none focus-within:ring focus-within:ring-accent focus-within:ring-opacity-100 dark:border-gray-600 dark:bg-gray-900 focus-within:border-primary ">
          <input
            ref={inputRef}
            onClick={handleClick}
            readOnly
            type="text"
            placeholder={val ? val : title}
            className={`block  peer h-full overflow-ellipsis cursor-pointer w-full placeholder-gray-400/70 dark:placeholder-gray-500  px-5 p-2 rtl:p-1 focus:border-0  focus:outline-none dark:bg-gray-900 dark:text-gray-300 ${
              val && "placeholder:text-gray-900"
            }`}
          />
          <FaCaretDown
            onClick={handleClick}
            className="cursor-pointer text-xl text-gray-500"
          />
        </div>
        <AnimatePresence>
          {opened && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute max-h-56 overflow-y-auto dark:bg-gray-800 flex flex-col z-10 min-w-full w-fit  shadow-xl bg-white rounded-md mt-1 py-2"
            >
              {options.map((option: any, index) => (
                <li
                  onClick={() => handleChangeValue(option)}
                  key={index}
                  className="block cursor-pointer px-4 py-3 text-sm  text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
