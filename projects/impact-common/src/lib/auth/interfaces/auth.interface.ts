export interface ILoginRegister {
    email: string;
    password: string;
}

export class IUser {
  authenticated: boolean;
  userDetails: ILoginRegister;
}