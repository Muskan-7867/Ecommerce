import React from "react";
import Category from "./Category";
import PriceFilter from "./PriceFilter";
import { AnimatePresence } from "framer-motion"; 
import { parseAsBoolean, useQueryState } from "nuqs";

const Filter: React.FC = () => {
  const [price] = useQueryState("price", parseAsBoolean.withDefault(false));

  return (
    <AnimatePresence>
      <div className="w-full  flex-col lg:items-start gap-4 lg:gap-8 relative ">
        <Category />
        {price && <PriceFilter />}
      </div>
    </AnimatePresence>
  );
};

export default Filter;
