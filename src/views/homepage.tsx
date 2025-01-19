import { useState, useEffect } from "react";
import { Productskeleton } from "@/components/homepage/products";
import { Navbar } from "@/components/homepage/navbar";
import { ProductCard } from "@/components/homepage/productcard";
import { getAllProducts, Product } from "@/services/productservice"; // Import the service
import Aboutus from './Aboutus';
interface ProductCardProps {
  productName: string;
  originalPrice: number;
  stock: number;
  imageBase64: string | null; // Use Base64 string for the image
  discount: number;
  type: number;
}

interface Shoppingitem {
  products: ProductCardProps;
  qnt: number;
}

export default function Home() {
  const [main,setMain]=useState<string>("home")
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<number>(0); // Default to 'All'
  const [shoppingItems, setShoppingItems] = useState<Shoppingitem[]>([]); // Shopping list

  useEffect(() => {
    console.log("Current main value:", main);
  }, [main]);
  // Fetch products using the product service
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productList = await getAllProducts();
      setProducts(productList);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = selectedType === 0
  ? products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on search term
    )
  : products.filter(product =>
      product.type === selectedType && product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on both type and search term
    );
 // Filter based on typeId

  // Function to handle adding product to cart
  const addToCart = (product: ProductCardProps, quantity: number) => {
    
    setShoppingItems(prevItems => {
      const updatedItems = [...prevItems];
      const existingItem = updatedItems.find(item => item.products.productName === product.productName);
      
      if (existingItem) {
        existingItem.qnt += quantity; // Update quantity if item already in cart
      } else {
        updatedItems.push({ products: product, qnt: quantity }); // Add new item to cart
      }

      return updatedItems;
    });
  };
if(main=="home"){
  if (loading) {
    return (
      <div>
<Navbar
setSelectedpage={setMain}
 Typesbar={false}
  setSelectedType={setSelectedType}
  shoppingItems={shoppingItems}
  setShoppingItems={setShoppingItems}
  setSearchTerm={setSearchTerm} // Pass the search term setter
/>
        {/* Skeleton loader while data is being fetched */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-2 mt-32 ms-7 lg:ms-24">
          {Array.from({ length: 20 }).map((_, index) => (
            <Productskeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
<Navbar
  setSelectedpage={setMain}
  Typesbar={true}
  setSelectedType={setSelectedType}
  shoppingItems={shoppingItems}
  setShoppingItems={setShoppingItems}
  setSearchTerm={setSearchTerm} // Pass the search term setter
/>
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-2 mt-32 ms-7 lg:ms-24">
        {filteredProducts.map((product) => (
          <div key={product.idp}>
            <ProductCard
              productName={product.name}
              originalPrice={product.price} // Adjusted from 'originalPrice' to 'price'
              stock={product.nbstock} // Adjusted from 'stock' to 'nbstock'
              imageBase64={product.image_base64} // Adjusted from 'imageUrl' to 'photo'
              discount={product.sales} // If you're displaying discount, you can use 'sales' for that
              type={product.type}
              addToCart={addToCart} // Pass the addToCart function to ProductCard
            />
          </div>
        ))}
      </div>
    </div>
  );
}
else if((main=="about")){
  return(
  <div>
    <Navbar
    setSelectedpage={setMain}
      Typesbar={false}
      setSelectedType={setSelectedType}
      shoppingItems={shoppingItems}
      setShoppingItems={setShoppingItems}
      setSearchTerm={setSearchTerm} // Pass the search term setter
    />
          <div className="mt-14">
          <Aboutus></Aboutus>
          </div>
        </div>)
}
}
