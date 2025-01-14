import ProductFilterationClient from './ProductFilterationClient';
import { unstable_setRequestLocale } from 'next-intl/server';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" }
  ];
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Set the locale dynamically in server-side metadata generation
  unstable_setRequestLocale(locale);

  return {
    title: locale === "en" ? "Product Filteration" : "فلترة المنتجات",
    description: locale === "en" ? "Explore products with advanced filtering options." : "استكشاف المنتجات مع خيارات تصفية متقدمة.",
  };
}

export default function ProductFilterationPage({ params }: { params: { locale: string } }) {
  // Do not call unstable_setRequestLocale in client-side code.
  // Instead, just pass the `params` and handle locale-specific rendering in the component
  return <ProductFilterationClient params={params} />;
}
