import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import React, { ChangeEvent, Fragment, useState } from "react";

import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { useParams } from "next/navigation";

type Props = {
  setLimit: (limit: number) => void;
  limit: number;
  previewOptions: number[];
  t: any;
};

const sortOptions = [
  "Most Popular",
  "Best Rating",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];

const SortAndShow = ({ setLimit, limit, previewOptions, t }: Props) => {
  const [selectedPreview, setSelectedPreview] = useState(sortOptions[0]);
  const [selectedPreviewNumber, setSelectedPreviewNumber] = useState(
    previewOptions[0]
  );

  const { locale } = useParams();

  //  const handleChange = (event: any, value: number) => {
  //     onPageChange(event, value);
  //     setSelected();
  //     setSelectedPreview();
  //     const newLimit = event.target.value;

  //     onLimitChange(newLimit);
  //  };

  const handleSelectedPreviewChange = (event: string) => {
    setSelectedPreview(event);
  };

  const handleSelectedPreviewNumber = (event: number) => {
    setSelectedPreviewNumber(event);
    setLimit(event);
    console.log(event);
  };
  return (
    <div className="flex items-center gap-5">
      {/* <div className="flex items-center gap-3">
        <h2 className="py-1 px-3 bg-slate-200 rounded-sm">Sort by:</h2>
        <div className="w-[150px]">
          <Listbox
            value={selectedPreview}
            onChange={handleSelectedPreviewChange}
          >
            <div className="relative mt-1 ">
              <Listbox.Button className="relative w-full cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
                <span className="block truncate">{selectedPreview}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="ltr:ml-2 rtl:mr-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 left-[50%] translate-x-[-50%] w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {sortOptions.map((option, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 transition-all duration-300 ease-in-out ${
                          active ? "bg-primary bg-opacity-20 " : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center gap-1">
                            {selected ? (
                              <CheckIcon
                                className="h-4 w-4 text-primary"
                                aria-hidden="true"
                              />
                            ) : null}
                            <h1
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {option}
                            </h1>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div> */}

      <div className="flex items-center gap-3">
        <h2 className="py-1 px-3 bg-slate-200 rounded-sm">{t("show")}</h2>
        <div className="w-20">
          <Listbox
            value={selectedPreviewNumber}
            onChange={handleSelectedPreviewNumber}
          >
            <div className="relative mt-1 ">
              <Listbox.Button
                className={`relative w-full cursor-default py-2 ${
                  locale === "ar" ? "pr-3 pl-10" : "pl-3 pr-10"
                } focus:outline-none focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm`}
              >
                <span className="block truncate">
                  {locale === "ar"
                    ? convertNumbersToArabicNumerals(selectedPreviewNumber)
                    : selectedPreviewNumber}
                </span>
                <span className="pointer-events-none absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="ltr:ml-2 rtl:mr-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-20 left-[50%] translate-x-[-50%] w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {previewOptions.map((option, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-3 transition-all duration-300 ease-in-out ${
                          active ? "bg-primary bg-opacity-20 " : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center gap-2">
                            {selected ? (
                              <CheckIcon
                                className="h-4 w-4 text-primary"
                                aria-hidden="true"
                              />
                            ) : null}
                            <h1
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              }`}
                            >
                              {locale === "ar"
                                ? convertNumbersToArabicNumerals(option)
                                : option}
                            </h1>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default SortAndShow;
