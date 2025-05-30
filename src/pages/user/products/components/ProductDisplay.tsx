import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Product } from "../../../../types/Product";
import ProductDetails from "./ProductDetails";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import { useSingleProduct } from "../../../../store/product/Product.store";
import ProductDetailShimmer from "./ProductDetailShimmer";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const ProductDisplay = () => {
  const Base_url = import.meta.env.VITE_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const { singleProduct: product, setSingleProduct } = useSingleProduct();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const fetchRelatedProducts = async (currentProductId: string, categoryId: string) => {
    try {
      const res = await axios.get(
        `${Base_url}/api/v1/product/categoryid/${categoryId}`
      );
      const filtered = res.data.products.filter((p: Product) => p._id !== currentProductId);
      setRelatedProducts(filtered);
    } catch (err) {
      console.error("Failed to fetch related products:", err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Base_url}/api/v1/product/single/${id}`);
        const data = res.data.product;

        if (!data) {
          setError("Product not found");
          return;
        }
        setSingleProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [Base_url, id, setSingleProduct]);

  useEffect(() => {
    if (product?.category) {
      fetchRelatedProducts(product._id, product.category);
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <ProductDetailShimmer />;
  }

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-gray-50 py-12 px-4 mt-14 flex justify-center items-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-12 px-4 mt-28">
      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="md:flex">
          <ProductImage product={product} />
          {error && <p className="text-red-700">{error}</p>}
          <ProductDetails product={product} />
        </div>
      </div>

      <div className="max-w-full mx-auto mt-16 p-4 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Related Products</h1>
          
          {/* Scroll buttons - visible only on mobile */}
          <div className="lg:hidden flex gap-4">
            <button 
              onClick={scrollLeft}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <CircleChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={scrollRight}
              className="rounded-full p-1 hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <CircleChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Mobile - Horizontal Scroll */}
        <div 
          ref={scrollRef}
          className="lg:hidden overflow-x-auto pb-4 scrollbar-hide relative"
        >
          <div className="flex space-x-4 w-max">
            {relatedProducts.map((prod) => (
              <div key={prod._id} className="w-48 flex-shrink-0">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
          {relatedProducts.length === 0 && (
            <p className="text-gray-500 mt-4">No related products found</p>
          )}
        </div>

        {/* Desktop - Grid Layout */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((prod) => (
            <ProductCard product={prod} key={prod._id} />
          ))}
          {relatedProducts.length === 0 && (
            <p className="text-gray-500 mt-4 col-span-full">No related products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;