// In CartPage.tsx
import { CartPageClient } from './CartPageClient';
import { unstable_setRequestLocale } from 'next-intl/server';

export const dynamicParams = false;

// Static params definition for the locales
export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },
  ];
}

// Metadata generation based on locale
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Set the locale dynamically for metadata generation (server-side)
  unstable_setRequestLocale(locale);

  return {
    title: locale === "en" ? "Cart" : "سلة التسوق",
    description: locale === "en"
      ? "Review and manage your shopping cart items."
      : "راجع وادارة عناصر سلة التسوق الخاصة بك.",
  };
}

// CartProductPage component that uses CartPageClient
interface CartProductPageProps {
  params: {
    locale: string;
  };
}

const CartProductPage: React.FC<CartProductPageProps> = ({ params }) => {
  return <CartPageClient params={params} />;
};

export default CartProductPage;
