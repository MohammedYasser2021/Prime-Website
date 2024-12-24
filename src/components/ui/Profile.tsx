import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { LogOut } from "lucide-react";
import { logout } from "@/app/[locale]/(auth)/log-in/_api";

// import { useTranslation } from "react-i18next";
// import { useRouter } from "@/hooks/useRouter";

interface Props {
  profileName?: string;
  email?: string;
}
const Profile: React.FC<Props> = () => {
  const [opened, setOpened] = useState(false);
  const [profileData] = useState({ name: "", email: "" });
  const profileRef = useRef<HTMLDivElement>(null);
  // const { t } = useTranslation("profile");
  const items = [
    {
      label: "signout",
      Handler: () => {
        logout();
      },
    },
  ];

  const fetchData = async () => {
    /*const data = await getUser();
    setProfileData(data);*/
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpened(false);
      }
    }

    fetchData();

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
        <div
          id="profileChar"
          className=" h-full px-3 py-1 rounded-sm flex justify-center items-center bg-primary text-lg text-white"
        >
          A
        </div>

        <div className="flex flex-col gap-1 w-14 ">
          <span className="text-[12px]">{profileData.name}</span>
          <span className="text-[10px] text-[#0000008a]">
            {profileData.email}
          </span>
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
            className={`absolute z-40   -bottom-14 rounded-md w-full  bg-white flex flex-col  px-1 border-gray-300 border-[1px]`}
          >
            <div className=" flex items-center">
              <LogOut />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
