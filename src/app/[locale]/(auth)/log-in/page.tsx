import LoginComp from "@/components/pageComponents/pages/loginComp";

export async function generateMetadata(params: any) {
  const { locale } = params.params;

  return {
    title: locale === "en" ? "Mawared | Login" : "موارد |  تسجيل الدخول",
    description:
      locale === "en"
        ? "Sign in to your Mawared account to access exclusive features, track orders, and manage your profile information securely."
        : "تسجيل الدخول إلى حسابك في موارد للوصول إلى ميزات حصرية، تتبع الطلبات، وإدارة معلومات ملفك الشخصي بأمان.",
  };
}
const Index = () => {
  return (
    <>
      <LoginComp />
    </>
  );
};

export default Index;
