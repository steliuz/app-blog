import type { PageData } from '@/interface';
import type { ThematicParams } from '@/interface/Thematic';

import { request } from './request';

export const addThematic = (params: any) => request<PageData<ThematicParams>>('post', '/thematic', params);
export const getDataThematic = (params: any) => request<ThematicParams[]>('get', '/thematic', params);
export const deleteDataThematic = (params: any) => request('delete', `/thematic/${params.id}`, params);
export const updateDataThematic = (params: any) => request('put', `/thematic/${params.id}`, params);
