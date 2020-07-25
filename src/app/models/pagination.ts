import {Diary} from './Diary';

export interface Pagination {
  content: Diary[];
  empty;
  first;
  last;
  number;
  numberOfElements;
  size;
  sort;
  totalElements;
  totalPages;
}
