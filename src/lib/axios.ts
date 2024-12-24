// imports

import { deleteCookie, getCookie } from "cookies-next";

import axios from "axios";
import { splitMessage } from "@/utils/splitMessage";
import { triggerToast } from "../hooks/useToast";

const api = axios.create({ baseURL: process.env.API_URL });

// interceptors
api.interceptors.request.use(
  async (req) => {
    const token = getCookie("token") || null;

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    } else {
      req.headers.guest = true
    }

    // Set language header
    req.headers.lang =
      getCookie("NEXT_LOCALE") == "ar" ? getCookie("NEXT_LOCALE") : "en-US";
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    if (response.status.toString().startsWith("2")) {
        // toast here
        const {english,arabic} =splitMessage(typeof response.data.data == "string" ? response.data.data : response.data.message)
        // triggerToast("success", response.data.message.split("*#*")[1]);
        triggerToast("success", getCookie("NEXT_LOCALE") == "ar" ? arabic : english);
      
    }

    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 503) {
      const domainName = window.location.hostname;
      deleteCookie("token", {
        domain: domainName,
        path: "/",
      }); // redirect here to /
    }
    if (error.response.status === 404 && error.response.method === "get") {
      // redirect here to /*
    }

    if (
      !error.response.data.message.startsWith("We Can't Find") &&
      error.response.status !== 406 && error.response.status !== 500
    ) {
              const {english,arabic} =splitMessage(typeof error.response.data.data == "string" ? error.response.data.data :  error.response.data.message)

      // toast here
      // triggerToast("error", error.response.data.message.split("*#*")[1]);
      triggerToast("error", getCookie("NEXT_LOCALE") == "ar" ? arabic : english);
    }
    return Promise.reject(error);
  }
);
export { api };
