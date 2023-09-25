import { pb } from '../pocketbase';
import {
  Order,
  OrderRecord,
  SignInRequest,
  SignUpRequest,
  UserRecord,
} from './types';

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
  return authData.record;
}

/**********************************sign in */
export async function SignIn(data: SignInRequest) {
  const authData = await pb
    .collection('users')
    .authWithPassword<UserRecord>(data.email, data.password);
  return authData.record;
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
/***************************************** */
export async function RequestPasswordReset(email: string) {
  const result = await pb.collection('users').requestPasswordReset(email);
  if (result) return email;
  return false;
}
/**************************************** */

export function SignOut() {
  pb.authStore.clear();
}

/************************* wishlist */
export async function AddToWishlist(prodId: string) {
  const user = await pb
    .collection('users')
    .update<UserRecord>(pb.authStore.model?.id, {
      'wishlist+': prodId,
    });
  return prodId;
}
export async function RemoveFromWishlist(prodId: string) {
  const user = await pb
    .collection('users')
    .update<UserRecord>(pb.authStore.model?.id, {
      'wishlist-': prodId,
    });
  return prodId;
}

/************************** order */
export async function createOrder(data: Order[]) {
  return await Promise.all(
    data.map((item) =>
      pb.collection('orders').create<OrderRecord>(item, { $autoCancel: false })
    )
  );
}
