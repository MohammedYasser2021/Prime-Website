import HomeComp from "@/components/pageComponents/pages/homeComp";
import Header from "./components/Header";
import Products from "./components/Products";
import Classification from "./components/Classification";
import Offers from "./components/Offers";
import RequestedProducts from "./components/RequestedProducts";
import Beauty from "./components/Beauty";
import Footer from "./components/Footer";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(params: any) {
  const { locale } = params.params;
  unstable_setRequestLocale(locale);
  return {
    title: locale === "en" ? "Mawared" : "موارد",
    description:
      locale === "en"
        ? "Welcome to Mawared, your gateway to quality products in the industry sector. Explore our featured collections, discover the latest trends, and find everything you need for your [industry] needs."
        : "مرحبًا بكم في موارد، بوابتكم إلى المنتجات عالية الجودة في قطاع الصناعة. استكشف مجموعاتنا المميزة، اكتشف أحدث الاتجاهات، وابحث عن كل ما تحتاجه لاحتياجاتك في قطاع الصناعة.",
  };
}

interface IndexProps {
  params: {
    locale: string;
  };
}

export default function Index({ params }: IndexProps) {
  return (
    <>
      <Header params={params} />
      <Products params={params} />
      <Classification params={params} />
      <Offers params={params} />
      <RequestedProducts params={params} />
      <Beauty params={params} />
      <Footer params={params} />
    </>
  );
}
