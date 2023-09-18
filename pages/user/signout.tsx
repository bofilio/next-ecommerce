import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client'
import { SignOut } from '../../react-query/mutations';



export default function SignOutPage() {
  const router = useRouter();
  useEffect(() => {
    SignOut()
    router.push('/user/login');

  }, [router]);

  return <p>Signing out...</p>;
}


