import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Menu as Bars, ShoppingCart, X, User } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import UserService from "@/services/userservice";
import logo from "../../assets/logo.jpg";
import { getAllTypes, ProductType } from "@/services/productservice";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/default.jpg";
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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar({
  setSelectedpage,
  Typesbar,
  setSelectedType,
  shoppingItems,
  setShoppingItems,
  setSearchTerm, // Receive setSearchTerm as prop
}: {
  setSelectedpage: React.Dispatch<React.SetStateAction<string>>;
  Typesbar:boolean;
  setSelectedType: (typeId: number) => void;
  shoppingItems: Shoppingitem[];
  setShoppingItems: React.Dispatch<React.SetStateAction<Shoppingitem[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Define type for setter
}) {
    const navigate = useNavigate();
  const [types, setTypes] = useState<ProductType[]>([{ name: "All", id: 0 }]);
  const [selectedType, setSelectedTypeState] = useState(0);
  const [userPdp, setUserPdp] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchTypes = async () => {
      const fetchedTypes = await getAllTypes();
      setTypes([{ name: "All", id: 0 }, ...fetchedTypes]);
    };

    const storedUser = localStorage.getItem("user");

// Check if storedUser exists and is valid
if (storedUser) {
  const user = JSON.parse(storedUser); // Parse the JSON string to get the user object
  setUserPdp(user.photo); // Set the user profile picture base64
}
    fetchTypes();
  }, []);

  const onchange = (typeId: number) => {
    setSelectedTypeState(typeId);
    setSelectedType(typeId);
  };
  const handleRemoveItem = (index:number) => {
    setShoppingItems((prevItems) => {
      // Create a shallow copy and remove item at the specified index
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // Remove the item
      return updatedItems;});
  };
  const handleLogout = async () => {
    try {
      await UserService.logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Disclosure as="nav" className="bg-[#d5c5ac] fixed top-0 inset-x-0 z-50 ">
      {/* Main Navigation Bar */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-1">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group bg-[#d5c5ac] inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars className="block h-6 w-6 group-data-[open]:hidden" aria-hidden="true" />
              <X className="hidden h-6 w-6 group-data-[open]:block" aria-hidden="true" />
            </DisclosureButton>
          </div>
  
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-10 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                
                
                  <button onClick={()=>setSelectedpage("home")} className="bg-[#9f7126]     text-white hover:bg-[#d0a45d] hover:scale-110 duration-300 rounded-md px-3 py-2 text-sm font-medium">
                    Home
                  </button>
                  <button disabled onClick={()=>setSelectedpage("customize")} className="bg-[#9f7126]   text-white hover:bg-[#d0a45d] hover:scale-110 duration-300 rounded-md px-3 py-2 text-sm font-medium">
                    Customize
                  </button>
                  <button onClick={()=>setSelectedpage("about")} className="bg-[#9f7126] whitespace-nowrap     text-white hover:bg-[#d0a45d] hover:scale-110 duration-300 rounded-md px-3 py-2 text-sm font-medium">
                    About US
                  </button>
              </div>
            </div>
            <Input
              type="text"
              placeholder="Search..."
              className="ms-2 text-sm rounded-md border border-gray-700 bg-[#e6dfd2] text-white focus:ring-2 focus:ring-indigo-600 focus:outline-none w-32 lg:w-full"
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            />
          </div>
  
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Sheet>
              <SheetTrigger className="relative rounded-full bg-[#d5c5ac] p-1 text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent className="flex flex-col justify-between">
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  {shoppingItems && shoppingItems.length > 0 ? (
                    shoppingItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border-b">
                        <img
                          src={item.products.imageBase64 || defaultImage}
                          alt={item.products.productName}
                          className="h-12 w-12 object-cover rounded"
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-sm font-semibold">{item.products.productName}</p>
                          <p className="text-sm">Qty: {item.qnt}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>Your cart is empty.</p>
                  )}
                </div>
                <div className="p-4">
                  <button
                    type="button"
                    className="w-full rounded-md bg-[#4E6629] px-4 py-2 text-white hover:bg-[#3d5324] focus:outline-none focus:ring-2 focus:ring-[#4E6629] focus:ring-offset-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </SheetContent>
            </Sheet>
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full bg-[#d5c5ac] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Avatar>
                  <AvatarImage src={userPdp || ""} alt={"User"} />
                  <AvatarFallback className="bg-[#d5c5ac]">
                    <User className="h-6 w-6 text-gray-600" />
                  </AvatarFallback>
                </Avatar>
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          
            <DisclosureButton
              as="button"
              className="bg-[#9f7126] text-white w-fullbg-[#d5c5ac] w-full hover:bg-[#d0a45d]
            block rounded-md px-3 py-2 text-base font-medium">
              Home
            </DisclosureButton>
            
            <DisclosureButton
              as="button"
              className="bg-[#9f7126] text-white w-fullbg-[#d5c5ac] w-full hover:bg-[#d0a45d]
            block rounded-md px-3 py-2 text-base font-medium">
              Customize
            </DisclosureButton>

            <DisclosureButton
              as="button"
              className="bg-[#9f7126] text-white w-fullbg-[#d5c5ac] w-full hover:bg-[#d0a45d]
            block rounded-md px-3 py-2 text-base font-medium">
              About US
            </DisclosureButton>

        </div>
      </DisclosurePanel>
      {/* Types Section */}
      {Typesbar &&(<div className="bg-[#e6dfd2] py-2 px-5 shadow-md">
  <div className="flex sm:justify-center sm:items-center space-x-4 overflow-x-auto overflow-y-hidden">
    {types.map((item) => (
      <button
        key={item.id}
        onClick={() => onchange(item.id)}
        className={classNames(
          item.id === selectedType
            ? "bg-green-600 text-white hover:scale-110 duration-300"
            : "bg-[#d5c5ac] text-gray-800 hover:bg-green-400 hover:scale-110 duration-300",
          "rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap"
        )}
      >
        {item.name}
      </button>
    ))}
    
  </div>
</div>)}
  


    </Disclosure>
  );
}
