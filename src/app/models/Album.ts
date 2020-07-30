import {Tag} from './Tag';
import {User} from './User';

export interface Album {
  id?: number;
  title?: number;
  avatar?: string;
  tag?: Tag;
  user?: User;
  createdate?: string;
  updatedate?: string;
  status?: number;
}


