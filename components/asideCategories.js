import CategoriesItem from './categoriesItem';
import { useQuery } from '@apollo/client';
import { CATEGORIES } from '../apollo/client/queries';
import offlineCategories from '../db/offlineData/categories';
import { useAllCategories } from '../react-query/query_hooks';
import { useStoreState } from '../state/store';

export default function AsideCategories() {
  //const { data, loading, error } = useQuery(CATEGORIES);
  const topCategory = useStoreState((state) => state.topCategory);
  const { data, isLoading, isError } = useAllCategories(topCategory);
  if (isLoading) return <></>;

  return (
    <ul className="categories">
      {data?.map((category) => {
        return <CategoriesItem key={category.id} category={category} />;
      })}

      <style jsx>{`
        .categories {
          width: 255px;
          max-width: 255px;
          background: #ffff;
          border-radius: 6px;
          margin-bottom: 30px;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
        }
        @media (max-width: 1000px) {
          .categories {
            display: none;
          }
        }
      `}</style>
    </ul>
  );
}
