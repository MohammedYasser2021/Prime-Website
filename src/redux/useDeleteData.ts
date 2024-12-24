import { api } from "@/lib/axios";
import { getCookie } from "cookies-next";

export default async function useDeleteData(url: string) {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");
  const res = await api.delete(url, {
    headers: { authorization: `Bearer ${logged}` },
  });

  return res;
}
