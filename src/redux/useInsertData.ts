import { api } from "@/lib/axios";
import { getCookie } from "cookies-next";

const useInsertDataWithImage = async (url: string, parmas: any) => {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");
  const res = await api.post(url, parmas, {
    headers: {
      "Content-Type": "multipart/from-data",
      authorization: `Bearer ${logged}`,
    },
  });
  console.log(logged);
  return res;
};

const useInsertData = async (url: string, parmas: any) => {
  const logged = getCookie("token");

  const res = await api.post(url, parmas, {
    headers: { authorization: `Bearer ${logged}` },
  });
  console.log(res);
  console.log(res);

  return res;
};
export { useInsertDataWithImage, useInsertData };
