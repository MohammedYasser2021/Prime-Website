"use client";

import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { useAppSelector } from "@/redux/reduxHooks";

export default function Toastify() {
  const data = useAppSelector((state) => state.ToastifyDate.messsge);

  useEffect(() => {
    data === "" ? null : toast(data);
  }, [data]);
  return (
    <div>
      <ToastContainer limit={3} draggablePercent={60} pauseOnHover={false} />
    </div>
  );
}
