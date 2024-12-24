import * as Yup from "yup";

export const registerSchema = (t: any) => {
  return Yup.object().shape({
    fullName: Yup.string().required(t("errors.fullName.empty")),
    nickName: Yup.string().required(t("errors.nickName.empty")),
    country: Yup.string().required(t("errors.country.empty")),
    city: Yup.string().required(t("errors.city.empty")),
    email: Yup.string().required(t("errors.email.empty")),
    rEmail: Yup.string().required(t("errors.email.empty")),
    phone: Yup.string().required(t("errors.phone.empty")),
    //.matches(saudiRegex, t("errors.phoneNumber.invalid")),
    password: Yup.string()
      .required(t("errors.password.empty"))
      .min(8, t("errors.password.invalid")),
    confirmPassword: Yup.string()
      .required(t("errors.confirmPassword.empty"))
      .oneOf([Yup.ref("password")], t("errors.confirmPassword.invalid")),
  });
};