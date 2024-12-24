// import React from "react";

// interface Props {
//   label?: string;
//   classes?: React.HTMLAttributes<HTMLInputElement>["className"];
//   prefix?: React.ReactNode | string;
//   inputProps: React.DetailedHTMLProps<
//     React.InputHTMLAttributes<HTMLInputElement>,
//     HTMLInputElement
//   >;
// }
// const Input: React.FC<Props> = ({ inputProps, classes, label, prefix }) => {
//   return (
//     <div
//       className={` h-12 group transform overflow-hidden ease-in-out relative duration-300 transition-all flex items-end border-[1px] border-gray-300 rounded-md focus-within:border-[#FFA500] focus-within:border-2   [&:hover:not(:focus-within)]:border-black ${classes}`}
//     >
//       <input
//         {...inputProps}
//         className="w-full h-full focus:h-[60%] valid:h-[60%]  px-2 text-sm peer  outline-none"
//       />

//       <label
//         htmlFor={inputProps.id}
//         className="transform transition-all absolute duration-300 top-0 h-full flex items-center px-2 text-[14px] group-focus-within:text-[12px] peer-valid:text-[10px] peer-valid:h-[60%] group-focus-within:h-[60%]  cursor-text group-focus-within:text-[#FFA500] text-gray-400 pointer-events-none  "
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// export default Input;

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";
interface Props {
  label?: string;
  id: string;
  onChange?(e: React.ChangeEvent<any>): void;
  onBlur?(e: React.ChangeEvent<any>): void;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  error?: string;
  icon?: React.ReactNode;
  prefix?: string;
  className?:  React.HtmlHTMLAttributes<HTMLElement>['className'] | undefined;
  forgetPass?: {
    title: string;
    link: string;
  };
}
const Input: React.FC<Props> = ({
  inputProps,
  label,
  error,
  id,
  icon,
  prefix,
  className,
  forgetPass,
  onChange,
  onBlur,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const toggleShowPassword = (): void => {
    if (ref.current?.type === "password") {
      ref.current.type = "text";
    } else if (ref.current?.type === "text") {
      ref.current.type = "password";
    }
  };
  return (
    <div className={`relative  ${className}`}>
      <div
        className={`${
          inputProps.type === "password" && "flex items-center justify-between"
        }`}
      >
        <label
          htmlFor={id}
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          {label}
        </label>
        {forgetPass && (
          <Link
            href={forgetPass?.link as any}
            className="text-xs text-gray-600 hover:underline dark:text-gray-400"
          >
            {forgetPass?.title}
          </Link>
        )}
      </div>
      <div className="relative flex items-center mt-2">
        {icon || prefix ? (
          <span className="absolute">
            <div
              className={` w-6 h-6 ${
                prefix && "text-sm"
              } mx-3 grid place-content-center text-primary dark:text-gray-500`}
            >
              {icon ? icon : prefix}
            </div>
          </span>
        ) : null}
        {inputProps.type === "password" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
          >
            <svg
              onMouseDown={toggleShowPassword}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        )}
        <input
          ref={ref}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          {...inputProps}
          className={`block transition-colors  w-full py-2.5 disabled:text-zinc-400 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg ${
            icon || prefix ? "pl-11 pr-5 rtl:pr-11 rtl:pl-5" : "px-5"
          } dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-blue-300 focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-80 ${
            error &&
            "focus:ring-red-400 focus:ring-opacity-40 border-red-400 text-red-500"
          }`}
        />
      </div>
      {error && (
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`mt-2 text-xs text-red-400 dark:text-red-600`}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
