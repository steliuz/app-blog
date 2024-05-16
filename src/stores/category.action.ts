// import type { CategoryParams } from './../interface/category';

import { addCategory, deleteDataCategory, getDataCategory, updateDataCategory } from '@/api/category';

import { createAsyncAction } from './utils';

export const createCategory = createAsyncAction<any, any>(payload => {
  return async () => {
    const data = await addCategory(payload);

    if (data) {
      return true;
    }

    return false;
  };
});

export const getCategory = createAsyncAction<any, any>(payload => {
  return async () => {
    const data = await getDataCategory(payload);

    if (data) {
      return data;
    }

    return false;
  };
});

export const deleteCategory = createAsyncAction<string, any>(payload => {
  return async () => {
    const data = await deleteDataCategory(payload);

    if (data) {
      return true;
    }

    return false;
  };
});
export const updateCategory = createAsyncAction<any, any>(payload => {
  return async () => {
    const data = await updateDataCategory(payload);

    if (data) {
      return true;
    }

    return false;
  };
});
