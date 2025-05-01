import { create } from 'zustand';

type categoryType = {
    selectedCategory : string | null;
    setSelectedCategory: (category: string) => void;
}
export const useCategoryStore = create<categoryType>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
  }));
 

