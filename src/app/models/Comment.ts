import {User} from './User';
import {Diary} from './Diary';

export interface Comment {
  id?: number;
  status?: number;
  createdate?: string;
  content?: string;
  user?: User;
  diary?: Diary;
}
