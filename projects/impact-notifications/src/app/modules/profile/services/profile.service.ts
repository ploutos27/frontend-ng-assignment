import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile, IPassword } from '../interfaces/profile.interface';
import { of } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  load() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return of(user);
  }

  update(data: IProfile, emailToUpdate: string) {
    return this.http.post<IProfile>('/updateProfile', { data, toUpdate: emailToUpdate });
  }

  changedPasswrd(data: IPassword, emailToUpdate: string) {
    return this.http.post<IPassword>('/changePassword', { data, toUpdate: emailToUpdate });
  }
}
