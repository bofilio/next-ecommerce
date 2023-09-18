import { useMutation, useQueryClient } from 'react-query';
import {
  AddToWishlist,
  RemoveFromWishlist,
  SignIn,
  SignUp,
  SignwithOAUth2,
} from './mutations';
import { pb } from '../pocketbase';
import { useRouter } from 'next/router';
import { useMywishlist } from './query_hooks';
import { KEYS } from './query_keys';
import { GetMyWishlist } from './query_functions';

export function useSignUp() {
  const router = useRouter();
  return useMutation(SignUp, {
    onSuccess: (data) => {},
    onError: (err: any) => {},
  });
}
export function useSignUpWithOAuth2(provider: 'google' | 'facebook') {
  return useMutation(() => SignwithOAUth2(provider), {
    onSuccess: (data) => {},
    onError: (err: any) => {},
  });
}

export function useSignIn() {
  return useMutation(SignIn, {
    onSuccess: (data) => {},
    onError: (err: any) => {},
  });
}
/********************* wishlist */
export function useToggleWishList(prodId: string) {
  const queryClient = useQueryClient();

  if (pb.authStore.model?.wishlist.includes(prodId))
    return useMutation(RemoveFromWishlist, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: KEYS.wichlist });
      },
    });

  return useMutation(AddToWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.wichlist });
    },
  });
}
