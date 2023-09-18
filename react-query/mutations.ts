import { pb } from '../pocketbase';
import { SignInRequest, SignUpRequest, UserRecord } from './types';

/**********************************sign up */
export async function SignUp(data: SignUpRequest) {
  const user = await pb.collection('users').create<UserRecord>(data);
  // (optional) send an email verification request
  await pb.collection('users').requestVerification(data.email);
  return user;
}
/********************************social sign */
export async function SignwithOAUth2(
  provider: 'google' | 'facebook' = 'google'
) {
  const authData = await pb
    .collection('users')
    .authWithOAuth2<UserRecord>({ provider });
}

/**********************************sign in */
export async function SignIn(data: SignInRequest) {
  const authData = await pb
    .collection('users')
    .authWithPassword(data.email, data.password);
}
/*************************************** */
export function initUserFromLocalStorage() {
  const user_str = localStorage.getItem('USER');
  if (user_str === null) return null;
  pb.authStore.loadFromCookie(user_str);
  if (!pb.authStore.isValid) {
    pb.authStore.clear();
    localStorage.removeItem('USER');
    return null;
  }
  pb.collection('users').authRefresh();
}
/**************************************** */

export function SignOut() {
  pb.authStore.clear();
}

/************************* wishlist */
export async function AddToWishlist(prodId: string) {
  await pb.collection('users').update(pb.authStore.model?.id, {
    'wishlist+': prodId,
  });
}
export async function RemoveFromWishlist(prodId: string) {
  await pb.collection('users').update(pb.authStore.model?.id, {
    'wishlist-': prodId,
  });
}
