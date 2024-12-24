import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
interface Props {
  profileName?: string;
  email?: string;
}
const Profile: React.FC<Props> = ({ profileName, email }) => {
  const [opened, setOpened] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("profile");
  const router = useRouter();
  const items = [
    {
      label: t("profile"),
      Handler: () => {
        router.push("profile");
      },
    },
    {
      label: t("signout"),
      Handler: () => {
        console.log("signed out");
      },
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={profileRef}>
      <div
        onClick={() => setOpened(!opened)}
        className="flex gap-2 h-full justify-center items-center cursor-pointer "
      >
        <div className=" h-full px-4 rounded-sm flex justify-center items-center bg-[#FFA500] text-lg text-white">
          F
        </div>

        <div className="flex flex-col gap-2  ">
          <span className="text-[12px]">{profileName}</span>
          <span className="text-[10px] text-[#0000008a]">{email}</span>
        </div>
      </div>
      <AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          onClick={() => setOpened(false)}
          className={`absolute z-40  -bottom-24 rounded-md w-full  bg-white flex flex-col  px-1 border-gray-300 border-[1px]`}
        >
          {items.map((item, index) => {
            return (
              <button
                key={index}
                onClick={item.Handler}
                className="text-[12px] my-1 p-2 flex justify-between flex-1 hover:bg-gray-100"
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
