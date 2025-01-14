import  ClientPrimeProfile  from './ClientPrimeProfile';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" }
  ];
}

export default function ProfilePage({ params }: { params: { locale: string } }) {
  return <ClientPrimeProfile params={params} />;
}













