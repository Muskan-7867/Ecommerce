import React, { useState } from "react";
import { useSingleProductStore } from "../../../store/product/Table.store";
import { deleteProduct } from "../../../services/fetchers";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface DialogBoxProps {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
}

const DialogBox: React.FC<DialogBoxProps> = ({ onDeleteSuccess , setOpenDialog }) => {
  const { setShowSingleProduct, selectedProduct } =
    useSingleProductStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewClick = () => {
    setShowSingleProduct(true);
  };

  const handleEdit = async () => {
    navigate("/admin/editproduct");
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct._id);
      queryClient.invalidateQueries({ queryKey: ["filteredproducts"] });

      setMessage("Product deleted successfully.");
      setError(null);
      setOpenDialog(null);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (err) {
      console.error("Failed to delete product", err);
      setError("Failed to delete product.");
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[10rem] mr-6">
        <ul className="divide-y text-black">
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleViewClick}
          >
            View
          </li>
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </li>
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </li>
        </ul>
      </div>

      {/* Inline message feedback */}
      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default DialogBox;
