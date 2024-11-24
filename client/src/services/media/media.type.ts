export interface IMedia {
  id: string;
  user_id: string;
  url: string;
  domain: string;
  metadata: Record<string, string>;
  type: MediaEnum;
}

export interface IMediaList {
  data: IMedia[];
  total: number;
  page: number;
  limit: number;
}

export enum MediaEnum {
  IMAGE = "image",
  VIDEO = "video",
}
