import * as Yup from "yup";

export const citySchema = (t: any) => {
  return Yup.object().shape({
    city_title_ar: Yup.string().required(t("ValidationError")),
    city_title_en: Yup.string().required(t("ValidationError")),
  });
};

export const typesSchema = (t: any) => {
  return Yup.object().shape({
    type_title_ar: Yup.string().required(t("ValidationError")),
    type_title_en: Yup.string().required(t("ValidationError")),
  });
};

export const regionsSchema = (t: any) => {
  return Yup.object().shape({
    region_title_ar: Yup.string().required(t("ValidationError")),
    region_title_en: Yup.string().required(t("ValidationError")),
  });
};

export const filterSchema = (t?: any) => {
  return Yup.object().shape({
    category: Yup.array().of(Yup.string()),
    subCategory: Yup.array().of(Yup.string()),
    // seller: Yup.string().notRequired(),
    price: Yup.array()
      .of(Yup.number().min(0))
      .min(2, "Please enter a price range"),
    // availability: Yup.string().notRequired(),
    // newArrivals: Yup.string().notRequired().nullable(),
    brand: Yup.array().of(Yup.string()),
    // tags: Yup.string().notRequired(),
  });
};

export const addRatingsSchema = (t?: any) => {
  return Yup.object().shape({
    firstName: Yup.string().required(
      t("ProductPage.sections.titles.reviews.form.ValidationError.firstName")
    ),
    lastName: Yup.string().required(
      t("ProductPage.sections.titles.reviews.form.ValidationError.lastName")
    ),
    comment: Yup.string().required(
      t("ProductPage.sections.titles.reviews.form.ValidationError.review")
    ),
  });
};


export const servicesShcema = (t: any) => {
  return Yup.object().shape({
    firstName: Yup.string().required(t("errors.firstName.empty")),
    lastName: Yup.string().required(t("errors.lastName.empty")),
    email: Yup.string()
      .required(t("errors.email.empty"))
      .email(t("errors.email.invalid")),
    description: Yup.string().required(t("errors.message.empty")),
  });
};
