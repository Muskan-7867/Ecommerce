import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { getCategoriesQuery } from "../../../services/queries";
import { CategoryType } from "../../user/Home/components/CategorySection";
import { motion } from "motion/react";
import PaddingWrapper from "../../../components/wrappers/PaddingWrapper";
import AddCategoryForm from "./components/AddCategoryForm";

const Categories = () => {
  const [category, setCategory] = useQueryState("category");
  console.log(category)
  const {
    data: categories,
    isPending,
    isError
  } = useQuery(getCategoriesQuery());

  //   const handleDelete = (id: string) => {
  //     const existingRaw = localStorage.getItem("productIds");
  //     const existing: string[] = existingRaw ? JSON.parse(existingRaw) : [];
  //     if (!existing.includes(id)) {
  //       console.warn("⚠️ ID not found in localStorage array!");
  //       return;
  //     }

  //     const updated = existing.filter((prodid) => prodid !== id);
  //     localStorage.setItem("productIds", JSON.stringify(updated));
  //     setProducts((prev) => prev.filter((product) => product._id !== id));
  //   };

  return (
    <PaddingWrapper>
      <div className="grid grid-cols-12 gap-4 mt-18 min-h-screen">
        <div className="lg:col-span-7  rounded-md col-span-12 p-6">
          <h1 className="text-xl font-bold font-serif mb-4"> All Categories</h1>
          <div className="flex gap-4 flex-wrap ">
            {isPending && <p>Loading Categories.......</p>}

            {isError && <p>Error loading categories</p>}
            {categories?.map((category: CategoryType, index: number) => (
              <motion.div
                key={category._id}
                onClick={() => {
                  setCategory(category._id);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="cursor-pointer flex flex-col items-center gap-3 flex-shrink-0 w-36"
              >
                <div className="lg:w-32 lg:h-32 w-28 h-28 rounded-md shadow-md border-2 border-white hover:border-primary transition-all duration-500 group overflow-hidden relative">
                  <div className="absolute -top-12 w-12 h-[16rem] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-16 -rotate-45 group-hover:translate-x-[11rem] transition-all duration-500" />
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
                <span className="text-lg font-medium text-black text-center">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className=" lg:col-span-5 col-span-12 p-6">
          <h1 className="text-xl font-bold font-serif mb-4">Category Form</h1>
          <AddCategoryForm />
        </div>
      </div>
    </PaddingWrapper>
  );
};

export default Categories;
