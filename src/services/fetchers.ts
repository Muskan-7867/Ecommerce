import axios from "axios";
import { Product } from "../types/Product";
import Cookies from "js-cookie";
import { CurrentUser } from "../types/auth";
const token = Cookies.get("authToken");
const BASE_URL = import.meta.env.VITE_BASE_URL;

//for user
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v2/product/categories`, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("from fetcher" ,response.data)
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const getProductsByCategory = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v2/product/category/${name}`, {
      headers: { "Content-Type": "application/json" }
    });
    
    return response.data.products;
  } catch (error) {
    console.error("failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

const fetchProductIds = async (productIds: string[]): Promise<Product[]> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v2/product/cartproducts`,
      { ids: productIds }
    );
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch cart product ids:", error);
    throw error;
  }
};

const fetchCurrentUser = async (): Promise<CurrentUser | unknown> => {
  if (!token) {
    console.warn("No token found");
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (err) {
    // setError("Failed to fetch user");
    console.error("Failed to fetch user");
    return err;
  }
};

const getFilteredProducts = async (
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number,
  category: string,
  search: string | null
) => {
  try {
    console.log("from fetcher" , category)
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/get/${limit}/${page}/${minPrice}/${maxPrice}/${category}/${search || "-"}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    console.log("filtered products", response.data);
    return {
      ProductCount: response.data.totalProduct,
      products: response.data.product
    };
  } catch (error) {
    console.error("failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};




export {
  fetchCategories,
  getProductsByCategory,
  fetchProductIds,
  fetchCurrentUser,
  getFilteredProducts,


};
