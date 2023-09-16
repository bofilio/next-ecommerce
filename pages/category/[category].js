import { useRouter } from 'next/router';

import Page from '../../components/page';
import ProductSection from '../../components/productSection';

export default function Category() {
  const router = useRouter();
  const { category, search } = router.query;

  return (
    <Page>
      <ProductSection category={category} search={search} />
    </Page>
  );
}
