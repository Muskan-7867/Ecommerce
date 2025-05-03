// DialogBox.tsx
import React from "react";
import { useSingleProductStore } from "../../../store/product/Table.store";



// interface DialogBoxProps {
//   productId: string;
//   onDeleteSuccess?: () => void;
// }

const DialogBox: React.FC = () => {
  const {  setShowSingleProduct} = useSingleProductStore()
  // const handleDelete = async () => {
  //   try {
  //     const result = await deleteProduct(productId);
  //     console.log("Product deleted:", result);

  //     if (onDeleteSuccess) {
  //       onDeleteSuccess();
  //     }
  //   } catch {
  //      const error = "Failed to delete product"
  //      console.error(error);
  //   }
  // };
 
  const handleViewClick = () =>{
   setShowSingleProduct(true)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[10rem] mr-6">
        <ul className="divide-y text-black">
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer" onClick={handleViewClick}>View</li>
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">Edit</li>
          <li className="px-4 py-4 hover:bg-gray-200 cursor-pointer">
            Delete
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DialogBox;
