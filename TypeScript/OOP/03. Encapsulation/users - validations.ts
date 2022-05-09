class User {
  private _username: string;
  private _email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    if (!value) {
      throw new Error('User username cannot be empty!');
    }

    this._username = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    if (!value) {
      throw new Error('User email cannot be empty!');
    }

    this._email = value;
  }
}

const user = new User('rockstar', 'peter.capaldi@gmail.com');
user.username = 'awesomerockstar';
user.email = 'rockstar@gmail.com';

// Error: user.username = ''; - Throws an error because of the validation.
// Error: user.email = ''; - Throws an error because of the validation.
