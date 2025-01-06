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
  brand: string;
  brandAr: string;
  stock: number;
  rating: number;
  reviews: number;
  sales: number;
  dimensions: string;
  weight: string;
  tags: string[];
  tagsAr: string[];
  ingredients: string[];
  ingredientsAr: string[];
  usageInstructions: string;
  usageInstructionsAr: string;
}
