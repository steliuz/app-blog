export type ContentType = {
  _id?: string;
  name: string;
  type: 'images' | 'videos' | 'documentos';
  imageUploaded?: string;
  createdAt: string;
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

export type Permissions = {
  videos: boolean;
  documents: boolean;
  images: boolean;
};

export type Category = {
  _id: string;
  name: string;
  type: string;
  imageUploaded: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CategoryCount = {
  category: Category;
  count: number;
};

export type Thematic = {
  _id: string;
  name: string;
  permissions: {
    videos: boolean;
    documents: boolean;
    images: boolean;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Content = {
  _id: string;
  categories: CategoryCount[];
  total: number;
  thematic: Thematic;
};

export type TotalCategory = {
  total: number;
  category: Category;
};

export type DataContent = {
  contents: Content[];
  totalCategories: TotalCategory[];
};
