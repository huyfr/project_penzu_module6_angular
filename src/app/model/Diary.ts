import {Attachment} from './Attachment';

export interface Diary {
  id?: number;
  title?: string;
  description: string;
  content: string;
  tag?: {
    id?: number;
    name: string;
};
  createdate?: string;
  updatedate: string;
  attachment: Attachment[];
  status: number;
  user: {
    id?: string;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
    role?: {
      id?: string;
      name?: string;
    };
    avatar?: string;
    blobString?: string;  status?: number;
};
  blobstring: string;
  reaction: {
    id?: number;
    reactionname: string;
  };
}

