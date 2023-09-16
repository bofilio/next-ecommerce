import React from 'react';
import Warning from '../components/alerts/warnig';
import Page from '../components/page';
import ProductSection from '../components/productSection';
import { useRouter } from 'next/router';

export default function Index() {
  const { search } = useRouter().query;
  return (
    <Page title="Home" description={''}>
      {process.env.NODE_ENV === 'production' && (
        <Warning message="This is not a real e-commerce, it is just a code exercise." />
      )}
      <ProductSection category={undefined} search={search} />
    </Page>
  );
}
