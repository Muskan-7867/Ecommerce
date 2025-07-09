import React, { useState } from "react";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Products from "./components/Products";
import ScreenHandler from "../../../components/wrappers/ScreenHandler";
import PaddingWrapper from "../../../components/wrappers/PaddingWrapper";
import Pagination from "./components/Pagination";

const ProductPageLayout: React.FC = () => {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [productPerPage] = useState<number>(9);

  return (
    <ScreenHandler>
      <PaddingWrapper>
        <div className="w-full mt-18 flex flex-col lg:gap-12 gap-2">
          <Search />
          <div className="grid grid-cols-12 w-full">
            <div className="lg:col-span-3 col-span-12">
              <Filter />
            </div>
            <div className="lg:col-span-9 col-span-12 mt-6 lg:mt-0">
              <Products onTotalProductsChange={setTotalProducts} />
            </div>
          </div>
          <Pagination totalProducts={totalProducts} productPerPage={productPerPage} />
        </div>
      </PaddingWrapper>
    </ScreenHandler>
  );
};

export default ProductPageLayout;