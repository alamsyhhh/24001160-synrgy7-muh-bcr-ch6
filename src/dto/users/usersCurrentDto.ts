export class UserCurrentDto {
  public id: string;
  public username: string;
  public role: string;

  constructor(id: string, username: string, role: string) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
