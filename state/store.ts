import { create } from 'zustand';

type Store = {
  topCategory: string;
  setTopCategory: (cat: string) => void;
};
export const useStoreState = create<Store>((set) => ({
  topCategory: '',
  setTopCategory: (cat: string) =>
    set((state) => ({ ...state, topCategory: cat })),
}));
