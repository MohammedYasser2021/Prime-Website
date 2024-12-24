import Link from "next/link";
import { useTranslations } from "next-intl";

const SubTiltle = ({
  title,
  btntitle,
  pathText,
}: {
  title?: string;
  btntitle?: string;
  pathText?: string;
}) => {
  const t = useTranslations("Tiltle");

  return (
    <div className="text-2xl md:text-3xl lg:text-4xl xxl:text-[48px] font-semibold text-center">
      {t(title)}
    </div>
  );
};

export default SubTiltle;
