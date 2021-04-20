import { IUser } from "../interfaces/auth.interface";

export class SetUserAuth {
  static readonly type = '[Auth] Set User Auth';

  constructor(public user: IUser) {}
}

export class RemoveUserAuth {
  static readonly type = '[Auth] Remove Current User Auth';
}