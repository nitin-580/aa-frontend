interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  discout: string;
  image: string;
  description?: string;
}

interface Props {
  product: Product;
}

const ProductDetailCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="max-w-6xl mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-xl" />
      <div>
        <h1 className="text-4xl font-bold font-quicksand">{product.name}</h1>
        <p className="text-red-600 text-3xl font-semibold">{product.price}</p>
        <p className="text-gray-400 line-through">{product.originalPrice}</p>
        <p className="text-green-600">{product.discout}</p>
        <p className="mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailCard;
