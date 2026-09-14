export interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  images?: string[]; // Multiple photos of the same product
  colorImages?: Record<string, string>; // Main photo matching selected color
  imagesByColor?: Record<string, string[]>; // Multi-angle photos array for each color
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
    image: "/Products/t-shirts/navyblue/14d86e91-ea30-441d-a42f-66818231c58c.JPG",
    description: "Premium combed cotton SVNIT Alumni t-shirt. Breathable, durable, and stylishly tailored. Features the elegant Alumni emblem printed in gold on deep navy blue, classic black, or crisp white fabric.",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#0F1E36", "#000000", "#FFFFFF"],
    images: [
      "/Products/t-shirts/navyblue/14d86e91-ea30-441d-a42f-66818231c58c.JPG",
      "/Products/t-shirts/navyblue/2c73ca62-0f5f-434d-ba19-fe19f6dc304f.JPG",
      "/Products/t-shirts/navyblue/5af0bfc9-192c-4977-870f-409b6d4eef68.JPG"
    ],
    colorImages: {
      "#0F1E36": "/Products/t-shirts/navyblue/14d86e91-ea30-441d-a42f-66818231c58c.JPG",
      "#000000": "/Products/t-shirts/black/4446d5bf-adb5-41c3-ba43-a4efad49a9e6.JPG",
      "#FFFFFF": "/Products/t-shirts/white/44571b86-dbc3-4137-85dd-77b0b7b10f62.JPG"
    },
    imagesByColor: {
      "#0F1E36": [
        "/Products/t-shirts/navyblue/14d86e91-ea30-441d-a42f-66818231c58c.JPG",
        "/Products/t-shirts/navyblue/2c73ca62-0f5f-434d-ba19-fe19f6dc304f.JPG",
        "/Products/t-shirts/navyblue/5af0bfc9-192c-4977-870f-409b6d4eef68.JPG"
      ],
      "#000000": [
        "/Products/t-shirts/black/4446d5bf-adb5-41c3-ba43-a4efad49a9e6.JPG",
        "/Products/t-shirts/black/5de1e579-ef48-4fc0-890e-93f99e4ef37a.JPG",
        "/Products/t-shirts/black/9e659c61-c6d4-4648-8652-e2f9bda019b7.JPG"
      ],
      "#FFFFFF": [
        "/Products/t-shirts/white/44571b86-dbc3-4137-85dd-77b0b7b10f62.JPG",
        "/Products/t-shirts/white/a23fbe5b-e1d0-46ab-bd98-1285fbabb75f.JPG",
        "/Products/t-shirts/white/f56e8c50-8ddd-49ae-b1a9-9bbc30fcd128.JPG"
      ]
    },
    features: ["100% Combed Cotton", "Gold legacy printing", "Preshrunk fabric", "Multi-angle tailored fit"],
  },
  {
    id: 3,
    name: "SVNIT Gold Emblem Keychain",
    brand: "SVNIT Alumni Association",
    price: "199",
    originalPrice: "299",
    discount: "33% Off",
    image: "/images/keychain.png",
    images: ["/images/keychain.png"],
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
    images: ["/images/bottleAA.png", "/images/stanley.png"],
    colorImages: {
      "#0F1E36": "/images/bottleAA.png",
      "#FFFFFF": "/images/stanley.png"
    },
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
    images: ["/images/stanley.png", "/images/bottleAA.png"],
    colorImages: {
      "#0F1E36": "/images/stanley.png",
      "#C0C0C0": "/images/bottleAA.png"
    },
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
    images: ["/images/Tshirt2.png", "/images/Tshirt.png"],
    colorImages: {
      "#FFFFFF": "/images/Tshirt2.png",
      "#0F1E36": "/images/Tshirt.png"
    },
    description: "Pique knit legacy polo shirt. Embroidered golden coat-of-arms crest on the left chest. Perfect choice for casual reunions or business-casual settings.",
    category: "Apparel",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#0F1E36"],
    features: ["Pique knit cotton blend", "Embroidered high-density crest", "Ribbed collar and cuffs", "Premium button placket"],
  }
];

