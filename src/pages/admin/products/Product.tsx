import { Link } from "react-router-dom";
import ProdTable from "./components/ProdTable";
import { useSingleProductStore } from "../../../store/product/Table.store";
import SingleProduct from "./components/SingleProduct";

const Product = () => {
  const { showSingleProduct } = useSingleProductStore();

  return (
    <div className="w-full min-h-screen mt-16 px-4 sm:px-6 md:px-8 py-7 overflow-auto border border-gray-100">
      <div className="w-full max-w-auto mx-auto shadow-lg px-4 sm:px-8 py-6 rounded-2xl border border-gray-100 bg-white">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h3 className="text-2xl font-medium text-[#333] underline leading-9 font-poppins">
            Product Details
          </h3>
          <Link
            to="/admin/productform"
            type="button"
            className="bg-primary text-sm text-white rounded-lg lg:w-30 md:w-25 sm:w-20 w-15 text-center p-2"
          >
            Create Product
          </Link>
        </div>
        <ProdTable />
      </div>
      {showSingleProduct && <SingleProduct />}
    </div>
  );
};

export default Product;
