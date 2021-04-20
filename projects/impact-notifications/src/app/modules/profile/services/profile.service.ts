import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, IPassword } from '../interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  update(data: IProfile) {
    return this.http.post<IProfile>('/api/v1/security/profile', data);
  }
  changedPasswrd(data: IPassword) {
    return this.http.post<IPassword>('/api/v1/security/change-pwd', data);
  }
}
