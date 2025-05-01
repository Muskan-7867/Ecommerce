import {
  foundation,
  JuicerJag,
  purse,
  shoe,
  toy
} from "../../../constants/imagePath";
import Footer from "./Footer";

import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../../store/product/Product.store";

const NewFooter = () => {
  const navigate = useNavigate();
  const setSelectedCategory = useCategoryStore(
    (state) => state.setSelectedCategory
  );

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    navigate("/products");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="h-[30rem] flex items-end justify-center bg-gradient-to-b from-transparent to-red-100 ">
        <img
          onClick={() => handleCategoryClick("electronics")}
          src={JuicerJag}
          className="w-[3rem] lg:w-[10rem] md:w-[8rem] aspect-auto cursor-pointer"
        />

        <img
          onClick={() => handleCategoryClick("fashion")}
          src={purse}
          className=" w-[3rem] md:w-[8rem] lg:w-[12rem] aspect-auto cursor-pointer"
        />

        <img
          onClick={() => handleCategoryClick("toys")}
          src={toy}
          className="w-[5rem] md:w-[8rem] lg:w-[12rem] aspect-auto translate-y-6 relative z-10 cursor-pointer"
        />

        <img
          onClick={() => handleCategoryClick("fashion")}
          src={foundation}
          className=" w-[2rem] md:w-[5rem] lg:w-[7rem] aspect-auto cursor-pointer"
        />

        <img
          onClick={() => handleCategoryClick("sports")}
          src={shoe}
          className="w-[3rem] md:w-[9rem] lg:block lg:w-[15rem] aspect-auto cursor-pointer"
        />
      </div>

      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default NewFooter;
