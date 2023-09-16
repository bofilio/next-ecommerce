import { RecordModel } from 'pocketbase';
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
