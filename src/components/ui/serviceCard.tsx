import React from "react";

interface PropTypes {
  t: string;
  title: string;
  icon: React.ReactNode;
  clickHandler(val: string): void;
}

const ServiceCard: React.FC<PropTypes> = ({
  icon,
  title,
  t,
  clickHandler,
}: any) => {
  return (
    <div
      onClick={clickHandler.bind(this, { type: t, title: title })}
      className="h-52 border-[1px] cursor-pointer border-zinc-200 rounded-md flex flex-col justify-center gap-4 items-center "
    >
      <div className="p-4 bg-primary text-4xl rounded-full text-white flex items-center">
        {icon}
      </div>
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default ServiceCard;
