import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import Button from "../../../../components/common/Button";
import { getProductsByCategory } from "../../../../services/fetchers";
import { Product } from "../../../../types/Product";

const KitchenProducts = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [Products, setProducts] = useState<Product[]>([]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftBtn(scrollLeft > 0);
      setShowRightBtn(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const fetchBeauty = async () => {
      try {
        const data = await getProductsByCategory("kitchen");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching beauty products", err);
      }
    };

    fetchBeauty();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const timeout = setTimeout(() => {
        checkScrollPosition();
      }, 100);

      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        clearTimeout(timeout);
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [Products]);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="h-auto w-full relative">
      <div className="flex justify-between items-center p-4">
        <h1 className="lg:text-3xl sm:text-xl font-semibold text-primary">
          Kitchen Products
        </h1>
        <Button />
      </div>

      <div className="relative px-6">
        {showLeftBtn && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition bg-white/80 backdrop-blur-sm border border-primary"
          >
            <FaChevronLeft className="w-4 h-4 text-black" />
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto overflow-hidden scroll-smooth py-4 gap-6 px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {Products.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-[300px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {showRightBtn && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100 transition bg-white/80 backdrop-blur-sm border border-primary"
          >
            <FaChevronRight className="w-4 h-4 text-black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default KitchenProducts;
