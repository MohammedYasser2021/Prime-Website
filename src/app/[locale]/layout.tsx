import "../globals.css";
import "../swiperCustom.css";
import "swiper/css";
import "swiper/css/effect-fade";

import { Inter, Noto_Kufi_Arabic } from "next/font/google";

import DashboardSideBar from "@/layouts/DashboardSideBar";
import Footer from "@/layouts/Footer";
import InfoBar from "@/layouts/InfoBar";
import type { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { Provider } from "react-redux";
import ProviderContainer from "@/components/Uitily/ProviderCont";
import ShoppingCarts from "@/layouts/ShoppingCarts";
import { ToastContainer } from "react-toastify";
import Toastify from "@/layouts/Toastify";
import icon from "../../../public/image.ico";
import { notFound } from "next/navigation";
import storeCounter from "@/redux/store/store";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Kufi_Arabic({ subsets: ["arabic"] });

// export const metadata: Metadata = {
//   title: "موارد",
//   description: "موارد",
//   icons: [{ rel: "icon", url: icon.src }],
// };

export async function generateMetadata(params: any) {
  const { locale } = params.params;

  return {
    title: locale === "en" ? "Mawared" : "موارد",
    description:
      locale === "en"
        ? "Discover a world of quality products at Mawared, your premier destination for all things industry. Explore our curated selection of industry-related items, from essentials to specialty products, all conveniently available at your fingertips. Shop with confidence and ease at Mawared – where quality meets convenience."
        : "اكتشف عالمًا من المنتجات عالية الجودة في موارد، وجهتك الرئيسية لجميع ما يتعلق بالصناعة. استكشف تشكيلتنا المختارة بعناية من العناصر ذات الصلة بالصناعة، من الضروريات إلى المنتجات الخاصة، كلها متاحة بسهولة على مدار الساعة. تسوق بثقة وسهولة في موارد - حيث تلتقي الجودة بالراحة.",
    icons: [
      { rel: "icon", url: icon.src },
      { rel: "apple", url: icon.src },
    ],
    keywords: [
      "mawared",
      "Mawared",
      "industry",
      "موارد للصناعة",
      "موارد",
      "Mawared e-store",
      "quality products",
      "online shopping",
      "best deals",
      "convenient shopping experience",
      "premium products",
      "shopping destination",
      "reliable service",
      "wide selection",
      "industry-specific items",
      "متجر موارد",
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
      title: locale === "en" ? "Mawared" : "موارد",
      description:
        locale === "en"
          ? "Discover a world of quality products at Mawared, your premier destination for all things industry. Explore our curated selection of industry-related items, from essentials to specialty products, all conveniently available at your fingertips. Shop with confidence and ease at Mawared – where quality meets convenience."
          : "اكتشف عالمًا من المنتجات عالية الجودة في موارد، وجهتك الرئيسية لجميع ما يتعلق بالصناعة. استكشف تشكيلتنا المختارة بعناية من العناصر ذات الصلة بالصناعة، من الضروريات إلى المنتجات الخاصة، كلها متاحة بسهولة على مدار الساعة. تسوق بثقة وسهولة في موارد - حيث تلتقي الجودة بالراحة.",
      // url: "<>",
      siteName: "Mawared",
      images: [
        {
          // put the url of the image to run it in metadata
          url: "https://mawaredpanelapi.ersaiss.com/logo/logo.webp",
          width: 80,
          height: 60,
        },
      ],
    },
    // viewport: {
    //   width: "device-width",
    //   initialScale: 0.5,
    //   maximumScale: 0.8,
    // },
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
