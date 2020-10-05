export class UserLogin {
  email: string;
  password: string;

  constructor(user: any = {}) {
    this.email = user.email || '';
    this.password = user.password || '';
  }
}
