import '../public/reset.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useEffect } from 'react';
import { pb } from '../pocketbase';
import { UserRecord } from '../react-query/types';
import { useStoreState } from '../state/store';
import { initUserFromLocalStorage } from '../react-query/mutations';
import LoadingPage from '../components/loading-page';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: any) {
  const setUser = useStoreState((state) => state.setUser);
  useEffect(() => {
    setUser(initUserFromLocalStorage());
    pb.authStore.onChange((token, user) => {
      setUser(user as UserRecord);
      if (user) localStorage.setItem('USER', pb.authStore.exportToCookie());
      else localStorage.removeItem('USER');
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}
