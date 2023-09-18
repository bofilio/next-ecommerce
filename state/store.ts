import { create } from 'zustand';
import { ProductRecord, UserRecord } from '../react-query/types';
import { pb } from '../pocketbase';
import { userInfo } from 'os';

type Store = {
  user: UserRecord | null | undefined;
  topCategory: string;
  sideDrowerOpen: boolean;
  setTopCategory: (cat: string) => void;
  setUser: (user?: UserRecord | null) => void;
  toggleDrawer: () => void;
  cart: ProductRecord[];
  toggleCart: (prod: ProductRecord) => void;
};
export const useStoreState = create<Store>((set) => ({
  user: undefined,
  topCategory: '',
  sideDrowerOpen: false,
  cart: [],
  setTopCategory: (cat: string) =>
    set((state) => ({ ...state, topCategory: cat })),
  setUser: (user) => set((state) => ({ ...state, user: user })),
  toggleDrawer: () =>
    set((state) => ({ ...state, sideDrowerOpen: !state.sideDrowerOpen })),
  toggleCart: (prod: ProductRecord) =>
    set((state) => {
      const new_cart = state.cart.filter((p) => p.id !== prod.id);
      if (new_cart.length === state.cart.length)
        return { ...state, cart: [...new_cart, prod] };
      return { ...state, cart: new_cart };
    }),
}));
