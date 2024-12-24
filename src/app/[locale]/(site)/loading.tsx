import React from "react";

type Props = {};

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-20 h-20 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
