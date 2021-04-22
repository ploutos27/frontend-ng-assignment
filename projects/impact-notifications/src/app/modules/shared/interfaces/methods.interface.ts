import { IInbox } from '../../inbox/interfaces/inbox.interface';
import { IPassword, IProfile } from '../../profile/interfaces/profile.interface';

export interface IGetDashboard {
  params: {
    email: string;
    take?: string;
  };
  url: string;
}

export interface IPostInbox {
  body: {
    message: IInbox;
    email?: string;
  };
  url: string;
}

export interface IPostProfile {
  body:
    | {
        data: IProfile;
        toUpdate: string;
      }
    | {
        data: IPassword;
        toUpdate: string;
      };
  url: string;
}
