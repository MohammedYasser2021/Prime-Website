import ProductFilterationClient  from './ProductFilterationClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" }
  ];
}

export default function ProductFilterationPage({ params }: { params: { locale: string } }) {
  return <ProductFilterationClient params={params} />;
}













