import {Tag} from './Tag';
import {User} from './User';
import {Attachment} from './Attachment';
import {Reaction} from './Reaction';

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

