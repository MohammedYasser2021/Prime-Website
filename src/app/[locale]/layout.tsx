import "../globals.css";
import "../swiperCustom.css";
import "swiper/css";
import "swiper/css/effect-fade";

import { Inter, Noto_Kufi_Arabic } from "next/font/google";


import { NextIntlClientProvider } from "next-intl";
import ProviderContainer from "@/components/Uitily/ProviderCont";
import ShoppingCarts from "@/layouts/ShoppingCarts";
import Toastify from "@/layouts/Toastify";
import icon from "../../assets/homeImages/logo.png";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export async function generateMetadata(params: any) {
  const { locale } = params.params;

  return {
    title: locale === "en" ? "PRIME" : "برايم",
    description:
      locale === "en"
        ? "Discover a world of quality products at PRIME, your premier destination for all things industry. Explore our curated selection of industry-related items, from essentials to specialty products, all conveniently available at your fingertips. Shop with confidence and ease at PRIME – where quality meets convenience."
        : "اكتشف عالمًا من المنتجات عالية الجودة في برايم وجهتك الرئيسية لجميع ما يتعلق بالصناعة. استكشف تشكيلتنا المختارة بعناية من العناصر ذات الصلة بالصناعة، من الضروريات إلى المنتجات الخاصة، كلها متاحة بسهولة على مدار الساعة. تسوق بثقة وسهولة في برايم - حيث تلتقي الجودة بالراحة.",
    icons: [
      { rel: "icon", url: icon.src },
      { rel: "apple", url: icon.src },
    ],
    keywords: [
      "prime",
      "Prime",
      "PRIME",
      "industry",
      "برايم للصناعة",
      "برايم",
      "PRIME e-store",
      "quality products",
      "online shopping",
      "best deals",
      "convenient shopping experience",
      "premium products",
      "shopping destination",
      "reliable service",
      "wide selection",
      "industry-specific items",
      "متجر برايم",
      "منتجات عالية الجودة",
      "تجربة تسوق عبر الإنترنت",
      "أفضل العروض",
      "تجربة تسوق مريحة",
      "منتجات ممتازة",
      "وجهة للتسوق",
      "خدمة موثوقة",
      "تشكيلة واسعة",
      "منتجات متخصصة في الصناعة",
    ],
    openGraph: {
      title: locale === "en" ? "PRIME" : "برايم",
      description:
        locale === "en"
          ? "Discover a world of quality products at PRIME, your premier destination for all things industry. Explore our curated selection of industry-related items, from essentials to specialty products, all conveniently available at your fingertips. Shop with confidence and ease at PRIME – where quality meets convenience."
          : "اكتشف عالمًا من المنتجات عالية الجودة في برايم وجهتك الرئيسية لجميع ما يتعلق بالصناعة. استكشف تشكيلتنا المختارة بعناية من العناصر ذات الصلة بالصناعة، من الضروريات إلى المنتجات الخاصة، كلها متاحة بسهولة على مدار الساعة. تسوق بثقة وسهولة في برايم - حيث تلتقي الجودة بالراحة.",
      // url: "<>",
      siteName: "PRIME",
      images: [
        {
          // put the url of the image to run it in metadata
          url: "../../assets/homeImages/logo.png",
          width: 80,
          height: 60,
        },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang="en">
      <body
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${locale === "ar" ? noto.className : inter.className} `}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProviderContainer>
            <ShoppingCarts></ShoppingCarts>
            <Toastify></Toastify>
            <main>{children}</main>
          </ProviderContainer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
