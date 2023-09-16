import '../public/reset.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
