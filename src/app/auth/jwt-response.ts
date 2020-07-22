export interface JwtResponse {
  id: string;
  accessToken: string;
  type: string;
  username: string;
  name: string;
  roles: string[];
  email: string;
  avatar?: string;
}
