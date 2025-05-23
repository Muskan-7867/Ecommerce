import { AddressFormData } from "./auth";


export type ProductImage = {
  url: string;
  publicId: string;
  _id: string | number;
};

export interface Product {
  _id: string ;
  name: string;
  description: string;
  price: number;
  features?: string;
  rating?: number;
  originalPrice?: number;
  reviews: number;
  inStock: boolean;
  images: ProductImage[];
  category: string;
  [key: string]: unknown;
  quantity: number;
  totalProduct: number;
  deliveryCharges: number;
}

export  interface Category {
  _id: string;
  name: string;
  description: string;
  products: Product[];
}

// types/product.ts
export interface ProductFormData {
  name: string;
  description: string;
  features: string;
  price: number | string;
  rating: number | string;
  inStock: string | number | readonly string[] | undefined;
category: string;
  images?: FileList;
}

export interface CategoryFormData {
  name: string;
  description: string;
  image? : FileList;
  products: string[];
}

export interface EditProductData {
  name: string;
  description: string;
  features: string;
  price: number | string;
  inStock: boolean;
  category: string;
  deliveryCharges: number;

}

export interface OrderItem {
  product: string | Product; 
  price: number;
  quantity: number;
}

export interface OrderData {
  quantity: number;
  totalQuantity: number;
  totalPrice: number;
  address: AddressFormData | undefined;
  orderItems: OrderItem[];
  deliveryCharges: number;
}



