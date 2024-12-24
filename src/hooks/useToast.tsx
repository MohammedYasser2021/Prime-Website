import { Ban, CheckCircle } from "lucide-react";

import { toast } from "react-toastify";

type Theme = "light" | "dark" | "colored" | "system";
type Toast = "success" | "error" | "normal";

const theme = () => {
  let themeType: Theme = "light";
  const getTheme = (window.localStorage.getItem("theme") as Theme) || "system";

  if (getTheme === "system") {
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? (themeType = "dark")
      : (themeType = "light");
  } else {
    themeType = getTheme;
  }
  return themeType;
};

const triggerToast = (t: Toast, msg: string) => {
  if (t === "success") {
    toast.success(msg, {
      icon: <CheckCircle className="text-success" />,
      pauseOnFocusLoss: false,
      autoClose: 2000,
      toastId: msg,
    });
  } else if (t === "error") {
    toast.error(msg, {
      icon: <Ban className="text-destructive" />,
      pauseOnFocusLoss: false,
      autoClose: 2000,
      toastId: msg,
    });
  } else if (t === "normal") {
    toast(msg, { pauseOnFocusLoss: false, autoClose: 2000, toastId: msg });
    //
  }
};
export { theme, triggerToast };
