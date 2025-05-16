import axios from "axios";
import { EditProductData, Product } from "../types/Product";
import Cookies from "js-cookie";
import { AddressFormData, CurrentUser } from "../types/auth";
const token = Cookies.get("authToken");
const BASE_URL = import.meta.env.VITE_BASE_URL;

//for user
const fetchUserCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/usercategories`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const fetchAdminCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/admincategories`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
 
    return response.data.categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const getProductsByCategory = async (name: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/category/name/${name}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );

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
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/get/${limit}/${page}/${minPrice}/${maxPrice}/${category}/${
        search || "-"
      }`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    return {
      ProductCount: response.data.totalProduct,
      products: response.data.product
    };
  } catch (error) {
    console.error("failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

//for admin
const getAllProducts = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v2/product/all`);
    return response.data.products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    throw error;
  }
};

const deleteProduct = async (id: string | unknown) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v2/product/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("failed to delete product:", error);
    throw new Error("Failed to delete product");
  }
};

const deleteOrder = async (orderid: string | unknown) => {
  console.log("from deleteorder", orderid);
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v2/product/order/delete/${orderid}`
    );
    console.log();
    return response.data;
  } catch (error) {
    console.error("failed to delete order:", error);
    throw new Error("Failed to delete order");
  }
};

const updateProduct = async (id: string, data: EditProductData) => {
  const response = await axios.put(
    `${BASE_URL}/api/v2/product/update/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  return response.data;
};

const createProduct = async (formData: FormData) => {
  const response = await axios.post(
    `${BASE_URL}/api/v2/product/create`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return response.data;
};

const createCategory = async (data: FormData, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/api/v2/product/category`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

const CreateUserAddress = async (data: AddressFormData, token: string) => {
  const response = await axios.put(`${BASE_URL}/api/v1/user/address`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

const fetchCategory = async (categoryId: string) => {
  const response = await axios.get(
    `${BASE_URL}/api/v2/product/category/${categoryId}`
  );
  return response.data;
};

const fetchUserAddress = async (addressId: string | undefined) => {
  if (!addressId) {
    throw new Error("Address ID is required");
  }

  const token = Cookies.get("authToken");
  if (!token) {
    throw new Error("No token provided");
  }

  const response = await axios.get(
    `${BASE_URL}/api/v1/user/useraddress/${addressId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

const getOrders = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/orderproducts`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.data.order) return [];

    return response.data.order;
  } catch {
    return [];
  }
};
const fetchProductById = async (id: string | undefined) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/single/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.product;
  } catch {
    console.log("error in fetching product by id");
  }
};

const getSingleProductById = async (singleproductid: string | undefined) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v2/product/single/${singleproductid}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("from getsingle", response.data.product);
    return response.data.product;
  } catch {
    console.log("error in fetching product by id");
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/allusers`);
    console.log("from fetch users", response.data.users);
    return response.data.users;
  } catch {
    console.log("error in fetching users");
  }
};

export {
  fetchUserCategories,
  getProductsByCategory,
  fetchProductIds,
  fetchCurrentUser,
  getFilteredProducts,
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  createCategory,
  CreateUserAddress,
  fetchAdminCategories,
  fetchCategory,
  fetchUserAddress,
  getOrders,
  fetchProductById,
  getSingleProductById,
  deleteOrder,
  getUsers
};
