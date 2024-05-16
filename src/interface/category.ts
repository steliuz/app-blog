export enum CategoryEnum {
  images = 'images',
  videos = 'videos',
  documents = 'documents',
}

export type CategoryParams = {
  id?: string;
  name: string;
  type: CategoryEnum;
  imageUploaded: File | null;
};
