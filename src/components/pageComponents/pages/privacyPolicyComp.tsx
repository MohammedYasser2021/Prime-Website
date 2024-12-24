"use client";

import React from "react";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import { useParams } from "next/navigation";

type Props = {};

type ContentTypes = {
  title: string;
  description: string;
  url?: string;
};

const PrivacyPolicyComp = (props: Props) => {
  const { locale } = useParams();

  const content =
    locale === "en" ? en.PrivacyPage.content : ar.PrivacyPage.content;
  return (
    <>
      {
        //@ts-ignore
        content?.map((item: ContentTypes, index: number) => (
          <div key={index} className="flex flex-col gap-3">
            <h2 className="text-[20px] md:text-[23px] xl:text-[25px] font-semibold">
              - {item.title}
            </h2>
            <div className="mx-[22px] md:mx-[28px]">
              <div className="flex gap-1">
                <p className="font- mb-3">* {item.description}</p>
                {/* {item.url && (
                    <Link
                      href={`/${locale}/privacy-policy`}
                      className="underline hover:text-[#339af0]"
                    >
                      {item.url}
                    </Link>
                  )} */}
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default PrivacyPolicyComp;
