import { useTranslations } from "next-intl";

export default function DetailsSection({ data }: any) {
  const t = useTranslations("Tiltle");

  return (
    <div className=" border  rounded-md grid grid-cols-2 p-8 gap-5  my-9">
      <div className="mx-3 col-span-2 my-4 border-b border-black pb-3">
        {" "}
        Overview
      </div>

      <div>
        <h2 className=" font-bold text-xl ">{t("description")}</h2>
        {data.description ? (
          <p className=" break-words mx-3 text-gray-600">{data.description}</p>
        ) : null}
      </div>
      <div>
        <h2 className=" font-bold text-xl ">{t("properties")}</h2>

        <ul>
          {data.props.map(
            (prop: { title: string; props: [string] }, key: number) => {
              return (
                <li key={key}>
                  <h3 className=" font-bold text-lg mx-3">{prop.title}</h3>
                  <ul style={{ listStyle: "circle" }} className=" ">
                    {prop.props.map((prop: string, index: number) => {
                      return (
                        <li
                          className=" decoration-clone mx-8 text-gray-600"
                          key={index}
                        >
                          {prop}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
