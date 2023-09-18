import { useQuery } from '@apollo/client';
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import FinishOrderCart from '../components/finishOrderCart';
import ProductItem from '../components/productItem';
import { CART, PRODUCTS_BY_IDS } from '../apollo/client/queries';
import ProductsGrid from '../components/productsGrid';
import { useStoreState } from '../state/store';

export default function Profile() {
  const cart = useStoreState((store) => store.cart);

  if (!cart.length)
    return (
      <Page title="Cart" description="">
        <Title title="Cart" />
        <EmptySection name="cart" />
      </Page>
    );

  return (
    <Page title="Cart" description="">
      <Title title="Cart" />
      <section className="cart">
        <aside>{cart.length !== 0 && <FinishOrderCart />}</aside>
        <div className="main">
          {!cart.length && <EmptySection name="cart" />}
          <ProductsGrid>
            {cart.map((product) => (
              <ProductItem
                key={product.id}
                data={product}
              />
            ))}
          </ProductsGrid>
        </div>
      </section>

      <style jsx>{`
        .cart {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .cart .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        .cart aside {
          max-width: 280px;
        }

        @media (max-width: 1100px) {
          .cart {
            flex-direction: column;
            justify-content: space-between;
          }
          .cart aside {
            flex-grow: 1;
            max-width: 100%;
          }
          .cart .main {
            padding-left: 0px;
          }
        }
      `}</style>
    </Page>
  );
}
