import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import { motion } from "motion/react";

interface PriceFilterProps {
  onChange?: (min: number, max: number) => void;
}
const PriceFilter: React.FC<PriceFilterProps> = ({ onChange }) => {
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(0)
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(10000)
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    if (onChange) onChange(value, maxPrice);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    if (onChange) onChange(minPrice, value);
  };

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{
        height: "auto",
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      className="p-4 rounded-md shadow-sm bg-white w-full absolute lg:top-0 top-12 lg:relative "
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Filter by Price
      </h3>
      <motion.div className="flex items-center space-x-4">
        <motion.div className="flex flex-col w-1/2">
          <label htmlFor="min" className="text-sm text-gray-600">
            Min
          </label>
          <motion.input
          initial={{ opacity:0}}
          animate={{opacity:1 , transition:{duration:1}}}
            id="min"
            type="range"
            style={{ accentColor: "#ca8888" }}
            min={0}
            max={maxPrice}
            value={minPrice}
            onChange={handleMinChange}
            className=" border  rounded px-3 py-2 focus:outline-none "
          />
        </motion.div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="max" className="text-sm text-gray-600">
            Max
          </label>
          <input
            id="max"
            type="range"
            style={{ accentColor: "#ca8888" }}
            min={minPrice}
            max={1000}
            value={maxPrice}
            onChange={handleMaxChange}
            className=" rounded px-3 py-2 focus:outline-none "
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PriceFilter;
