import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInbox } from '../interfaces/inbox.interface';
import { of } from 'rxjs';

@Injectable()
export class InboxService {
  constructor(private readonly http: HttpClient) {}

  me() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }

  inbox() {
    const me = JSON.parse(localStorage.getItem('currentUser')); // we can use store here
    return this.http.get<IInbox>('/notifications', {
      params: {
        email: me.userDetails.email,
      },
    });
  }

  sent() {
    return this.http.get<IInbox>('/api/v1/inbox/sent');
  }

  create(message: IInbox) {
    return this.http.post('/sendNotification', message);
  }
  
  delete(id: string) {
    return this.http.delete<string>('/api/v1/inbox/delete/' + id);
  }
}
