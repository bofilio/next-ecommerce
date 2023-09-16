import { useInfiniteQuery, useQuery } from 'react-query';
import { KEYS } from './query_keys';
import { getAllCategories, getProducts } from './query_functions';
import { productfilter } from './types';

export function useAllCategories(parent?: string) {
  return useQuery([...KEYS.categories, parent], () => getAllCategories(parent));
}

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
