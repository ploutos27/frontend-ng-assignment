import { IProfile } from '../../profile/interfaces/profile.interface';

export class IUser {
  authenticated: boolean;
  userDetails: IProfile;
}
