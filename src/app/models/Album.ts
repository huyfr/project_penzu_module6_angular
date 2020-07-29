import {Tag} from './Tag';
import {User} from './User';
import {Reaction} from './Reaction';

export interface Album {
  id?: number;
  title?: number;
  avatar?: string;
  tag?: Tag;
  attachment: [];
  user?: User;
  blobstring?: string;
  reaction?: Reaction;
  createdate?: string;
  updatedate?: string;
  status?: number;
}

