import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, IPassword } from '../interfaces/profile.interface';
import { Methods } from '../../shared/services/methods';

@Injectable()
export class ProfileService extends Methods {
  constructor(http: HttpClient) {
    super(http);
  }

  update(data: IProfile, toUpdate: string) {
    return this.post<IProfile>({
      body: { data, toUpdate },
      url: '/updateProfile',
    });
  }

  changedPassword(data: IPassword, toUpdate: string) {
    return this.post<IPassword>({
      body: { data, toUpdate },
      url: '/changePassword',
    });
  }
}
