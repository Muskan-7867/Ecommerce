import { queryOptions } from "@tanstack/react-query";
import { deleteProduct, fetchAdminCategories,fetchProductIds, fetchUserCategories, getAllProducts, getFilteredProducts, getProductsByCategory } from "./fetchers";

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
    queryFn: () =>  getProductsByCategory(categoryParam)
  });
};

 const getCartProductIdQuery = (productIds: string[]) => {
  
  return queryOptions({
    queryKey: ["cartproducts", productIds],
    queryFn: () =>  fetchProductIds(productIds),
    enabled: productIds.length > 0,
    
  });
 }

  const getAllProductsQuery = () => {
    return queryOptions({
      queryKey: ["allproducts"],
      queryFn: getAllProducts,
     
    })
  }

  const getFilteredProdQuery = ( page: number, limit: number, minPrice: number, maxPrice: number, category: string, search: string | null) => {
    return queryOptions({
      queryKey: ["filteredproducts", page, limit, minPrice, maxPrice, category,search],
      queryFn: () =>  getFilteredProducts(page, limit, minPrice, maxPrice, category,search),
  
    })
  }
  
   const deleteProductQuery = (id: string | unknown) => {
    return queryOptions({
      queryKey: ["deleteproduct", id],
      queryFn: () =>  deleteProduct(id),
      enabled: id !== undefined,
    
    })
  }



export { getCategoriesQuery, getProductsQuery, getCartProductIdQuery, getAllProductsQuery, deleteProductQuery, getFilteredProdQuery, getAdminCategoriesQuery };