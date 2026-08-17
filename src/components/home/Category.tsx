import React from "react";

const categories = [
  {
    id: 1,
    name: "Lamps",
    image: "https://picsum.photos/400/400?random=1",
  },
  {
    id: 2,
    name: "Chairs",
    image: "https://picsum.photos/400/400?random=2",
  },
  {
    id: 3,
    name: "Clocks",
    image: "https://picsum.photos/400/400?random=3",
  },
  {
    id: 4,
    name: "Vases",
    image: "https://picsum.photos/400/400?random=4",
  },
  {
    id: 5,
    name: "Mirrors",
    image: "https://picsum.photos/400/400?random=5",
  },
  {
    id: 6,
    name: "Sofas",
    image: "https://picsum.photos/400/400?random=6",
  },
];

const CategoryGrid = () => {
  return (
    <div className="bg-white py-12">
      <h2 className="text-4xl text-black text-center mb-4">
        Shop by Category
      </h2>
      <p className="text-m text-gray-500 text-center mb-8">
        Explore categories for every style and space
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative group overflow-hidden shadow-md hover:shadow-xl transition"
          >
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
