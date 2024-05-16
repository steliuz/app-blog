import type { PageData } from '@/interface';
import type { CategoryParams } from '@/interface/category';

import { request } from './request';

export const addCategory = (params: any) => request<PageData<CategoryParams>>('post', '/category', params);
export const getDataCategory = (params: any) => request<PageData<CategoryParams[]>>('get', '/category', params);
export const deleteDataCategory = (params: any) => request('delete', `/category/${params.id}`, params);
export const updateDataCategory = (params: any) => request('put', `/category/${params.id}`, params);
