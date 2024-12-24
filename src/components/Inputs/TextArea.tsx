"use client";

import React, { useRef } from "react";

interface Props {
  label?: string;
  onChange?(e: React.ChangeEvent<any>): void;
  onBlur?(e: React.ChangeEvent<any>): void;
  id: string;
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  error?: string;
  classes?: string;
}
const TextArea: React.FC<Props> = ({
  classes,
  onChange,
  onBlur,
  inputProps,
  label,
  error,
  id,
}) => {
  return (
    <div className={classes}>
      <label
        htmlFor={id}
        className="block text-sm text-gray-500 dark:text-gray-300"
      >
        {label}
      </label>

      <textarea
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={inputProps.placeholder || "lorem..."}
        {...inputProps}
        className={`block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-accent focus:ring-opacity-80 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${
          error &&
          "focus:ring-red-400 focus:ring-opacity-40 border-red-400 text-red-500"
        }`}
      ></textarea>
      {error && (
        <p className={`mt-2 text-xs text-red-400 dark:text-red-600`}>{error}</p>
      )}
    </div>
  );
};

export default TextArea;
