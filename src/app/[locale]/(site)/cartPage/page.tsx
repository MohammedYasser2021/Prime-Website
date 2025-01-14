import { CartPageClient } from './CartPageClient';

export default function CartProductPage({ params }: { 
  params: { locale: string; productId: string } 
}) {
  return <CartPageClient params={params} />;
}