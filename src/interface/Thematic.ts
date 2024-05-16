export type Permissions = {
  videos: boolean | null;
  documents: boolean | null;
  images: boolean | null;
};

export type ThematicParams = {
  id?: string;
  name: string;
  permissions: 'images' | 'videos' | 'documents' | any;
};
