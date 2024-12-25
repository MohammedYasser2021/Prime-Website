import React from "react";
import Image from "next/image";
import Apple from "../../../../assets/homeImages/apple.png";
import Gplay from "../../../../assets/homeImages/g-play.png";
import FooterImg from "../../../../assets/homeImages/footerImg.png";
import Facebook from "../../../../assets/homeImages/facebook.png";
import Insta from "../../../../assets/homeImages/insta.png";
import Whatsapp from "../../../../assets/homeImages/whatsapp.png";

interface FooterProps {
  params: {
    locale: string;
  };
}

const Footer: React.FC<FooterProps> = ({ params }) => {
  const { locale } = params;
  return (
    <div className={`bg-title min-h-[416px] relative xl:top-[30px] text-center ${locale == "en" ? "md:text-left" : "md:text-right"} text-center overflow-x-clip`}>
      <div className="container  px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
        <div
          className={`absolute flex ${
            locale == "en" ? "justify-end" : "justify-start"
          }`}
        >
          <Image
            src={FooterImg}
            alt="Footer"
            className="md:w-3/4 w-1/2 h-[414px] rounded-[20px] opacity-[10%] mt-[-30px]"
          />
        </div>
        <div className="grid xl:grid-cols-4  md:grid-cols-2 grid-cols-1 gap-10 mt-5 ">
          <div>
            <h1 className="text-[18px] font-bold text-[#ffffff] mb-3">
              {locale == "en" ? "Get to know Prime" : "تعرف على برايم"}
            </h1>
            <p className="text-[13px] font-bold text-[#ffffff] mb-1">
              {locale == "en"
                ? "Prime Store is a specialized shop for health products. We carefully select our products to ensure they are the best for our customers"
                : "يعتبر متجر برايم متجر متخصص بالمستحضرات الصحية ونقوم باختيار منتجاتنا بعناية لكي تكون الافضل للمستخدم"}
            </p>
            <p className="text-[13px] font-bold text-[#ffffff] mb-10">
              {locale == "en"
                ? "We are not only looking for good prices, but we also prioritize quality, care about our customers' health, and ensure they receive the best health products"
                : "نحن لا نبحث عن السعر الجيد فقط ولكننا نبحث عن الجودة و نهتم بصحة عميلنا وحصوله على افضل المنتجات الصحية "}
            </p>
            <div className="flex items-center md:justify-start justify-center gap-3 flex-wrap">
              <Image
                src={Apple}
                alt="Apple"
                className="w-[140px] h-[37px] rounded-[5px]"
              />
              <Image
                src={Gplay}
                alt="Google play"
                className="w-[140px] h-[37px] rounded-[5px]"
              />
            </div>
          </div>
          <div>
            <h1 className="text-[18px] text-[#ffffff] font-bold mb-3">
              {locale == "en" ? "Useful Links" : "روابط مفيدة"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-1">
              {locale == "en"
                ? "How to place a purchase order"
                : "كيفية عمل طلب شراء"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-1">
              {locale == "en" ? "Payment Methods" : "طرق الدفع"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-1">
              {locale == "en" ? "Shipping Policy" : "سياسة الشحن"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-1">
              {locale == "en" ? "Return Policy" : "سياسة الاسترجاع"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-5">
              {locale == "en" ? "Refund Policy" : "سياسة الاسترداد"}
            </h1>
            <h1 className="text-[18px] text-[#ffffff] font-bold mb-3">
              {locale == "en" ? "For Helping" : "للمساعدة"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold mb-1">
              {locale == "en" ? "Helping Center" : "مركز المساعدة"}
            </h1>
            <h1 className="text-[13px] text-[#ffffff] font-bold ">
              {locale == "en" ? "Contact Us" : "اتصل بنا"}
            </h1>
          </div>
          <div className="flex  flex-col self-end">
            <h1 className="text-[18px] font-bold text-[#ffffff] mb-3">
              {locale == "en" ? "For Following" : "للمتابعة"}
            </h1>
            <div className="flex item-center md:justify-start justify-center gap-3">
              <a href="" className="w-[30px] h-[30px] hvr-pop">
                <Image src={Insta} alt="instgram" />
              </a>
              <a href="" className="w-[30px] h-[30px] hvr-pop">
                <Image src={Facebook} alt="facebook" />
              </a>
              <a href="" className="w-[30px] h-[30px] hvr-pop">
                <Image src={Whatsapp} alt="Whatsapp" />
              </a>
            </div>
          </div>
          <div className="relative z-30">
            <h1 className="text-[18px] font-bold text-[#ffffff] mb-4">
              {locale == "en"
                ? "To increase your sales through Prime... Register now"
                : "لتزيد مبيعاتك عبر برايم... سجل الأن"}
            </h1>
            <form>
              <input
                type="text"
                className="w-[277px] h-[44px] bg-transparent mb-3 md:mx-0 mx-auto text-[#ffffff] font-bold text-[13px] p-4 block rounded-[15px] border border-[#ffffff] outline-0"
                placeholder={locale == "en" ? "Full Name" : "الاسم بالكامل"}
                value={locale == "en" ? "Full Name" : "الاسم بالكامل"}
              />
              <input
                type="text"
                className="w-[277px] h-[44px] bg-transparent text-[#ffffff] mb-3 md:mx-0 mx-auto font-bold text-[13px] p-4 block rounded-[15px] border border-[#ffffff] outline-0"
                placeholder={locale == "en" ? "Phone Number" : "رقم الهاتف"}
                value={locale == "en" ? "Phone Number" : "رقم الهاتف"}
              />
              <button
                type="submit"
                className="min-w-[150px] h-[40px] hvr-pulse bg-[#7a4daa]  rounded-[15px] border border-[#ffffff] text-[#ffffff]"
              >
                {locale == "en" ? "Send Request Now" : "ارسل طلبك الان"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
