export interface IProduct {
  albumId: number;
  id: number;
  title: string,
  url: string,
  thumbnailUrl: string;
  isLiked?: boolean;
}