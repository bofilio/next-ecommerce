
import Page from '../components/page';
import EmptySection from '../components/emptySection';
import Title from '../components/title';
import FinishOrderCart from '../components/finishOrderCart';
import ProductItem from '../components/productItem';
import ProductsGrid from '../components/productsGrid';
import { useStoreState } from '../state/store';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useCreateOrder } from '../react-query/mutation_hooks';
import { forEachField } from 'graphql-tools';

export default function Cart() {
  const { cart, decreaseQt, IncreaseQt, user } = useStoreState();

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
            {cart.map((item) => (
              <div className='productWraper' key={item.product.id}>
                <ProductItem
                  data={item.product}
                />
                <div className='qt_block'>
                  <button className='edit_qt' onClick={() => IncreaseQt(item.product.id)}>
                    <FaPlus size={16} color="#212A3E" />
                  </button>
                  <span className='qt_text'>
                    {item.qt}
                  </span>
                  <button className='edit_qt' onClick={() => decreaseQt(item.product.id)}>
                    <FaMinus size={16} color="#212A3E" />
                  </button>
                </div>
              </div>

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
        .productWraper{
          position:relative;
        }
        .qt_block{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:1rem;
          padding:4px 12px;
          position:absolute;
          height:2rem;
          width:7rem;
          background-color:#F1F6F9;
          top:0;
          left:0;
        }
        .qt_text{
          font-weight:700;
          color:#212A3E;
          font-size:18px;
        }
        .edit_qt{
          background: none;
          border: none;
          cursor:pointer;
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
