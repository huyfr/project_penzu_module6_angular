import {User} from './User';
import {Album} from './Album';

export interface Image {
  id?: number;
  url?: string;
  album?: Album;
  user?: User;
  createdate?: string;
  updatedate?: string;
  status?: number;
}



