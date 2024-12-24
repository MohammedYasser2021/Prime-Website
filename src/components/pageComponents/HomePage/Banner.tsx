import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  image: any;
  link?: string;
  className?: string;
};

const Banner = (props: Props) => {
  const securedLink = props?.image?.link?.startsWith("http");

  return (
    <>
      {/* h-[300px] */}

      {props.image?.img && (
        <Link
          href={securedLink ? props?.image?.link : ""}
          className={`
          cursor-pointer w-full h-full`}
        >
          <Image
            src={props.image?.img}
            alt=""
            width={50000}
            height={50000}
            priority
            className={`${props.className} w-full h-full`}
          />
        </Link>
      )}
    </>
  );
};

export default Banner;
