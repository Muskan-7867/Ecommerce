import { parseAsBoolean, useQueryState } from "nuqs";
import { BsFilter } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "../../../../services/queries";
import { type Category } from "../../../../types/Product";

const Category = () => {
  const [price, setPrice] = useQueryState(
    "price",
    parseAsBoolean.withDefault(false)
  );
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all"
  });

  const {
    data: categories,
    isPending,
    isError
  } = useQuery(getCategoriesQuery());

  return (
    <div className="w-full flex items-center gap-2 justify-between">
      <div className="w-full px-2 border border-gray-200 p-2 rounded-lg">
        <select
          id="category-select"
          className="w-full p-2 rounded-md focus:outline-none"
          value={category || ""}
          onChange={(e) => {
            const value = e.target.value;
            console.log("from category", value);
            setCategory(value);
          }}
        >
          {isPending && <p>Loading Categories.......</p>}

          {isError && <p>Error loading categories</p>}
          <option value="all">All</option>
          {categories?.map((category: Category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Toggle Button */}
      <BsFilter
        onClick={() => setPrice(!price)}
        size={28}
        className="lg:hidden block cursor-pointer"
      />
    </div>
  );
};

export default Category;
