import React, { useState } from "react";

import { useTranslations } from "next-intl";

type Props = {
  text: string | undefined;
  classText?: string;
  buttonText?: string[];
};

const ExpandableText = ({ text, classText, buttonText }: Props) => {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <span className={isExpanded ? "" : `${classText ?? "truncate-lines"}`}>
        {text}
      </span>

      <button
        onClick={toggleExpansion}
        className="text-blue-500 font-medium ml-2 text-base hd:text-lg hover:underline hover:text-primary-800 transition-all duration-300 ease-in-out"
      >
        {buttonText
          ? buttonText[isExpanded ? 1 : 0]
          : isExpanded
          ? t("Usable.showLess")
          : t("Usable.showMore")}
      </button>
    </>
  );
};

export default ExpandableText;
