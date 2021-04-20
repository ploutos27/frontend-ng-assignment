import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';

const tokenKey = 'currentUser';

@Injectable()
export class ApiTokenService {

  currentTokenUser(): boolean {
    const val = JSON.parse(localStorage.getItem(tokenKey));
    if (!val) {
      return undefined;
    }
    return val.authenticated;
  }

  me(): Observable<IUser> {
    return of(this.retract());
  }

  assign(data: IUser) {
    localStorage.setItem(tokenKey, JSON.stringify(data));
  }

  retract() {
    return JSON.parse(localStorage.getItem(tokenKey));
  }

  valid() {
    const token = JSON.parse(localStorage.getItem(tokenKey));
    if (!token || !token.authenticated) {
      return false;
    }
    return true;
  }

  clean() {
    localStorage.removeItem(tokenKey);
  }
}
