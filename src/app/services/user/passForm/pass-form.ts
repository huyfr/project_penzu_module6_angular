export class PassForm {
  id: string;
  username: string;
  currentPassword: string;
  newPassword: string;

  constructor(id: string, username: string, currentPassword: string , newPassword: string) {
    this.id = id;
    this.username = username;
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
  }
}
