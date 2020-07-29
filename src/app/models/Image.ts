import {Tag} from './Tag';
import {User} from './User';
import {Reaction} from './Reaction';
import {Album} from './Album';

export interface Image {
  id: number;
  url: string;
  blobString?: string;
  album?: Album;
  attachment?: [];
  user?: User;
  blobstring?: string;
  reaction?: Reaction;
  createdate?: string;
  updatedate?: string;
  status: number;
}

