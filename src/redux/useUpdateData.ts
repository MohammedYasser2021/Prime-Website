import { api } from "@/lib/axios";
import { getCookie } from "cookies-next";

const useUpdateDataWithImage = async (url: string, parmas: any) => {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");
  const res = await api.put(url, parmas, {
    headers: {
      "Content-Type": "multipart/from-data",
      authorization: `Bearer ${logged}`,
    },
  });
  console.log(res);
  return res;
};

const useUpdateData = async (url: string, parmas?: any) => {
  const logged = getCookie("token");
  const res = await api.patch(url, parmas, {
    headers: { authorization: `Bearer ${logged}` },
  });
  return res;
};
export { useUpdateDataWithImage, useUpdateData };
