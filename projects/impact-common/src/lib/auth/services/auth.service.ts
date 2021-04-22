import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ILoginRegister } from '../interfaces/auth.interface';

@Injectable()
export class LoginRegisterService {
  constructor(private http: HttpClient) {}

  login(data: ILoginRegister) {
    return this.http.post('/login', data).pipe(map(user => user));
  }

  register(data: ILoginRegister) {
    return this.http.post('/register', data);
  }

}
