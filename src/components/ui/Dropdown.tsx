"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
interface DropdownItem {
  value: string;
  label: string;
  Icon?: React.ReactNode;
}

interface Props {
  items: DropdownItem[];
  title: string | number;
  renderIcon?: () => React.ReactNode;
  value?: string | number | undefined;
  onChangeValue?: (item: DropdownItem) => any;
  classes?: string;
}

const Dropdown: React.FC<Props> = ({
  items,
  title,
  renderIcon,
  onChangeValue,
  value,
  classes,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={` z-40 flex gap-3 cursor-pointer relative h-4  transition-all duration-1000 items-center justify-center ${classes}`}
      onClick={() => {
        setIsOpened(!isOpened);
      }}
    >
      {renderIcon && renderIcon()}
      <span className=" text-[12px]">{value ? value : title}</span>

      <motion.div
        animate={{
          rotate: isOpened ? 0 : 180,
        }}
      >
        {/* <ArrowDown /> */}
      </motion.div>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          style={{ minWidth: "139px" }}
          className={`   absolute rounded-md top-10 w-full  bg-white flex flex-col  px-1 border-gray-300 border-[1px]`}
        >
          {items.map((item, key: number) => {
            return (
              <div className=" flex justify-between" key={key}>
                {item.Icon}

                <button
                  key={item.value}
                  className="text-[12px] p-1 my-1 flex m-auto  hover:bg-gray-100"
                  onClick={() => {
                    onChangeValue && onChangeValue(item);
                  }}
                >
                  {item.label}
                </button>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;
