// DialogBox.tsx
import React, { useState } from "react";
import {
  useSingleOrderStore,
  useSingleProductStore
} from "../../../store/product/Table.store";
import { deleteOrder, deleteProduct } from "../../../services/fetchers";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


interface DialogBoxProps<T> {
  onDeleteSuccess?: () => void;
  onEditSuccess?: () => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
  row: T;
}

function DialogBox<T>({ onDeleteSuccess, setOpenDialog, row }: DialogBoxProps<T>) {
  console.log(row)
  const { setShowSingleProduct, selectedProduct } = useSingleProductStore();
  const { selectedRow, setShowSingleOrder } = useSingleOrderStore();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const route = window.location.pathname;

  const handleViewClick = () => {
    setShowSingleProduct(true);
    setShowSingleOrder(true);
  };

  const handleEdit = () => {
    navigate("/admin/editproduct");
  };

  const handleDelete = async () => {
    try {
      if (route === "/admin/products") {
        await deleteProduct(selectedProduct._id);
        queryClient.invalidateQueries({ queryKey: ["filteredproducts"] });
      } else if (route === "/admin/order") {
        await deleteOrder(selectedRow._id);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      }
      setMessage("Deleted successfully.");
      setError(null);
      setOpenDialog(null);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (err) {
      console.error("Failed to delete", err);
      setError("Failed to delete.");
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[10rem] ms-auto mr-6">
        <ul className="divide-y text-black">
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleViewClick}
          >
            View
          </li>
          {route === "/admin/products" && (
            <li
              className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </li>
          )}
          <li
            className="px-4 py-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </li>
        </ul>
      </div>
      {message && <p className="mt-2 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export default DialogBox;
