export type ContentType = {
  title: string;
  description: string;
  type: 'texto' | 'video' | 'documento';
  url?: string;
  date: string;
};

export type CategoryType = {
  name: string;
  date: string;
  count: number;
  content?: ContentType[];
};

export type ThematicType = {
  thematic: string;
  category: CategoryType[];
};
