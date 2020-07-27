export interface User {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  role?: {
    id?: string;
    name?: string;
  };
  avatar?: string;
  blobString?: string;
  status?: number;
}
