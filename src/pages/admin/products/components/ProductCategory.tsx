import { useQueryState } from "nuqs";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesQuery } from "../../../../services/queries";
import { type Category } from "../../../../types/Product";

type ProductCategoryProps = {
  category: string;
  setCategory: (category: string) => void;
};
const ProductCategory:React.FC<ProductCategoryProps> = () => {
  
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
      <div className="w-full px-2 border border-gray-200 rounded-lg">
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

  
    </div>
  );
};

export default ProductCategory;
