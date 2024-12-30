// import "./globals.css";
import Image from "next/image";
import Logo from "../../../../assets/homeImages/logo.png";
import Cart from "../../../../assets/homeImages/cart.png";
import Profile from "../../../../assets/homeImages/profile.png";

interface CartLayoutProps {
  params: {
    locale: string;
  };
  children: React.ReactNode; // Add the children property here
}

const CartLayout: React.FC<CartLayoutProps> = ({ children, params }) => {
  const { locale } = params;
  return (
    <html lang="en">
      <body>
        <nav className="fixed w-full z-50 bg-primary/90">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <a href={`${locale == "en" ? "/en" : "/ar"}`} className="font-bold text-xl">
                <Image src={Logo} alt="Logo" width={85} height={85} />
              </a>
              <div className="flex gap-3">
              <a
                href={`${locale == "en" ? "/en/cartPage" : "/ar/cartPage"}`}
                title={locale === "en" ? "Cart" : "سلة"}
                className="hvr-pop"
              >
                <Image src={Cart} alt="cart" width={36} height={36} />
              </a>
              <a
                 href={`${locale == "en" ? "/en/primeProfile" : "/ar/primeProfile"}`}
                title={locale === "en" ? "Profile" : "الملف الشخصي"}
                className="hvr-pop"
              >
                <Image src={Profile} alt="profile" width={36} height={36} />
              </a>
            </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
};

export default CartLayout;
