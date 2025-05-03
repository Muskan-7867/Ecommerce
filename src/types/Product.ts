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
  totalProduct: number;
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
  inStock: string;
  category: string;
  images?: FileList;
}

export interface CategoryFormData {
  name: string;
  description: string;
  image? : FileList;
  products: string[];
}