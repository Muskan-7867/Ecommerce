import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../../../../types/Product";
import ProductDetails from "./ProductDetails";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import Lottie from "lottie-react";
import ProductLoader from "../../../../../public/animations/loader.json";

const ProductDisplay = () => {
  const Base_url = import.meta.env.VITE_BASE_URL;
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Id = product?.category;
  console.log("from categoryid", Id);

  const fetchRelatedProducts = async (currentProductId: string) => {
    if (!product?.category) return;

    try {
      const res = await axios.get(
        `${Base_url}/api/v2/product/categoryid/${Id}`
      );

      const filteredProducts = res.data.products.filter(
        (p: Product) => p._id !== currentProductId
      );

      setRelatedProducts(filteredProducts);
    } catch (err) {
      console.error("Failed to fetch related products:", err);
    }
  };

  useEffect(() => {
    if (product?.category) {
      console.log("from categoryids", product._id)
      fetchRelatedProducts(product._id);
     

    }
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${Base_url}/api/v2/product/single/${id}`,
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        const productData = response?.data?.product;

        if (!productData) {
          setError("Product not found");
          return;
        }
        console.log("from prod display", productData);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [Base_url, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Lottie
          animationData={ProductLoader}
          className="w-[18rem] h-[18rem] lg:w-[25rem] lg:h-[25rem]"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-14 flex justify-center items-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 mt-28">
      <div className="max-w-6xl mx-auto bg-white rounded-xl  overflow-hidden">
        <div className="md:flex">
          {/* Left side - product images */}
          <ProductImage product={product} />
          {error && <p className="text-red-700">{error}</p>}

          {/* Right side - product details */}
          <ProductDetails product={product} />
        </div>
      </div>

      {/* Related products */}
      <div className="max-w-full mx-auto mt-16 p-4">
        <h1 className="text-2xl font-bold mb-6 text-primary">
          Related Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard product={prod} key={prod._id} />
          ))}
        </div>
        {relatedProducts.length === 0 && (
          <p className="text-gray-500 mt-4">No related products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
