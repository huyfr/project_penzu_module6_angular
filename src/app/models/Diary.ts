import {Tag} from './Tag';
import { Attachment} from './Attachment';
import {User} from "./User";
import {Reaction} from "./Reaction";

export interface Diary {
  id?: number;
  title?: string;
  description: string;
  content: string;
  tag?: Tag;
  createdate?: string;
  updatedate: string;
  attachment: Attachment[];
  status: number;
  user?: User;
  blobstring?: string;
  reaction?: Reaction;
}

