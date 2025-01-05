import { Button } from "@/components/ui/button";
import { useState } from "react";
import defaultImage from "../../assets/default.jpg";

interface ProductCardProps {
  productName: string;
  originalPrice: number;
  stock: number;
  imageBase64: string | null; // Use Base64 string for the image
  discount: number;
  type: number;
  addToCart: (product: { productName: string; originalPrice: number; stock: number; imageBase64: string | null; discount: number; type: number; }, quantity: number) => void; // Add addToCart function prop
}

export function ProductCard({
  productName,
  originalPrice,
  stock,
  imageBase64,
  discount,
  addToCart
}: ProductCardProps) {
  // Compute discounted price if not provided
  const finalPrice =
    originalPrice - (originalPrice * discount) / 100;

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({ productName, originalPrice, stock, imageBase64, discount, type: 0 }, quantity); // Assuming type can be 0 or other, modify as needed
  };

  return (
    <div className="lg:w-[250px] w-[150px] rounded-lg border border-gray-200 bg-white shadow-md p-4">
      <div className="relative">
        {discount > 0 &&(
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        <img
          src={imageBase64 || defaultImage} // Use Base64 image or fallback
          alt={productName}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium">{productName}</h3>
        {discount > 0 ? (
          <div>
            <span className="text-gray-500 line-through">${originalPrice}</span>{" "}
            <span className="text-green-600 font-bold">${finalPrice}</span>
          </div>
        ) : (
          <span className="text-black">${originalPrice}</span>
        )}

        {stock > 10 ? (
          <p className="mt-1 text-sm text-gray-600">Stock: {stock} KG</p>
        ) : (
          <p className="mt-1 text-sm text-red-500">Stock: {stock} KG</p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4">
        <Button
          variant="outline"
          className="w-10"
          onClick={decrementQuantity}
          disabled={quantity === 0}
        >
          -
        </Button>
        <span className="text-lg font-medium">{quantity}</span>
        <Button
          variant="outline"
          className="w-10"
          onClick={incrementQuantity}
          disabled={quantity === stock}
        >
          +
        </Button>
      </div>
      <Button
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
        onClick={handleAddToCart}
        disabled={quantity === 0}
      >
        Add to Cart
      </Button>
    </div>
  );
}
