"use client";

import { Provider } from "react-redux";
import React from "react";
import storeCounter from "@/redux/store/store";

type Props = {
  children: React.ReactNode;
};

function ProviderContainer({ children }: Props) {
  return <Provider store={storeCounter}>{children}</Provider>;
}

export default ProviderContainer;
