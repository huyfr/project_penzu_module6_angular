export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  role?: {
    id?: string;
    name?: string;
  };
  avatar?: string;
  blobString?: string;
}
