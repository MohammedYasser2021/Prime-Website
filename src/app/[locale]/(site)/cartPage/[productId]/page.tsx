

import  CartProductClient  from './CartProductClient';


export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },

  ];
}

interface ProductDetailProps {
  params: {
    locale: string;
    productId: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {

  return <CartProductClient params={params} />;
};

export default ProductDetail;
