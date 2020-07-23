export interface User {
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
  blobString?: string;
  status?: number;
}
