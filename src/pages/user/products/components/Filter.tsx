import React from "react";
import Category from "./Category";
import PriceFilter from "./PriceFilter";
import { AnimatePresence } from "motion/react";
import { parseAsBoolean, useQueryState } from "nuqs";

const Filter: React.FC = () => {
  const [price] = useQueryState(
    "price",
    parseAsBoolean.withDefault(false)
  );
  return (
    <AnimatePresence>
      <div className="w-full flex flex-col gap-2 lg:gap-8 relative">
        <Category />
        {price && <PriceFilter />}
      </div>
    </AnimatePresence>
  );
};

export default Filter;
