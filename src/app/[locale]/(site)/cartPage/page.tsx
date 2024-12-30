"use client";

import {
  ShoppingBag,
  Star,
  Heart,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Image1 from "../../../../assets/homeImages/img_1.avif";
import Image2 from "../../../../assets/homeImages/img_2.avif";
import ShopImg from "../../../../assets/homeImages/shop_bg.avif";
import Image3 from "../../../../assets/homeImages/img_3.jpg";
import CreamGel from "../../../../assets/homeImages/creamGel.jpg";
import AmlaOil from "../../../../assets/homeImages/oil.jpg";
import Serum from "../../../../assets/homeImages/serum.jpg";
import Perfume from "../../../../assets/homeImages/perfume.jpg";
import SkinCare from "../../../../assets/homeImages/skincare.jpg";

interface CartPageProps {
  params: {
    locale: string;
  };
}

const CartPage: React.FC<CartPageProps> = ({ params }) => {
  const { locale } = params;
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {locale == "en"
              ? "Natural Beauty Essentials"
              : "أساسيات الجمال الطبيعي"}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {locale == "en"
              ? "Discover our collection of organic and natural cosmetics "
              : "اكتشف مجموعتنا من مستحضرات التجميل العضوية والطبيعية"}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {locale == "en" ? "Shop Now" : "تسوق الأن"}{" "}
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {" "}
            {locale == "en" ? "Bestsellers" : "أفضل المبيعات"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: locale == "en" ? "Natural Face Cream" : "كريم وجه طبيعي",
                price: "$49.99",
                image: Image1,
              },
              {
                name: locale == "en" ? "Organic Lipstick" : "أحمر شفاه عضوي",
                price: "$24.99",
                image: Image2,
              },
              {
                name: locale == "en" ? "Serum" : "سيروم",
                price: "$39.99",
                image: Image3,
              },
              {
                name: locale == "en" ? "Vitamin C Serum" : "سيروم فيتامين سي",
                price: "$39.99",
                image: Serum,
              },
              {
                name: locale == "en" ? "Cream Gel" : "كريم جيل",
                price: "$50.58",
                image: CreamGel,
              },
              {
                name: locale == "en" ? "Amla Oil" : "زيت أملا",
                price: "$39.99",
                image: AmlaOil,
              },
              {
                name: locale == "en" ? "Perfume" : "عطر",
                price: "$39.99",
                image: Perfume,
              },
              {
                name: locale == "en" ? "SkinCare" : "العناية بالبشرة",
                price: "$20.99",
                image: SkinCare,
              },
            ].map((product, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div
                    className={`flex items-center mb-2 ${
                      locale == "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <h3
                    className={`font-semibold mb-2 ${
                      locale == "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {product.name}
                  </h3>
                  <div
                    className={`flex items-center justify-between ${
                      locale == "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <span className="text-lg font-bold">{product.price}</span>
                    <Button size="sm" className="text-white">
                      {locale == "en" ? "Add to Cart" : "أضف إلى السلة"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={ShopImg}
                alt="About Us"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2
                className={`text-3xl font-bold mb-6 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {locale == "en" ? "Our Story " : "قصتنا"}
              </h2>
              <p
                className={`text-lg text-muted-foreground mb-6 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {locale == "en"
                  ? "We believe in the power of nature to enhance your natural beauty. Our products are crafted with care using only the finest organic ingredients, ensuring that your skin receives the nourishment it deserves. "
                  : "نؤمن بقوة الطبيعة في تعزيز جمالك الطبيعي. منتجاتنا مصنوعة بعناية باستخدام أفضل المكونات العضوية فقط، لضمان حصول بشرتك على التغذية التي تستحقها."}
              </p>
              <ul
                className={`space-y-4 ${locale === "ar" ? "text-right" : ""}`}
              >
                {[
                  locale == "en"
                    ? "100% Natural Ingredients"
                    : "100% مكونات طبيعية",
                  locale == "en"
                    ? "Cruelty-Free Products"
                    : "منتجات خالية من القسوة",
                  locale == "en"
                    ? "Environmentally Conscious"
                    : "مراعية للبيئة",
                  locale == "en" ? "Dermatologically Tested" : "مختبرة طبياً",
                ].map((item, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      locale === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`h-2 w-2 bg-primary rounded-full mr-3 ${
                        locale === "ar" ? "ml-3" : ""
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "About Us" : "بنذة عننا"}
              </h3>
              <p
                className={`text-muted-foreground ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {locale == "en"
                  ? "Natural beauty products for everyone. Made with love and care for your skin."
                  : "منتجات الجمال الطبيعي للجميع. مصنوعة بحب وعناية لبشرتك."}
              </p>
            </div>
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "Quick Links" : "روابط سريعة"}
              </h3>
              <ul
                className={`space-y-2 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {[
                  locale == "en" ? "Shop" : "تسوق",
                  locale == "en" ? "About" : "عننا",
                  locale == "en" ? "Contact" : "الأسئلة الشائعة",
                  locale == "en" ? "FAQ" : "تواصل معنا",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "Contact" : "تواصل معنا"}
              </h3>
              <ul
                className={`space-y-2 text-muted-foreground ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                <li>
                  {" "}
                  {locale == "en"
                    ? "Email: hello@naturals.com"
                    : " hello@naturals.com :البريد الإلكتروني"}
                </li>
                <li>
                  {" "}
                  {locale == "en"
                    ? "Phone: (555) 123-4567"
                    : "الهاتف: (555) 123-4567"}
                </li>
                <li>
                  {" "}
                  {locale == "en"
                    ? "Address: 123 Beauty Street"
                    : "العنوان: 123 شارع الجمال"}
                </li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}>
                {" "}
                {locale == "en" ? "Follow Us" : "تابعنا"}
              </h3>
              <div className={`flex space-x-4 ${
                  locale == "ar" ? "justify-end" : "justify-start"
                }`}>
                {[
                  {
                    icon: Instagram,
                    label: locale == "en" ? "Instagram" : "انستجرام",
                  },
                  {
                    icon: Facebook,
                    label: locale == "en" ? "Facebook" : "فيسبوك",
                  },
                  {
                    icon: Twitter,
                    label: locale == "en" ? "Twitter" : "تويتر",
                  },
                ].map((social, index) => (
                  <Button
                    key={index}
                    size="icon"
                    className="rounded-lg text-white hvr-pop"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy;{" "}
              {locale == "en"
                ? "2024 PRIME. All rights reserved."
                : "2024 PRIME. جميع الحقوق محفوظة."}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default CartPage;
