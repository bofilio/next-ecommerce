import { RecordModel } from 'pocketbase';

/*************************************** */
export type User = {
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
  wishlist: string[];
};
export type UserRecord = User &
  RecordModel & {
    expand?: {
      wishlist: ProductRecord[];
    };
  };
export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
export type SignInRequest = {
  email: string;
  password: string;
};
/*************************************** */
type Category = {
  name: string;
  label: string;
  md_icon: string;
};
export type CategoryRecord = Category & RecordModel;

/**************************************** */
type Product = {
  name: string;
  rating: number;
  price: number;
  images: string[];
  category: string;
  description?: string;
};
export type ProductRecord = Product & RecordModel;

export type productfilter = {
  page?: number;
  perPage?: number;
  category: string;
  sort?: string;
  search?: string;
};
/**************************************** */
