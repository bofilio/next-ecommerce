import { pb } from '../pocketbase';
import { CategoryRecord, ProductRecord, productfilter } from './types';

export async function getAllCategories(parent?: string) {
  if (!parent)
    return await pb.collection('categories').getFullList<CategoryRecord>({
      sort: 'created',
      filter: `parent = ""`,
    });
  else
    return await pb.collection('categories').getFullList<CategoryRecord>({
      sort: 'created',
      filter: `parent.name = "${parent}" `,
    });
}

export async function getProducts(filter: productfilter) {
  const { category, page, perPage, sort = '-created', search = '' } = filter;
  if (category)
    return await pb
      .collection('products')
      .getList<ProductRecord>(page, perPage, {
        sort,
        filter: `(category.name="${category}" || category.parent.name="${category}") && name ~ "${search}"`,
      });
  else
    return await pb
      .collection('products')
      .getList<ProductRecord>(page, perPage, {
        sort,
        filter: `name ~ "${search}"`,
      });
}
