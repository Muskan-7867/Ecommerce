import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { getAdminCategoriesQuery } from "../../../services/queries";
import { CategoryType } from "../../user/Home/components/CategorySection";
import { motion } from "motion/react";
import PaddingWrapper from "../../../components/wrappers/PaddingWrapper";
import AddCategoryForm from "./components/AddCategoryForm";
import { useEffect, useState } from "react";
import { fetchCategory } from "../../../services/fetchers";

const Categories = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useQueryState("category");
  console.log(category);
  // const [updating, setUpdating] = useState(false);
  const { data, isPending, isError } = useQuery(getAdminCategoriesQuery());
  const [Categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleApproved = async (categoryId: string) => {
    console.log("from approved" , categoryId);
    try {
      // setUpdating(true);
      const response = await fetchCategory(categoryId);

      queryClient.invalidateQueries({ queryKey: ["admincategories"] });
      setCategory(response);
      // setUpdating(false);
    } catch {
      console.log("error");
    }
  };

  return (
    <PaddingWrapper>
      <div className="grid grid-cols-12 gap-4 mt-26 min-h-screen">
        <div className="lg:col-span-7 rounded-md col-span-12 p-6">
          <h1 className="text-xl font-bold font-serif mb-4">All Categories</h1>
          <div className="flex gap-4 flex-wrap">
            {isPending && <p>Loading Categories.......</p>}
            {isError && <p>Error loading categories</p>}

            {Categories.map((category, index) => (
              <motion.div
                key={category._id}
                onClick={() => setCategory(category._id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="cursor-pointer flex flex-col items-center gap-3 flex-shrink-0 w-36"
              >
                <div className="lg:w-32 lg:h-32 w-28 h-28 rounded-md shadow-md border-2 border-white hover:border-primary transition-all duration-500 group overflow-hidden relative">
                  <motion.img
                    src={
                      category.images?.[0]?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={category.name}
                    className="w-full h-full object-contain p-2"
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span className="text-lg font-medium text-gray-700 text-center">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApproved(category._id);
                  }}
                  className={`w-full ${
                    category.approved ? "bg-green-400" : "bg-red-400"
                  } text-white p-1 rounded-md text-sm hover:opacity-90 transition`}
                >
                  {category.approved ? "Approved" : "Not Approved"}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 col-span-12 p-6">
          <h1 className="text-xl font-bold font-serif mb-4">Category Form</h1>
          <AddCategoryForm />
        </div>
      </div>
    </PaddingWrapper>
  );
};

export default Categories;
