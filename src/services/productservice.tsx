// src/services/productService.ts

export interface Product {
  idp: number;
  name: string;
  price: number;
  description: string;
  sales: number;
  nbstock: number;
  image_base64: string | null;
  type: number;
}

export interface ProductType {
  id: number;
  name: string;
}

const API_URL_PRODUCTS = "http://localhost:8000/api/products/";
const API_URL_TYPE = "http://localhost:8000/api/types/";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL_PRODUCTS);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getAllTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(API_URL_TYPE);
    if (!response.ok) {
      throw new Error("Error fetching product types");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product types:", error);
    return [];
  }
};
