import type { DataContent } from '@/interface/content';

import { request } from './request';

export const getThematicCategory = (params: any) => request<DataContent>('get', '/content/byThematic/all', params);

export const postContent = (params: any) => request('post', '/content', params);

export const getDetails = (Thematic: string, category: string) =>
  request('get', `/content/?thematic=${Thematic}&category=${category}`, {});
