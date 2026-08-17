export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  description: string;
  category: string; // Apparel, Accessories, Gifts
  sizes?: string[];
  colors?: string[];
  features?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "SVNIT Premium Leather Diary",
    brand: "SVNIT Alumni Association",
    price: "499",
    originalPrice: "799",
    discount: "37% Off",
    image: "/images/diary.png",
    description: "Official SVNIT Alumni Association executive notebook. Gold-embossed logo on premium faux leather cover. Features 200 ruled pages, bookmark ribbon, and elegant magnetic closure.",
    category: "Gifts",
    sizes: ["A5"],
    colors: ["#0F1E36", "#8B4513"],
    features: ["Gold Embossed Logo", "Executive Faux Leather", "200 Pages (80 GSM)", "Premium Magnetic Clasp"],
  },
  {
    id: 2,
    name: "Official SVNIT Legacy T-Shirt",
    brand: "SVNIT Alumni Association",
    price: "599",
    originalPrice: "899",
    discount: "33% Off",
    image: "/images/Tshirt.png",
    description: "Premium combed cotton SVNIT Alumni t-shirt. Breathable, durable, and stylishly tailored. Features the elegant Alumni emblem printed in gold on deep navy blue fabric.",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#0F1E36", "#FFFFFF"],
    features: ["100% Combed Cotton", "Gold legacy printing", "Preshrunk fabric", "Comfort fit"],
  },
  {
    id: 3,
    name: "SVNIT Gold Emblem Keychain",
    brand: "SVNIT Alumni Association",
    price: "199",
    originalPrice: "299",
    discount: "33% Off",
    image: "/images/keychain.png",
    description: "Polished brass alloy keychain carrying the detailed emblem of SVNIT. Durable ring with leather-woven strap accent. Perfect memory keeper for home and office keys.",
    category: "Accessories",
    features: ["Solid Brass Alloy", "Handcrafted leather weaving", "Scratch-resistant shine", "Official emblem engraving"],
  },
  {
    id: 4,
    name: "Alumni Insulated Stainless Steel Bottle",
    brand: "SVNIT Alumni Association",
    price: "799",
    originalPrice: "1199",
    discount: "33% Off",
    image: "/images/bottleAA.png",
    description: "Double-walled vacuum insulated water bottle keeping beverages cold for 24 hours and hot for 12 hours. Laser-etched SVNIT emblem on high-grade steel matte navy body.",
    category: "Accessories",
    sizes: ["750ml", "1000ml"],
    colors: ["#0F1E36", "#FFFFFF"],
    features: ["304 Food Grade Stainless Steel", "Vacuum Insulation", "Leak-proof metal cap", "Laser-etched official emblem"],
  },
  {
    id: 5,
    name: "SVNIT Heritage Travel Mug",
    brand: "SVNIT Alumni Association",
    price: "999",
    originalPrice: "1499",
    discount: "33% Off",
    image: "/images/stanley.png",
    description: "Premium double-walled travel mug with splash-resistant lid. Keep your coffee warm on long commutes while carrying the SVNIT spirit with you.",
    category: "Gifts",
    sizes: ["350ml"],
    colors: ["#0F1E36", "#C0C0C0"],
    features: ["Double wall thermal barrier", "Ergonomic comfort handle", "Spill resistant lock", "Powder coated scratch-guard outer"],
  },
  {
    id: 6,
    name: "SVNIT Classic Crest Polo",
    brand: "SVNIT Alumni Association",
    price: "699",
    originalPrice: "999",
    discount: "30% Off",
    image: "/images/Tshirt2.png",
    description: "Pique knit legacy polo shirt. Embroidered golden coat-of-arms crest on the left chest. Perfect choice for casual reunions or business-casual settings.",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#0F1E36"],
    features: ["Pique knit cotton blend", "Embroidered high-density crest", "Ribbed collar and cuffs", "Premium button placket"],
  }
];

