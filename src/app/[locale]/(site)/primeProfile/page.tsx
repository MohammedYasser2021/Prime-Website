import ClientPrimeProfile from './ClientPrimeProfile';
import { unstable_setRequestLocale } from 'next-intl/server';

// Define dynamic params (we assume you're handling localization this way)
export const dynamicParams = false;

// Define the static params for the locales
export async function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "ar" },
  ];
}

// Define the metadata for the page, this will run on the server side
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;

  // Set the locale dynamically for metadata generation
  unstable_setRequestLocale(locale);

  return {
    title: locale === "en" ? "Prime Profile" : "الملف الشخصي",
    description: locale === "en"
      ? "Manage your Prime Profile and preferences here."
      : "إدارة ملفك الشخصي في برايم وتفضيلاتك هنا.",
  };
}

// Profile page component
interface ProfilePageProps {
  params: {
    locale: string;
  };
}

// Profile page that uses the `ClientPrimeProfile` component
const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  return <ClientPrimeProfile params={params} />;
};

export default ProfilePage;
