export interface Locales<T = any> {
  /** Chinese */
  zh_CN: T;
  /** English */
  en_US: T;
  /** Spanish */
  es_ES: T;
}

export type Language = keyof Locales;

export interface PageData<T> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}
