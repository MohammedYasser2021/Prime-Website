import HomeComp from "@/components/pageComponents/pages/homeComp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Classification from "./components/Classification";
import Offers from "./components/Offers";
import RequestedProducts from "./components/RequestedProducts";
import Beauty from "./components/Beauty";
import { unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(params: any) {
  const { locale } = params.params;
  unstable_setRequestLocale(locale);
  return {
    title: locale === "en" ? "PRIME" : "برايم",
    description:
      locale === "en"
        ? "Welcome to PRIME, your gateway to quality products in the industry sector. Explore our featured collections, discover the latest trends, and find everything you need for your [industry] needs."
        : "مرحبًا بكم في برايم بوابتكم إلى المنتجات عالية الجودة في منتجات الصناعة. استكشف مجموعاتنا المميزة، اكتشف أحدث الاتجاهات، وابحث عن كل ما تحتاجه لاحتياجاتك في منتجات الصناعة.",
  };
}
const linkAr = "/ar"; // Arabic link
const linkEn = "/en"; // English link
interface IndexProps {
  params: {
    locale: string;
  };
}

export default function Index({ params }: IndexProps) {
  return (
    <>
      <Header params={params} linkAr = {linkAr} linkEn = {linkEn}/>
      <Products params={params} />
      <Classification params={params} />
      <Offers params={params} />
      <RequestedProducts params={params} />
      <Beauty params={params} />
      <Footer params={params} />
    </>
  );
}
