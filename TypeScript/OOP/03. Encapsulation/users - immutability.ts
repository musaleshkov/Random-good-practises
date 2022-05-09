class User {
  private _username: string;
  private readonly _email: string;

  constructor(username: string, email: string) {
    this.username = username;

    if (!email) {
      throw new Error('User email cannot be empty!');
    }

    this._email = email;
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
}

const user = new User('rockstar', 'peter.capaldi@gmail.com');
user.username = 'awesomerockstar';

// Error: user.username = ''; - Throws an error because of the validation.
// Error: user.email = 'rockstar@gmail.com'; - Cannot assign value to property without setter.
