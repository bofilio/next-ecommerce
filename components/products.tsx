import { useQuery } from '@apollo/client';
import ProductItem from './productItem';
import { PRODUCTS, SORT_PRODUCT_SECTION } from '../apollo/client/queries';
import ProductsGrid from './productsGrid';
import offlineProducts from '../db/offlineData/products';
import LoadingPage from './loading-page';
import { useProducts } from '../react-query/query_hooks';
import React from 'react';
import { ListResult } from 'pocketbase';
import { ProductRecord } from '../react-query/types';
import EmptySection from '../components/emptySection';
type Props = {
  category: string;
  sorting: string;
  search?: string;
}
export default function Products(props: Props) {
  const { category, sorting: sort, search } = props
  const { data, isLoading } = useProducts({ category, sort, search });

  const products = React.useMemo(
    () =>
      data?.pages.reduce((previous: ProductRecord[], current: ListResult<ProductRecord>) => {
        return [...previous, ...current.items];
      }, []),
    [data]
  );
  // if (error) return <EmptySection />;

  if (!products?.length) return <EmptySection name={""} />;
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <ProductsGrid>
      {products?.map((product) => (
        <ProductItem
          key={product.id}
          data={product}
        />
      ))}
    </ProductsGrid>
  );
}
