import {User} from './User';
import {Diary} from './Diary';

export interface Comment {
  id?: number;
  status?: number;
  content?: string;
  user?: User;
  diary?: Diary;
}
