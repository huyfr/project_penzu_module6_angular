import {Tag} from './Tag';

export interface Diary {
  id?: number;
  blobstring: string;
  createdate?: string;
  updatedate: string;
  status: number;
  description: string;
  title: string;
  content: string;
  tag?: Tag;
  reaction;
  user;
  attachment;
}

