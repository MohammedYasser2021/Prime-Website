import { deleteCookie, setCookie } from "cookies-next";

import { api } from "@/lib/axios";
import axios from "axios";
import { runToastify } from "@/redux/reducer/notifications";

// types

// consts
const login = async (body: any) => {
  const domainName = window.location.hostname;

  const { status, data } = await axios.post(
    `${process.env.AUTH_URL}user/login `,
    body
  );
  if (status === 200) {
    setCookie("token", data.token, {
      secure: true,
      domain: domainName,
      path: "/",
    });
  } 
  return data;
};

const logout = async () => {
  // Log to check if the function is being executed
  console.log("Logging out...");
  const domainName = window.location.hostname;
  const pathname = window.location.pathname;

  // Attempt to remove the "user" cookie
  try {
    await deleteCookie("token", {
      domain: domainName,
      path: "/",
    });
    console.log("User cookie removed successfully.");
  } catch (error) {
    console.error("Error removing user cookie:", error);
  }

  // Clear local storage
  localStorage.clear();

  // Redirect to the currrent page
  window.location.assign(pathname);
};

export { login, logout };
