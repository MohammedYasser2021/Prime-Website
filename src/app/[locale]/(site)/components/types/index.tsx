export default interface Prod {
  id: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  discount: number;
  category: "creams" | "cosmetics" | "skincare" | "perfume";
  categoryAr: "كريمات" | "مستحضرات تجميل" | "عناية البشرة" | "عطور"
  images: string[];
}
