import { useMutation, useQueryClient } from 'react-query';
import {
  AddToWishlist,
  RemoveFromWishlist,
  RequestPasswordReset,
  SignIn,
  SignUp,
  SignwithOAUth2,
  createOrder,
} from './mutations';
import { pb } from '../pocketbase';
import { useRouter } from 'next/router';
import { KEYS } from './query_keys';

import toast from 'react-hot-toast';

export function useSignUp() {
  const router = useRouter();
  return useMutation(SignUp, {
    onSuccess: (data) => {
      toast.success(
        'we have sent you vérification email to confirm your email adress'
      );
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}
export function useSignUpWithOAuth2() {
  return useMutation(SignwithOAUth2, {
    onSuccess: (data) => {
      toast.success(`Welcome ${data?.name ?? ''}`);
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}
/*************************************sign in */
export function useSignIn() {
  return useMutation(SignIn, {
    onSuccess: (data) => {
      toast.success(`Welcome ${data?.name}`);
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}
/******************************** request password reset */
export function useRequestPasswordReset() {
  return useMutation(RequestPasswordReset, {
    onSuccess: (email) => {
      if (email) toast.success(`Password reset link was sent to ${email}`);
      else
        toast.error(
          `Password reset link could not be sent to this email adress`
        );
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}
/********************* wishlist */
export function useToggleWishList(prodId: string) {
  const queryClient = useQueryClient();

  if (pb.authStore.model?.wishlist.includes(prodId))
    return useMutation(RemoveFromWishlist, {
      onSuccess: (prodId) => {
        queryClient.invalidateQueries({ queryKey: KEYS.wichlist });
        toast.success(`Product ${prodId} was removed from your wishlist`);
      },
      onError: (err: any) => {
        const { status, response } = err;
        toast.error(response.message);
      },
    });

  return useMutation(AddToWishlist, {
    onSuccess: (prodId) => {
      queryClient.invalidateQueries({ queryKey: KEYS.wichlist });
      toast.success(`Product ${prodId} was added to your wishlist`);
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}
/*********************************** orders */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation(createOrder, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: KEYS.orders });
      toast.success(`your order have been placed`);
    },
    onError: (err: any) => {
      const { status, response } = err;
      toast.error(response.message);
    },
  });
}

/** err type
 *
 * {
 * "url":"http://127.0.0.1:8090/api/collections/users/auth-with-password",
 * "status":400,
 * "response":{"code":400,"message":"Failed to authenticate.","data":{}},
 * "isAbort":false,
 * "originalError":{"url":"http://127.0.0.1:8090/api/collections/users/auth-with-password",
 * "status":400,
 * "data":{"code":400,
 * "message":"Failed to authenticate.",
 * "data":{}
 * }
 * },
 * "name":"ClientResponseError 400"}
 *
 */
