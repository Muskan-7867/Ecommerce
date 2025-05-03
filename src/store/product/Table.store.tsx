import { create } from "zustand";

interface TableType<T> {
  selectedProduct: T | null;
  setSelectedProduct: (row: T) => void;
  showSingleProduct: boolean;
  setShowSingleProduct: (show: boolean) => void;
}

export const useSingleProductStore = create<TableType<any>>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (row) => set({ selectedProduct: row }),
  showSingleProduct: false,
  setShowSingleProduct: (show) => set({ showSingleProduct: show })
}));
