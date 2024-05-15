import type { ThematicType } from '@/interface/content';
import type { AxiosRequestConfig } from 'axios';

import { request } from './request';

export const getThematic = (config: AxiosRequestConfig = {}) =>
  request<ThematicType[]>('get', '/thematic/all', {}, config);
