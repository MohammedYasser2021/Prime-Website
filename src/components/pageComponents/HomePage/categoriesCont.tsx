/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import Image from "next/image";
import img from "../../../../public/image.png";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: img,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: img,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: img,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: img,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function CategoriesCont({ slid }: any) {
  return (
    <div className="bg-white w-screen my-auto   ">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <div className=" grid grid-cols-4 xl:gap-x-8 ">
          {slid.map((slid: any) => (
            <div
              style={{ aspectRatio: 1 / 1 }}
              key={slid.id}
              className="group relative mx-2 md:mx-5 "
            >
              <div
                style={{ aspectRatio: 1 / 1 }}
                className=" w-full overflow-hidden rounded-full bg-gray-200 lg:aspect-none group-hover:opacity-75 flex items-center justify-center rou "
              >
                {slid.img ? (
                  <img
                    src={slid.img}
                    alt={slid.name}
                    className=" w-full object-cover object-center  lg:w-full"
                  />
                ) : null}
              </div>
              <div className="mt-4 flex justify-center">{slid.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
