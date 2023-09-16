import * as React from 'react';
import AsideCategories from './asideCategories';
import PromoCard from './promoCard';
import HeaderBarProducts from './headerBarProducts';
import Products from './products';

type Props = {
  category: string;
  search?: string;
}
export default function ProductSection(props: Props) {
  const { category, search } = props
  const [sorting, setSorting] = React.useState('-created');
  return (
    <section id="product">
      <aside>
        <AsideCategories />
        <PromoCard />
      </aside>
      <div className="main">
        <HeaderBarProducts setSorting={setSorting} sorting={sorting} />
        <Products category={category} sorting={sorting} search={search} />
      </div>

      <style jsx>{`
        #product {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        #product .main {
          flex-grow: 1;
          padding-left: 30px;
        }
        @media (max-width: 900px) {
          #product .main {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
