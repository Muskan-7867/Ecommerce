import { queryOptions } from "@tanstack/react-query";
import {
  deleteProduct,
  fetchAdminCategories,
  fetchProductById,
  fetchProductIds,
  fetchUserAddress,
  fetchUserCategories,
  getAdminInfo,
  getAllProducts,
  getClientByOrderId,
  getFilteredProducts,
  getOrders,
  getProductsByCategory,
  getSingleProductById,
  getUsers
} from "./fetchers";

const getCategoriesQuery = () => {
  return queryOptions({
    queryKey: ["categories"],
    queryFn: fetchUserCategories
  });
};

const getAdminCategoriesQuery = () => {
  return queryOptions({
    queryKey: ["admincategories"],
    queryFn: fetchAdminCategories
  });
};

const getProductsQuery = (categoryParam: string) => {
  return queryOptions({
    queryKey: ["products", categoryParam],
    queryFn: () => getProductsByCategory(categoryParam)
  });
};

const getCartProductIdQuery = (productIds: string[]) => {
  return queryOptions({
    queryKey: ["cartproducts", productIds],
    queryFn: () => fetchProductIds(productIds),
    enabled: productIds.length > 0
  });
};

const getAllProductsQuery = () => {
  return queryOptions({
    queryKey: ["allproducts"],
    queryFn: getAllProducts
  });
};

const getFilteredProdQuery = (
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number,
  category: string,
  search: string | null
) => {
  return queryOptions({
    queryKey: [
      "filteredproducts",
      page,
      limit,
      minPrice,
      maxPrice,
      category,
      search
    ],
    queryFn: () =>
      getFilteredProducts(page, limit, minPrice, maxPrice, category, search)
  });
};

const deleteProductQuery = (id: string | unknown) => {
  return queryOptions({
    queryKey: ["deleteproduct", id],
    queryFn: () => deleteProduct(id),
    enabled: id !== undefined
  });
};

const fetchUserAddressQuery = (addressId: string | undefined) => {
  return {
    queryKey: ["useraddress", addressId],
    queryFn: () => fetchUserAddress(addressId),
    enabled: !!addressId
  };
};

const fetchOrdersQuery = () => {
  return {
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled: true
  };
};

const getProductByIdQuery = (id: string | undefined) => {
  return {
    queryKey: ["singleproduct", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id
  };
}

 const getSingleProductQuery = (singleproductid: string | undefined) =>{
  return queryOptions({
    queryKey: ["singleproduct", singleproductid],
    queryFn: () => getSingleProductById(singleproductid),
    enabled: !!singleproductid
  })
}

const fetchUsersQuery = () => {
  return queryOptions({
    queryKey: ["users"],
    queryFn: getUsers,
    enabled: true
  });
}

 const getAdminQuery = (enabled = true) => ({
  queryKey: ["admin"],
  queryFn: getAdminInfo,
  enabled,
});

const getClientQuery = (orderId: string) => ({
  queryKey: ["client", orderId],
  queryFn:() => getClientByOrderId(orderId),
  enabled: !!orderId
})


export {
  getCategoriesQuery,
  getProductsQuery,
  getCartProductIdQuery,
  getAllProductsQuery,
  deleteProductQuery,
  getFilteredProdQuery,
  getAdminCategoriesQuery,
  fetchUserAddressQuery,
  fetchOrdersQuery,
  getProductByIdQuery,
  getSingleProductQuery,
  fetchUsersQuery,
  getAdminQuery,
  getClientQuery
};
