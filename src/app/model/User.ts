export interface IUser {
  id?: number;
  email: string;
  name: string;
  username: string;
  password: string;
  role: {
    id?: string;
    name?: string;
  };
  blobString: string;
  avatar: string;
  status: number;
}
