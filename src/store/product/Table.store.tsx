import { create } from "zustand";

interface TableType<T> {
  selectedProduct: T | null;
  setSelectedProduct: (row: T) => void;
  showSingleProduct: boolean;
  setShowSingleProduct: (show: boolean) => void;
  editProduct: boolean;
  setEditProduct: (edit: boolean) => void;
}

export const useSingleProductStore = create<TableType<any>>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (row) => set({ selectedProduct: row }),
  showSingleProduct: false,
  setShowSingleProduct: (show) => set({ showSingleProduct: show }),
  editProduct: false,
  setEditProduct: (edit) => set({ editProduct: edit })
}));
