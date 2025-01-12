"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/AccordionShadcn";
import { Dialog, Transition } from "@headlessui/react";
import { FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import AllProduct from "@/components/AllProduct";
import ExamplePagination from "@/components/Uitily/paginationShad";
import { FaListUl } from "react-icons/fa6";
import { GetStaticProps } from "next";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import Loading from "@/components/Uitily/Loading";
import { MdClear } from "react-icons/md";
import { Slider } from "@/components/ui/Range-slider";
import SortAndShow from "@/components/Uitily/sortAndShow";
import Spinner from "@/components/Uitily/Spinner";
import { Tooltip } from "react-tooltip";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { capitalizeFirstLetter } from "@/utils/captilizeFirstLetter";
import { commaSpliter } from "@/utils/commaSpliter";
import { convertNumbersToArabicNumerals } from "@/utils/handleArabicNumerals";
import { getAllBrand } from "@/redux/reducer/brandSlice";
import { getAllCategory } from "@/redux/reducer/categorySlice";
import { getAllFilterProps } from "@/redux/reducer/PropertiesSlice";
import { getAllProducts } from "@/redux/reducer/productsSlice";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";

let previewOptions = [10, 15, 20];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  messages: Record<string, string>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

// Define the type for values object
type ValuesType = {
  _id: string;
  title: string;
  icons?: boolean;
  values: {}[];
  type: string;
  filter_flag: boolean;
};

type FormInitialValues = {
  _id: string;
  values: {}[];
};

const ShopComp = () => {
  // const [
  //   allCategoryData,
  //   allBrandData,
  //   clickCategory,
  //   clickBrand,
  //   priceTo,
  //   priceFrom,
  // ] = SidefilterShearchHook();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [optionsCategory, setOptionsCategory] = useState([]);
  const [optionsBrand, setOptionsBrand] = useState([]);
  const [preview, setPreview] = useState("");
  const [formReset, setFormReset] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(previewOptions[0]);
  const [hasValues, setHasValues] = useState(false);

  const { locale } = useParams();
  const useSearch = useSearchParams();
  const searchQuery = useSearch.get("query");
  const categoryParam = useSearch.get("category");
  const subCategoryParam = useSearch.get("subCategory");
  const brandParam = useSearch.get("brand");

  const router = useRouter();
  const dispach = useAppDispach();
  const t = useTranslations("ShopPage");

  const { Category, isLioding: isLoadingCategory } = useAppSelector(
    (state) => state.categoryData
  );
  const { brand, isLioding: isLoadingBrand } = useAppSelector(
    (state) => state.brandData
  );
  const { filterProperty, isLoading: isLoadingFilterProperty } = useAppSelector(
    (state) => state.propsData
  );
  const { product, isLoading: isLoadingProducts } = useAppSelector(
    (state) => state.productsData
  );

  const handleClear = () => {
    resetForm();
    setHasValues(false);
    setFormReset(true); // Signal the slider to reset
    window.history.replaceState(null, "", window.location.pathname); // Replace the current URL without hash
    dispach(getAllProducts({ page, limit }));
    dispach(getAllFilterProps({}));
  };

  const filters = [
    {
      _id: "category",
      isDirectVal: false,
      title: t("filters.categories"),
      type: "string",
      values: filterProperty?.categories ? filterProperty?.categories : [],
    },
    {
      _id: "currency",
      isDirectVal: true,

      title: t("filters.currencies"),
      type: "string",
      values: filterProperty?.currencies
        ? filterProperty?.currencies.map((el: string) => ({
            _id: el,
            name: capitalizeFirstLetter(el),
          }))
        : [],
    },
    {
      _id: "subs",
      isDirectVal: false,

      title: t("filters.subCategory"),
      type: "string",
      values: filterProperty?.sub_categories
        ? filterProperty?.sub_categories
        : [],
    },
    {
      _id: "vendor",

      title: t("filters.vendors"),
      type: "string",
      values: filterProperty?.vendors ? filterProperty?.vendors : [],
    },
    {
      _id: "price",

      title: t("filters.price"),
      type: "number",
      min: filterProperty?.price ? filterProperty?.price.minPrice : "",
      max: filterProperty?.price ? filterProperty?.price.maxPrice : "",
      values: filterProperty?.price ? [filterProperty?.price] : [],
    },
    {
      _id: "brand",
      isDirectVal: false,

      title: t("filters.brands"),
      icons: true,
      values: filterProperty?.brands ? filterProperty?.brands : [],
      type: "string",
    },
    {
      _id: "tags",
      isDirectVal: false,

      title: t("filters.tags"),
      type: "string",
      values: filterProperty?.tags ? filterProperty?.tags : [],
    },
  ];

  // Add the new dynamic props to the CustomDynamicFilter array
  const CustomDynamicFilter: any = [...filters];

  if (filterProperty?.props) {
    filterProperty?.props?.forEach((prop: any) => {
      CustomDynamicFilter.push(prop);
    });
  }

  const newInitialValues: FormInitialValues = (() => {
    let obj: any = {};
    CustomDynamicFilter.filter(
      (filter: any) => filter.type === "string" || filter.type === "number"
    ).map((filter: any) => {
      obj[filter._id] = [];
    });
    return obj;
  })();

  const { resetForm, values, setFieldValue, submitForm } = useFormik({
    initialValues: newInitialValues,
    enableReinitialize: false,
    onSubmit: (formSubmitData: any) => {
      console.log(formSubmitData, "values 1");
    },
  });

  const handleChangeCheckbox = (
    sectionId: string,
    itemId: string,
    itemValue?: number[]
  ) => {
    if (itemValue) {
      // Handle case when itemValue is provided
      setFieldValue(sectionId, {
        value: itemValue,
        sectionId: sectionId,
      });

      dispach(
        getAllFilterProps({
          ...values,
          // [sectionId]: itemValue,
        })
      );
      dispach(
        getAllProducts({
          ...values,
          [sectionId]: { value: itemValue },
          page,
          limit,
        })
      );
    } else {
      // Get the current value of the checkbox group
      const currentValue = values[sectionId];

      // Check if the itemId is already in the array
      const isNewValue =
        Array.isArray(currentValue) &&
        currentValue.some((val) => val.itemId === itemId);

      const newValue = isNewValue
        ? currentValue.filter((val: any) => val.itemId !== itemId) // Remove itemId if it exists
        : [
            // ...(Array.isArray(currentValue) ? currentValue : [currentValue]),
            { itemId, sectionId },
          ]; // Add itemId if it doesn't exist
      console.log(newValue, "currentValue newValue");

      setFieldValue(sectionId, newValue);

      dispach(
        getAllFilterProps({
          ...values,
          [sectionId]: newValue,
        })
      );

      dispach(
        getAllProducts({
          ...values,
          [sectionId]: newValue,
          page,
          limit,
        })
      );
    }

    setHasValues(!hasValues);
  };

  useEffect(() => {
    dispach(getAllCategory());
    dispach(getAllBrand());
  }, [dispach]);

  useEffect(() => {
    if (searchQuery) {
      dispach(
        getAllProducts({
          name: searchQuery,
          page,
          limit,
        })
      );
      dispach(getAllFilterProps({ name: searchQuery }));
    } else {
      dispach(getAllFilterProps({}));
    }
  }, [dispach, limit, page, searchQuery]);

  useEffect(() => {
    if (formReset) {
      // Reset the slider
      setFormReset(false);
    }
  }, [formReset]);

  useEffect(() => {
    if (Category) {
      let arry: any = [];

      Category?.forEach((data: any) => {
        arry.push({
          id: data.id,
          value: data.name,
          checked: false,
        });
      });
      setOptionsCategory(arry);
    }
  }, [Category]);

  useEffect(() => {
    if (brand) {
      let arry: any = [];

      brand?.forEach((data: any) => {
        arry.push({
          id: data?.id,
          value: data?.name,
          image: data?.img,
          checked: false,
        });
      });
      setOptionsBrand(arry);
    }
  }, [brand]);

  useEffect(() => {
    setFieldValue(
      "category",
      categoryParam ? [{ sectionId: "category", itemId: categoryParam }] : []
    );
    setFieldValue(
      "subCategory",
      subCategoryParam
        ? [{ sectionId: "subCategory", itemId: subCategoryParam }]
        : []
    );
    setFieldValue(
      "brand",
      brandParam ? [{ sectionId: "brand", itemId: brandParam }] : []
    );

    if (categoryParam && !subCategoryParam) {
      dispach(
        getAllFilterProps({
          category: [{ sectionId: "category", itemId: categoryParam }],
        })
      );
      dispach(
        getAllProducts({
          ...values,
          category: [{ sectionId: "category", itemId: categoryParam }],
          page,
          limit,
        })
      );
    }

    if (subCategoryParam) {
      dispach(
        getAllFilterProps({
          category: [{ sectionId: "category", itemId: categoryParam }],
          subCategory: [{ sectionId: "subCategory", itemId: subCategoryParam }],
        })
      );

      dispach(
        getAllProducts({
          ...values,
          category: [{ sectionId: "category", itemId: categoryParam }],
          subCategory: [{ sectionId: "subCategory", itemId: subCategoryParam }],
          page,
          limit,
        })
      );
    }

    if (brandParam) {
      dispach(
        getAllFilterProps({
          brand: [{ sectionId: "brand", itemId: brandParam }],
        })
      );
      dispach(
        getAllProducts({
          ...values,
          brand: [{ sectionId: "brand", itemId: brandParam }],
          page,
          limit,
        })
      );
    }
  }, [categoryParam, subCategoryParam, brandParam, dispach, limit, page, setFieldValue, values]);
  console.log(values, "testtttttttttttttt");

  useEffect(() => {
    if (!subCategoryParam && !categoryParam && !brandParam) {
      dispach(getAllProducts({ page, limit }));
    }
  }, [categoryParam, subCategoryParam, brandParam, page, limit, dispach]);

  // To disable the clear button
  useEffect(() => {
    for (const key in values) {
      if (values[key].length > 0) {
        setHasValues(true);
      }
    }
  }, [values]);

  const accordionFilter = (
    <Accordion
      className="w-full ltr:pl-2 rtl:pr-2"
      type="single"
      defaultValue={`item-${CustomDynamicFilter[0]._id}`}
      collapsible
    >
      {CustomDynamicFilter?.map(
        (section: any, sectionIdx: number) =>
          section?.values &&
          section?.values?.length > 0 && (
            <AccordionItem key={sectionIdx} value={`item-${section?._id}`}>
              <AccordionTrigger className="">
                {capitalizeFirstLetter(section?.title)}
              </AccordionTrigger>

              <AccordionContent
                className={`${
                  section.icons ? "flex-wrap" : "flex-col"
                } gap-2 flex pt-1`}
              >
                {section?.values?.map((option: any, optionIdx: number) => (
                  <div
                    key={optionIdx}
                    className={`${
                      section?.type == "number" ? "flex-col" : "flex-row"
                    } flex items-center`}
                  >
                    {section?.type == "string" &&
                      (section?.icons && option?.img ? (
                        <div className=" w-full h-full flex flex-col items-center">
                          <div className="relative">
                            <Image
                              id={option["id"]}
                              src={option?.img}
                              width={20000}
                              height={20000}
                              alt="brand"
                              className="w-[55px] h-[45px] cursor-pointer"
                              onClick={() =>
                                handleChangeCheckbox(
                                  section["_id"],
                                  option["id"]
                                )
                              }
                            />
                            {Array.isArray(values?.brand) &&
                              values?.brand?.some(
                                (item: any) => item["itemId"] == option["id"]
                              ) && (
                                <div
                                  onClick={() =>
                                    handleChangeCheckbox(
                                      section["_id"],
                                      option["id"]
                                    )
                                  }
                                  role="status"
                                  className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2  bg-black bg-opacity-40 z-10 h-full w-full flex items-center justify-center cursor-pointer"
                                >
                                  {/* <FaCheck className="text-white text-lg drop-shadow-lg" /> */}
                                  <IoMdCloseCircle className="text-white/80 text-lg drop-shadow-lg" />
                                </div>
                              )}
                          </div>
                          <span className="text-center w-full text-sm text-gray-600">
                            (
                            {locale === "ar"
                              ? convertNumbersToArabicNumerals(
                                  option?.no_of_products
                                )
                              : option?.no_of_products}
                            )
                          </span>
                        </div>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            id={option["_id"]}
                            name={option["_id"]}
                            value={
                              option["name"] || option["value"] || option?.name
                            }
                            onChange={() =>
                              handleChangeCheckbox(
                                section["_id"],
                                option["_id"] || option["id"] || option?.name
                              )
                            }
                            // onBlur={handleBlur}
                            checked={
                              Array.isArray(values[section["_id"]]) &&
                              values[section["_id"]].some(
                                (val: any) =>
                                  val?.itemId ===
                                  (option["_id"] ||
                                    option["id"] ||
                                    option?.name)
                              )
                                ? true
                                : false
                            }
                          />

                          <label
                            htmlFor={`filter-${section?._id}-${optionIdx}`}
                            className="mx-3 text-sm text-gray-600"
                          >
                            {option["name"] || option["value"]} (
                            {locale === "ar"
                              ? convertNumbersToArabicNumerals(
                                  option?.no_of_products
                                )
                              : option?.no_of_products}
                            )
                          </label>
                        </>
                      ))}
                    {section?.type == "number" &&
                    section._id == "price" &&
                    option?.minPrice < option?.maxPrice &&
                    values.currency.length > 0 ? (
                      <Slider
                        id={option?.["_id"]}
                        min={option?.minPrice}
                        max={option?.maxPrice}
                        step={Math.floor(
                          (option?.maxPrice - option?.minPrice) / 15
                        )}
                        defaultValue={[option?.minPrice, option?.maxPrice]}
                        onValueChange={(value: number[]) =>
                          handleChangeCheckbox(section["_id"], "string", value)
                        }
                        onBlur={() => {
                          submitForm();
                        }}
                        reset={formReset}
                        setReset={setFormReset}
                      />
                    ) : null}{" "}
                  </div>
                ))}

                {section?.type == "number" &&
                  section._id != "price" &&
                  section?.max < section?.min && (
                    <Slider
                      id={section?.["_id"]}
                      min={section?.min}
                      max={section?.max}
                      step={Math.floor((section?.max - section?.min) / 15)}
                      defaultValue={[section?.min, section?.max]}
                      onValueChange={(value: number[]) =>
                        handleChangeCheckbox(section["_id"], "string", value)
                      }
                      onBlur={() => {
                        submitForm();
                      }}
                      reset={formReset}
                      setReset={setFormReset}
                    />
                  )}
              </AccordionContent>
            </AccordionItem>
          )
      )}
    </Accordion>
  );

  const clearFilterBox = (
    <div className="mb-4 flex items-center justify-between">
      <div className="w-fit text-[17px]">
        <h1 className="font-semibold text-gray-900 tracking-wide">
          {t("filter")}
        </h1>
        <div className="border-b border-primary text-sm font-medium text-primary"></div>
      </div>
      <button
        disabled={!hasValues}
        onClick={handleClear}
        className={`flex gap-2 items-center ${
          hasValues
            ? "bg-primary hover:bg-secondary text-white cursor-pointer"
            : "text-black/80 bg-gray-300 cursor-not-allowed"
        } transition-all duration-300 ease-in-out rounded-[4px] px-2 py-1 text-center text-xs`}
      >
        <MdClear
          className={`${
            hasValues ? "text-primary" : "text-black/80"
          } bg-white rounded-full`}
        />

        <h1 className="capitalize pt-0.5">{t("clear")}</h1>
      </button>
    </div>
  );

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-300"
                enterFrom="translate-x-5"
                enterTo="translate-x-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-5"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      {t("filter")}
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}

                  <div className={`px-2 py-5 max-w-xs w-full h-full`}>
                    {/* Clear Box (in the same file) */}
                    {clearFilterBox}
                    <div className="relative w-full h-full">
                      {/* Show the accordion (in the same file) */}
                      {accordionFilter}

                      {isLoadingFilterProperty ||
                        (isLoadingProducts && <Spinner />)}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div className="border-b border-gray-200 mt-7 px-4 w-full h-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xxl:px-0">
            <div className="w-fit">
              <h1 className="text-2xl font-bold tracking-normal text-gray-900">
                {t("search_page")}
              </h1>
              <div className="border-b border-primary pb-2 text-sm font-medium text-primary"></div>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 xxl:px-0">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {/* grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 */}
            <div className="flex justify-between gap-10">
              {/* Filters */}
              <div
                className={`${
                  locale === "ar" ? "border-l pl-5" : "border-r pr-5"
                } py-5 hidden lg:block max-w-xs w-full h-full`}
              >
                {/* Clear Box (in the same file) */}
                {clearFilterBox}
                <div className="relative w-full h-full">
                  {/* Show the accordion (in the same file) */}
                  {accordionFilter}

                  {isLoadingFilterProperty ||
                    (isLoadingProducts && <Spinner />)}
                </div>
              </div>

              {/* Product grid */}
              <div className={`w-full`}>
                <div className="border-b border-gray-200 pb-3 mb-8">
                  <div className="bg-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold ">
                      {t("availableProducts")}(
                      {commaSpliter(product?.result, locale as string) +
                        (product?.result > 1 ? t("items") : t("item"))}
                      {t("from") +
                        commaSpliter(product?.total_recordes) +
                        t("item")}
                      )
                    </h3>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <button
                        type="button"
                        id="tooltip-grid"
                        onClick={() => setPreview("grid")}
                        className=" p-2 text-gray-400 hover:text-primary transition-all duration-300 ease-in-out"
                      >
                        <span className="sr-only">View grid</span>
                        <Squares2X2Icon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <Tooltip
                          anchorSelect="#tooltip-grid"
                          content={t("grid")}
                        />
                      </button>
                      <button
                        type="button"
                        id="tooltip-list"
                        onClick={() => setPreview("list")}
                        className=" p-2 text-gray-400 hover:text-primary transition-all duration-300 ease-in-out"
                      >
                        <span className="sr-only">View grid</span>
                        <FaListUl className="h-5 w-5" aria-hidden="true" />
                        <Tooltip
                          anchorSelect="#tooltip-list"
                          content={t("list")}
                        />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Pagination component */}
                      <SortAndShow
                        previewOptions={previewOptions}
                        setLimit={setLimit}
                        limit={limit}
                        t={t}
                      />

                      <button
                        type="button"
                        className=" p-2 text-gray-400 hover:text-gray-500  lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                      >
                        {/* <span className="sr-only">Filters</span> */}
                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                {isLoadingProducts ? (
                  <Loading />
                ) : (
                  <>
                    {product?.data && product?.data?.length > 0 && (
                      <AllProduct products={product?.data} preview={preview} />
                    )}
                  </>
                )}
                <div className="mt-10">
                  {(product?.results || product?.pages) && (
                    <ExamplePagination
                      totalItems={product?.results}
                      itemsPerPage={limit}
                      setPage={setPage}
                      pages={product?.pages}
                      t={t}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ShopComp;
