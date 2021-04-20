import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class SharedService {
  users: { name: string, value: string}[] = [];


  me() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return of(user);
  }

  getUsers(): Observable<{ name: string; value: string }[]> {
    return of(this.structure());
  }

  structure() {
    this.users = [];
      const users = JSON.parse(localStorage.getItem('registered-users'));
      const me = JSON.parse(localStorage.getItem('currentUser'));
      for (let u of users) {
          if (u.email !== me.userDetails.email)
            this.users.push({ name: u.email, value: u.email });
      };
    return this.users;
  }
}
