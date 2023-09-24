import { create } from 'zustand';
import { ProductRecord, UserRecord } from '../react-query/types';
import { pb } from '../pocketbase';
import { userInfo } from 'os';

type CartItem = { product: ProductRecord; qt: number };
type Store = {
  user: UserRecord | null | undefined;
  topCategory: string;
  sideDrowerOpen: boolean;
  setTopCategory: (cat: string) => void;
  setUser: (user?: UserRecord | null) => void;
  toggleDrawer: () => void;
  cart: CartItem[];
  toggleCart: (item: CartItem) => void;
  IncreaseQt: (id: string) => void;
  decreaseQt: (id: string) => void;
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
  toggleCart: (newItem: CartItem) =>
    set((state) => {
      const new_cart = state.cart.filter(
        (item) => item.product.id !== newItem.product.id
      );
      if (new_cart.length === state.cart.length)
        return { ...state, cart: [...new_cart, newItem] };
      return { ...state, cart: new_cart };
    }),
  IncreaseQt: (id: string) =>
    set((state) => ({
      ...state,
      cart: state.cart.map((item) =>
        item.product.id !== id ? item : { ...item, qt: item.qt + 1 }
      ),
    })),
  decreaseQt: (id: string) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.product.id !== id ? item : { ...item, qt: item.qt - 1 }
      );
      return { ...state, cart: newCart.filter((item) => item.qt > 0) };
    }),
}));
