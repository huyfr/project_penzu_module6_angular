import {Tag} from './Tag';
import {User} from './User';
import {Reaction} from './Reaction';

export interface Diary {
  id?: string;
  title?: string;
  createdate?: string;
  updatedate?: string;
  description?: string;
  content?: string;
  urlFile?: string;
  status?: number;
  tag?: Tag;
  user?: User;
  reaction?: Reaction;
  generatedUrl?: string;
}

