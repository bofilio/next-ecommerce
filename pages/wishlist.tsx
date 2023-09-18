import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import AsideCategories from '../components/asideCategories';
import { WISHLIST, PRODUCTS_BY_IDS } from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';
import ProductItem from '../components/productItem';
import { useMywishlist } from '../react-query/query_hooks';
import LoadingPage from '../components/loading-page';
import { useRouter } from 'next/router';
import { useStoreState } from '../state/store';
import { useEffect } from 'react';
import { pb } from '../pocketbase';

export default function Wishlist() {
  const { data: wishlist, isLoading, isError } = useMywishlist()
  const router = useRouter()
  console.log({ wishlist });

  useEffect(() => {
    if (!pb.authStore.isValid)
      router.push('/user/login?redirect=/wishlist')
  }, [])

  if (isLoading) return <LoadingPage />;

  if (isError || !wishlist?.length)
    return (
      <Page title="wishlist" description="">
        <Title title="Wishlist" />
        <EmptySection name="wishlist" />
      </Page>
    );

  return (
    <Page title="wishlist" description="">
      <Title title="Wishlist" />
      <section className="wishlist">
        <aside>
          <AsideCategories />
        </aside>
        <div className="main">
          <ProductsGrid>
            {wishlist?.map((product) => (
              <ProductItem
                key={product.id}
                data={product}
              />
            ))}
          </ProductsGrid>
        </div>
      </section>
      <style jsx>{`
        .wishlist {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .wishlist .main {
          flex-grow: 1;
          padding-left: 30px;
        }
      `}</style>
    </Page>
  );
}
