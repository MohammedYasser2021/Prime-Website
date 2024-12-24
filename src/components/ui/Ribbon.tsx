import React from "react";

type Props = {
  translate: any;
  boxClassName: string;
  textClassName: string;
};

const Ribbon = (props: Props) => {
  return (
    // xl:top-[-20px] xl:left-[50px]
    <div className={`w-[80px] h-[80px] ${props.boxClassName}`}>
      <div
        className={`w-[200px] text-center uppercase text-[0.8rem] py-[6px] text-white ${props.textClassName}`}
      >
        For highest price{" "}
      </div>
    </div>
  );
};

export default Ribbon;
