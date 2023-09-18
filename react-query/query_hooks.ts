import { useInfiniteQuery, useQuery } from 'react-query';
import { KEYS } from './query_keys';
import {
  GetMyWishlist,
  GetOneProduct,
  getAllCategories,
  getProducts,
} from './query_functions';
import { productfilter } from './types';
import { pb } from '../pocketbase';
import { useRouter } from 'next/router';

/************ category */
export function useAllCategories(parent?: string) {
  return useQuery([...KEYS.categories, parent], () => getAllCategories(parent));
}
/************ product */
export function useProducts(filter: productfilter) {
  return useInfiniteQuery(
    [...KEYS.products, ...Object.values(filter)],
    ({ pageParam = { page: 1, perPage: 10 } }) =>
      getProducts({ ...filter, ...pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page >= lastPage.totalPages) return undefined;
        return {
          page: lastPage.page,
          perPage: lastPage.perPage,
        };
      },
    }
  );
}
export function useOneProduct(id: string) {
  return useQuery([...KEYS.products, id], () => GetOneProduct(id));
}
/******** wishlist */
export function useMywishlist() {
  return useQuery(KEYS.wichlist, GetMyWishlist);
}
